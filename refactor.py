import re

with open('app.js', 'r') as f:
    content = f.read()

# 1. Replace getAppointments and saveAppointments
content = re.sub(
    r"function getAppointments\(\) \{ return store\.get\('mhf_appointments'\) \|\| \[\]; \}\nfunction saveAppointments\(a\)\{ store\.set\('mhf_appointments', a\); \}",
    "async function getAppointments() { try { const res = await fetch('/api/appointments'); return await res.json(); } catch(e) { return []; } }",
    content
)

# 2. renderDashboard
content = content.replace("function renderDashboard() {", "async function renderDashboard() {")
content = content.replace("const all      = getAppointments();", "const all      = await getAppointments();")

# 3. loadSlots
content = content.replace("function loadSlots(date) {", "async function loadSlots(date) {")
content = content.replace("const all   = getAppointments();", "const all   = await getAppointments();")

# 4. openBooking
content = content.replace("function openBooking(docId) {", "async function openBooking(docId) {")

# 5. confirm-booking
# Replace the whole listener
old_confirm = """document.getElementById('confirm-booking').addEventListener('click', () => {
  if (!selectedDate || !selectedSlot) { toast('Please select a date and time slot.', 'error'); return; }
  const user = getSession();
  const btn  = document.getElementById('confirm-booking');
  btn.disabled = true;
  btn.textContent = 'Booking…';

  const appts = getAppointments();
  const dateTime = `${selectedDate}T${selectedSlot}:00`;

  // Check for conflict
  const conflict = appts.some(a =>
    a.doctorId === selectedDoctor.id &&
    a.dateTime === dateTime &&
    a.status   !== 'cancelled'
  );

  btn.disabled    = false;
  btn.textContent = '✅ Confirm Appointment';

  if (conflict) {
    toast('❌ This slot was just taken. Please pick a different time.', 'error');
    loadSlots(selectedDate); // refresh slot view
    return;
  }

  const newAppt = {
    id:       Date.now(),
    userId:   user.id,
    doctorId: selectedDoctor.id,
    dateTime,
    status:   'upcoming',
    bookedAt: new Date().toISOString(),
    notes:    document.getElementById('booking-notes').value.trim(),
  };
  appts.push(newAppt);
  saveAppointments(appts);

  closeBooking();
  toast(`Appointment booked with ${selectedDoctor.name}! ✅`);
  if (currentPage === 'dashboard')    renderDashboard();
  if (currentPage === 'appointments') renderAppointments();
});"""

new_confirm = """document.getElementById('confirm-booking').addEventListener('click', async () => {
  if (!selectedDate || !selectedSlot) { toast('Please select a date and time slot.', 'error'); return; }
  const user = getSession();
  const btn  = document.getElementById('confirm-booking');
  btn.disabled = true;
  btn.textContent = 'Booking…';

  const dateTime = `${selectedDate}T${selectedSlot}:00`;
  const notes = document.getElementById('booking-notes').value.trim();

  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctorId: selectedDoctor.id, dateTime, userId: user.id, notes })
    });

    btn.disabled = false;
    btn.textContent = '✅ Confirm Appointment';

    if (!res.ok) {
      const data = await res.json();
      if (data.error === 'SLOT_TAKEN') {
        toast('❌ This slot was just taken. Please pick a different time.', 'error');
        loadSlots(selectedDate);
      } else {
        toast('❌ Booking failed.', 'error');
      }
      return;
    }

    closeBooking();
    toast(`Appointment booked with ${selectedDoctor.name}! ✅`);
    if (currentPage === 'dashboard')    renderDashboard();
    if (currentPage === 'appointments') renderAppointments();
  } catch(e) {
    btn.disabled = false;
    btn.textContent = '✅ Confirm Appointment';
    toast('❌ Network error.', 'error');
  }
});"""

content = content.replace(old_confirm, new_confirm)

# 6. renderAppointments
content = content.replace("function renderAppointments() {", "async function renderAppointments() {")
content = content.replace("const all      = getAppointments();", "const all      = await getAppointments();")

# 7. cancelAppt
old_cancel = """function cancelAppt(id) {
  const appts = getAppointments();
  const appt  = appts.find(a => a.id === id);
  if (appt) appt.status = 'cancelled';
  saveAppointments(appts);
  renderAppointments();
  if (currentPage === 'dashboard') renderDashboard();
  toast('Appointment cancelled.', 'info');
}"""

new_cancel = """async function cancelAppt(id) {
  try {
    await fetch(`/api/appointments/${id}`, { method: 'PATCH' });
    renderAppointments();
    if (currentPage === 'dashboard') renderDashboard();
    toast('Appointment cancelled.', 'info');
  } catch(e) {
    toast('Failed to cancel appointment.', 'error');
  }
}"""
content = content.replace(old_cancel, new_cancel)

# 8. renderProfile
content = content.replace("function renderProfile() {", "async function renderProfile() {")
content = content.replace("const all   = getAppointments();", "const all   = await getAppointments();")

with open('app.js', 'w') as f:
    f.write(content)
