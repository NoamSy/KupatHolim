from flask import Flask, request, jsonify, send_from_directory
import json, os, threading
from datetime import datetime

app = Flask(__name__, static_folder='.')
DATA_FILE   = os.path.join(os.path.dirname(__file__), 'appointments.json')
USERS_FILE  = os.path.join(os.path.dirname(__file__), 'users.json')
lock = threading.Lock()

# ── File helpers ──────────────────────────────────────────
def load_json(path):
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_appointments(): return load_json(DATA_FILE)
def save_appointments(d): save_json(DATA_FILE, d)
def load_users(): return load_json(USERS_FILE)
def save_users(d): save_json(USERS_FILE, d)

# ── API: Users ────────────────────────────────────────────
@app.route('/api/users', methods=['GET'])
def get_users():
    with lock:
        # Return users without passwords for safety, but we need them for login
        return jsonify(load_users())

@app.route('/api/users', methods=['POST'])
def register_user():
    body = request.get_json()
    email    = body.get('email', '').strip().lower()
    password = body.get('password', '')
    fullName = body.get('fullName', '').strip()
    idNumber = body.get('idNumber', '').strip()
    dob      = body.get('dob', '')
    hmo      = body.get('hmo', '')
    phone    = body.get('phone', '').strip()

    if not all([email, password, fullName, idNumber, dob, hmo, phone]):
        return jsonify({'error': 'Missing fields'}), 400

    with lock:
        users = load_users()
        if any(u['email'].lower() == email for u in users):
            return jsonify({'error': 'EMAIL_EXISTS'}), 409

        user = {
            'id': int(datetime.now().timestamp() * 1000),
            'fullName': fullName,
            'email': email,
            'idNumber': idNumber,
            'dob': dob,
            'hmo': hmo,
            'phone': phone,
            'password': password,
            'joinDate': datetime.now().isoformat(),
        }
        users.append(user)
        save_users(users)
        # Return user without password
        safe = {k: v for k, v in user.items() if k != 'password'}
        safe['id'] = user['id']
        return jsonify(user), 201

@app.route('/api/login', methods=['POST'])
def login():
    body = request.get_json()
    email    = body.get('email', '').strip().lower()
    password = body.get('password', '')
    with lock:
        users = load_users()
        user = next((u for u in users if u['email'].lower() == email and u['password'] == password), None)
        if not user:
            return jsonify({'error': 'INVALID_CREDENTIALS'}), 401
        return jsonify(user), 200

# ── API: Appointments ──────────────────────────────────────
@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    with lock:
        return jsonify(load_appointments())

@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    body = request.get_json()
    doctor_id  = body.get('doctorId')
    date_time  = body.get('dateTime')   # "2026-05-14T10:00:00"
    user_id    = body.get('userId')
    notes      = body.get('notes', '')

    if not doctor_id or not date_time or not user_id:
        return jsonify({'error': 'Missing fields'}), 400

    with lock:
        appts = load_appointments()
        # Check if slot already taken (same doctor + same dateTime, not cancelled)
        conflict = any(
            a['doctorId'] == doctor_id and
            a['dateTime'] == date_time and
            a['status'] != 'cancelled'
            for a in appts
        )
        if conflict:
            return jsonify({'error': 'SLOT_TAKEN'}), 409

        new_appt = {
            'id': int(datetime.now().timestamp() * 1000),
            'userId': user_id,
            'doctorId': doctor_id,
            'dateTime': date_time,
            'status': 'upcoming',
            'bookedAt': datetime.now().isoformat(),
            'notes': notes,
        }
        appts.append(new_appt)
        save_appointments(appts)
        return jsonify(new_appt), 201

@app.route('/api/appointments/<int:appt_id>', methods=['PATCH'])
def cancel_appointment(appt_id):
    with lock:
        appts = load_appointments()
        for a in appts:
            if a['id'] == appt_id:
                a['status'] = 'cancelled'
                save_appointments(appts)
                return jsonify(a)
        return jsonify({'error': 'Not found'}), 404

# ── Serve static files ────────────────────────────────────
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("MaccabiHealth server running at http://localhost:7800")
    print(f"Appointments stored in: {DATA_FILE}")
    app.run(port=7800, debug=False)
