# DeleteDB Signup Flow

A full stack demonstration of privacy by design with automatic data deletion, real-time monitoring and temporary sessions.

> Docker deployment in progress. Current version uses SQLite for local development.

## Key Features

- **Automatic Data Deletion**: User data removed after 5 minutes or manual logout
- **Real-Time Monitoring**: Live database widget and admin dashboard show data creation and deletion
- **Email Hashing**: SHA-256 encryption before storage
- **Session Management**: Countdown timer with automatic expiry
- **Transaction Safety**: Atomic operations prevent data inconsistency
- **Privacy Metrics**: Only anonymized aggregate counters persist

## Architecture

### User Flow
```
Signup → Email Confirmation → 5-Min Session → Logout/Expiry → Data Deleted
```

### Privacy Implementation
- **Temporary Storage**: Users exist only during active session
- **Automatic Expiry**: Background cleanup removes expired/abandoned users 
- **Minimal Data**: Only essential fields stored (name, email hash, timestamps)
- **Aggregate Only**: Post-deletion, only completion counters remain

## 🛠️ Tech 

**Frontend:** React | TypeScript | Vite | Tailwind CSS | React Router  
**Backend:** Node.js | Express | TypeScript | SQLite3 | RESTful API  
**Features:** Database transactions | Session management | Responsive design

---

## 📦 Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm

### Setup
```bash
# clone repository
git clone https://github.com/aaronAlien/delete_db
cd delete_db

# backend
cd backend
npm install
cp .env.example .env
npm run dev  # runs on http://localhost:3001

# frontend (new terminal)
cd frontend
npm install
npm run dev  # runs on http://localhost:5173
```

## Usage

1. **Enable Live Monitor**: Click prompt for wdiget or admin dashboard to watch database in real-time
2. **Sign Up**: Enter name and email (_real information not required, only correct format_)
3. **Confirm Email**: Click button in simulated inbox
4. **Session Homepage**: 5-minute countdown begins
5. **Observe Database**: Widget/admin shows user exists
6. **Logout**: Click logout button (or await timer countdown)
7. **Verify Deletion**: Widget/admin confirms database is empty

> Built to demonstrate privacy first development principles and responsible data handling.