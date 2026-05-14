// ─── Storage Helpers ───────────────────────────────────────
const store = {
  get: k => JSON.parse(localStorage.getItem(k) || 'null'),
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

// ── Data stores (all localStorage-based for GitHub Pages) ──
function getUsers()        { return store.get('mhf_users')        || []; }
function saveUsers(u)      { store.set('mhf_users', u); }
function getAppointments() { return store.get('mhf_appointments') || []; }
function saveAppointments(a){ store.set('mhf_appointments', a); }

// ── Session ────────────────────────────────────────────────
function getSession()    { return store.get('mhf_session'); }
function saveSession(u)  { store.set('mhf_session', u); }
function clearSession()  { localStorage.removeItem('mhf_session'); }

// ─── Toast ──────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ─── Router ──────────────────────────────────────────────────
let currentPage = 'dashboard';

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page-' + page)?.classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  renderPage(page);
}

function renderPage(page) {
  const fns = {
    dashboard:    renderDashboard,
    doctors:      renderDoctors,
    appointments: renderAppointments,
    profile:      renderProfile,
  };
  fns[page]?.();
}

// ─── Auth ─────────────────────────────────────────────────────
function initAuth() {
  const session = getSession();
  if (session) showApp(session);
  else showAuth();
}

function showAuth() {
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('app-screen').classList.add('hidden');
}

function showApp(user) {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('user-name').textContent = user.fullName;
  document.getElementById('user-id').textContent   = 'ID: ' + user.idNumber;
  document.getElementById('user-avatar-letter').textContent = user.fullName.charAt(0).toUpperCase();
  navigate('dashboard');
}

// Auth tabs
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const mode = tab.dataset.tab;
    document.getElementById('login-form').classList.toggle('hidden',    mode !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', mode !== 'register');
  });
});

// ── Login ──────────────────────────────────────────────────────
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email  = document.getElementById('login-email').value.trim().toLowerCase();
  const pass   = document.getElementById('login-pass').value;
  const errEl  = document.getElementById('login-error');
  const btn    = e.target.querySelector('button[type=submit]');
  btn.disabled = true; btn.textContent = 'Signing in...';

  const users = getUsers();
  const user  = users.find(u => u.email.toLowerCase() === email && u.password === pass);

  btn.disabled = false; btn.textContent = 'Sign In →';

  if (!user) {
    errEl.textContent = 'Invalid email or password.'; errEl.classList.add('show'); return;
  }
  errEl.classList.remove('show');
  saveSession(user);
  showApp(user);
  toast(`Welcome back, ${user.fullName}! 👋`);
});

// ── Register ───────────────────────────────────────────────────
document.getElementById('register-form').addEventListener('submit', e => {
  e.preventDefault();
  const fullName = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim().toLowerCase();
  const idNumber = document.getElementById('reg-id').value.trim();
  const dob      = document.getElementById('reg-dob').value;
  const hmo      = document.getElementById('reg-hmo').value;
  const phone    = document.getElementById('reg-phone').value.trim();
  const pass     = document.getElementById('reg-pass').value;
  const errEl    = document.getElementById('reg-error');
  const btn      = e.target.querySelector('button[type=submit]');

  if (!fullName || !email || !idNumber || !dob || !hmo || !phone || !pass) {
    errEl.textContent = 'Please fill in all fields.'; errEl.classList.add('show'); return;
  }
  if (idNumber.length < 7 || idNumber.length > 9) {
    errEl.textContent = 'ID number must be 7-9 digits.'; errEl.classList.add('show'); return;
  }

  btn.disabled = true; btn.textContent = 'Creating account...';

  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email)) {
    btn.disabled = false; btn.textContent = 'Create Account →';
    errEl.textContent = 'This email is already registered.'; errEl.classList.add('show'); return;
  }

  const user = {
    id:       Date.now(),
    fullName,
    email,
    idNumber,
    dob,
    hmo,
    phone,
    password: pass,
    joinDate: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);

  btn.disabled = false; btn.textContent = 'Create Account →';
  errEl.classList.remove('show');
  saveSession(user);
  showApp(user);
  toast(`Welcome to MaccabiHealth, ${fullName}! 🎉`);
});

// ── Logout ─────────────────────────────────────────────────────
document.getElementById('btn-logout').addEventListener('click', () => {
  clearSession();
  showAuth();
  toast('Logged out successfully.', 'info');
});

// ─── Dashboard ────────────────────────────────────────────────
function renderDashboard() {
  const user     = getSession();
  const all      = getAppointments();
  const appts    = all.filter(a => a.userId === user.id);
  const now      = new Date();
  const upcoming = appts.filter(a => new Date(a.dateTime) > now && a.status !== 'cancelled');
  const past     = appts.filter(a => new Date(a.dateTime) <= now || a.status === 'cancelled');

  document.getElementById('stat-upcoming').textContent   = upcoming.length;
  document.getElementById('stat-doctors').textContent    = DOCTORS.length;
  document.getElementById('stat-specialties').textContent = SPECIALTIES.length;
  document.getElementById('stat-total').textContent      = appts.length;

  // Next appointment
  const nextApptEl = document.getElementById('next-appointment');
  if (upcoming.length > 0) {
    const next = upcoming.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))[0];
    const doc  = DOCTORS.find(d => d.id === next.doctorId);
    const d    = new Date(next.dateTime);
    nextApptEl.innerHTML = `
      <div class="appointment-card" style="margin:0">
        <div class="appt-date-block">
          <div class="appt-day">${d.getDate()}</div>
          <div class="appt-month">${d.toLocaleString('en', { month: 'short' })}</div>
        </div>
        <div class="appt-info">
          <div class="appt-doctor">${doc?.name}</div>
          <div class="appt-specialty">${doc?.specialty}</div>
          <div class="appt-details">⏰ ${d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })} &nbsp;•&nbsp; 📍 ${doc?.clinic}</div>
        </div>
        <span class="appt-status upcoming">Upcoming</span>
      </div>`;
  } else {
    nextApptEl.innerHTML = `<div class="empty-state" style="padding:24px"><div class="empty-icon">📅</div><p>No upcoming appointments</p><button class="btn btn-primary btn-sm" style="margin-top:12px;width:auto" onclick="navigate('doctors')">Book Now</button></div>`;
  }

  // Recent activity
  const recentEl = document.getElementById('recent-activity');
  const recent   = appts.slice(-3).reverse();
  if (recent.length === 0) {
    recentEl.innerHTML = '<p style="color:var(--text-muted);font-size:14px">No activity yet.</p>';
  } else {
    recentEl.innerHTML = recent.map(a => {
      const doc = DOCTORS.find(d => d.id === a.doctorId);
      const d   = new Date(a.dateTime);
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:24px">${doc?.emoji}</span>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600">${doc?.name}</div>
          <div style="font-size:12px;color:var(--text-secondary)">${d.toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
        <span class="appt-status ${a.status}">${a.status}</span>
      </div>`;
    }).join('');
  }
}

// ─── Doctors Page ─────────────────────────────────────────────
let activeSpecialty = 'All';
let searchQuery     = '';

function renderDoctors() {
  const filtersEl = document.getElementById('specialty-filters');
  const all       = ['All', ...SPECIALTIES];
  filtersEl.innerHTML = all.map(s =>
    `<div class="filter-chip ${activeSpecialty === s ? 'active' : ''}" onclick="filterSpecialty('${s}')">${s}</div>`
  ).join('');
  renderDoctorCards();
}

function filterSpecialty(s) {
  activeSpecialty = s;
  renderDoctors();
}

function renderDoctorCards() {
  let docs = DOCTORS;
  if (activeSpecialty !== 'All') docs = docs.filter(d => d.specialty === activeSpecialty);
  if (searchQuery) docs = docs.filter(d =>
    d.name.toLowerCase().includes(searchQuery) ||
    d.specialty.toLowerCase().includes(searchQuery) ||
    d.clinic.toLowerCase().includes(searchQuery) ||
    d.languages.some(l => l.toLowerCase().includes(searchQuery))
  );

  const grid = document.getElementById('doctors-grid');
  if (docs.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><h3>No doctors found</h3><p>Try a different search or specialty</p></div>`;
    return;
  }

  const stars = r => '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r));
  grid.innerHTML = docs.map(d => `
    <div class="doctor-card" onclick="openBooking(${d.id})">
      <div class="doctor-avatar" style="background:${avatarBg(d.specialty)}">
        ${d.emoji}
        <div class="availability-dot ${d.available ? 'available' : 'busy'}"></div>
      </div>
      <div class="doctor-name">${d.name}</div>
      <div class="doctor-specialty">${d.specialty}</div>
      <div class="doctor-info">
        <span>📍 ${d.clinic}</span>
        <span>🗣️ ${d.languages.join(', ')}</span>
        <span>⏳ ${d.experience} years exp.</span>
      </div>
      <div class="doctor-meta">
        <div class="doctor-rating">
          <span class="stars">${stars(d.rating)}</span>
          <span>${d.rating} (${d.reviews})</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openBooking(${d.id})">Book</button>
      </div>
    </div>`).join('');
}

function avatarBg(specialty) {
  const map = {
    'Family Medicine':       'rgba(0,212,170,0.15)',
    'Cardiology':            'rgba(239,68,68,0.15)',
    'Dermatology':           'rgba(245,166,35,0.15)',
    'Orthopedics':           'rgba(139,92,246,0.15)',
    'Neurology':             'rgba(59,130,246,0.15)',
    'Gynecology':            'rgba(236,72,153,0.15)',
    'Pediatrics':            'rgba(34,197,94,0.15)',
    'Psychiatry':            'rgba(168,85,247,0.15)',
    'Ophthalmology':         'rgba(6,182,212,0.15)',
    'ENT':                   'rgba(249,115,22,0.15)',
    'Gastroenterology':      'rgba(20,184,166,0.15)',
    'Endocrinology':         'rgba(234,179,8,0.15)',
    'Oncology':              'rgba(239,68,68,0.12)',
    'Urology':               'rgba(59,130,246,0.12)',
    'Rheumatology':          'rgba(139,92,246,0.12)',
    'Pulmonology':           'rgba(14,165,233,0.15)',
    'Nephrology':            'rgba(16,185,129,0.15)',
    'Hematology':            'rgba(220,38,38,0.15)',
    'Allergy & Immunology':  'rgba(132,204,22,0.15)',
    'Sports Medicine':       'rgba(245,158,11,0.15)',
    'Plastic Surgery':       'rgba(236,72,153,0.12)',
    'Geriatrics':            'rgba(99,102,241,0.15)',
    'Pain Management':       'rgba(234,88,12,0.15)',
  };
  return map[specialty] || 'rgba(0,212,170,0.15)';
}

document.getElementById('doctor-search').addEventListener('input', e => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderDoctorCards();
});

// ─── Booking Modal ────────────────────────────────────────────
let selectedDoctor = null;
let selectedSlot   = null;
let selectedDate   = null;

function loadSlots(date) {
  selectedSlot = null;
  selectedDate = date;
  const grid = document.getElementById('time-slots');

  const all   = getAppointments();
  const taken = all
    .filter(a => a.doctorId === selectedDoctor?.id && a.dateTime.startsWith(date) && a.status !== 'cancelled')
    .map(a => a.dateTime.split('T')[1].substring(0, 5));

  grid.innerHTML = selectedDoctor.slots.map(s =>
    `<div class="time-slot ${taken.includes(s) ? 'taken' : ''}" onclick="selectSlot('${s}',this)">${s}</div>`
  ).join('');
}

function openBooking(docId) {
  selectedDoctor = DOCTORS.find(d => d.id === docId);
  selectedSlot   = null;
  selectedDate   = null;

  document.getElementById('modal-doctor-name').textContent     = selectedDoctor.name;
  document.getElementById('modal-doctor-specialty').textContent = selectedDoctor.specialty;
  document.getElementById('modal-doctor-emoji').textContent    = selectedDoctor.emoji;
  document.getElementById('modal-doctor-clinic').textContent   = selectedDoctor.clinic;
  document.getElementById('modal-doctor-bio').textContent      = selectedDoctor.bio;

  const dateInput = document.getElementById('booking-date');
  const today     = new Date().toISOString().split('T')[0];
  dateInput.min   = today;
  dateInput.value = today;

  document.getElementById('booking-modal').classList.remove('hidden');
  loadSlots(today);
}

document.getElementById('booking-date').addEventListener('change', e => {
  if (selectedDoctor) loadSlots(e.target.value);
});

function selectSlot(slot, el) {
  document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  selectedSlot = slot;
}

document.getElementById('confirm-booking').addEventListener('click', () => {
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
});

function closeBooking() {
  document.getElementById('booking-modal').classList.add('hidden');
  document.getElementById('booking-notes').value = '';
  selectedDoctor = null; selectedSlot = null; selectedDate = null;
}

document.getElementById('modal-close').addEventListener('click', closeBooking);
document.getElementById('booking-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('booking-modal')) closeBooking();
});

// ─── Appointments Page ────────────────────────────────────────
function renderAppointments() {
  const user     = getSession();
  const all      = getAppointments();
  const appts    = all.filter(a => a.userId === user.id);
  const now      = new Date();
  const upcoming = appts.filter(a => new Date(a.dateTime) > now && a.status !== 'cancelled').sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const past     = appts.filter(a => new Date(a.dateTime) <= now || a.status === 'cancelled').sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  document.getElementById('appts-upcoming').innerHTML = renderApptList(upcoming, false);
  document.getElementById('appts-past').innerHTML     = renderApptList(past, true);
}

function renderApptList(appts, isPast) {
  if (appts.length === 0) return `<div class="empty-state"><div class="empty-icon">${isPast ? '📋' : '📅'}</div><h3>${isPast ? 'No past appointments' : 'No upcoming appointments'}</h3>${!isPast ? `<button class="btn btn-primary btn-sm" style="margin-top:12px;width:auto" onclick="navigate('doctors')">Book Appointment</button>` : ''}</div>`;
  return appts.map(a => {
    const doc = DOCTORS.find(d => d.id === a.doctorId);
    const d   = new Date(a.dateTime);
    return `<div class="appointment-card">
      <div class="appt-date-block">
        <div class="appt-day">${d.getDate()}</div>
        <div class="appt-month">${d.toLocaleString('en', { month: 'short' })}</div>
      </div>
      <div class="appt-info">
        <div class="appt-doctor">${doc?.emoji} ${doc?.name}</div>
        <div class="appt-specialty">${doc?.specialty}</div>
        <div class="appt-details">⏰ ${d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })} &nbsp;•&nbsp; 📍 ${doc?.clinic}${a.notes ? `&nbsp;•&nbsp; 📝 ${a.notes}` : ''}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <span class="appt-status ${a.status}">${a.status}</span>
        ${a.status === 'upcoming' ? `<button class="btn btn-danger btn-sm" onclick="cancelAppt(${a.id})">Cancel</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function cancelAppt(id) {
  const appts = getAppointments();
  const appt  = appts.find(a => a.id === id);
  if (appt) appt.status = 'cancelled';
  saveAppointments(appts);
  renderAppointments();
  if (currentPage === 'dashboard') renderDashboard();
  toast('Appointment cancelled.', 'info');
}

// ─── Profile Page ──────────────────────────────────────────────
function renderProfile() {
  const user  = getSession();
  document.getElementById('profile-avatar-letter').textContent = user.fullName.charAt(0).toUpperCase();
  document.getElementById('profile-name').textContent          = user.fullName;
  document.getElementById('profile-hmo').textContent           = user.hmo;
  document.getElementById('profile-email').textContent         = user.email;
  document.getElementById('profile-id').textContent            = user.idNumber;
  document.getElementById('profile-phone').textContent         = user.phone;
  document.getElementById('profile-dob').textContent           = user.dob ? new Date(user.dob).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';
  document.getElementById('profile-since').textContent         = new Date(user.joinDate).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });

  const all   = getAppointments();
  const appts = all.filter(a => a.userId === user.id);
  const now   = new Date();
  document.getElementById('profile-stat-upcoming').textContent = appts.filter(a => new Date(a.dateTime) > now && a.status !== 'cancelled').length;
  document.getElementById('profile-stat-total').textContent    = appts.length;
}

// ─── Nav ────────────────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => navigate(item.dataset.page));
});

// ─── Init ───────────────────────────────────────────────────────
window.filterSpecialty = filterSpecialty;
window.openBooking     = openBooking;
window.selectSlot      = selectSlot;
window.cancelAppt      = cancelAppt;
window.navigate        = navigate;
initAuth();
