const fs = require('fs');

// simulate the logic
const DOCTORS = [{ id:1, name:"Dr. Sarah Cohen", specialty:"Family Medicine", emoji:"👩‍⚕️", clinic:"Tel Aviv Central Clinic" }];
const appts = [
  {
    "id": 1778786305594,
    "userId": 1778786295834,
    "doctorId": 1,
    "dateTime": "2026-05-14T08:00:00",
    "status": "upcoming"
  }
];

const now = new Date('2026-05-14T00:00:00');
const upcoming = appts.filter(a => new Date(a.dateTime) > now && a.status !== 'cancelled');

if (upcoming.length > 0) {
    const next = upcoming.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))[0];
    const doc  = DOCTORS.find(d => d.id === next.doctorId);
    const d    = new Date(next.dateTime);
    console.log(doc?.name);
    console.log(doc?.specialty);
    console.log(d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }));
    console.log(doc?.clinic);
} else {
    console.log("No upcoming appointments");
}
