# DeleteDB Signup Flow

A **privacy-first full-stack demo** showing how user data can be handled responsibly through **temporary storage, automatic deletion, and real-time monitoring**.

The application simulates a signup flow where user records exist **only during an active session** and are automatically deleted afterwards.

---

## ✨ Overview

This project explores ther **ephemeral user data** approach. User information exists **only while needed**, then is automatically removed once the session ends.

A **live database monitor** widget and /admin page makes this lifecycle visible, showing when records are created and deleted in real time.

---

## User Flow
Signup → Email Confirmation → 5-Minute Session → Logout / Expiry → Data Deleted


1. User signs up with name and email  
2. Simulated email confirmation completes signup  
3. Temporary session begins (5-minute lifetime)  
4. Database monitor shows active user record  
5. Session expires or user logs out  
6. User data is deleted automatically
7. Auto cleanup deletes pending users afetr 10 minutes
8. Only anonymised aggregate counters remain

---

## Privacy Design

- **Temporary Data Storage** — users exist only during an active session  
- **Automatic Expiry** — background cleanup removes expired sessions  
- **Minimal Data Collection** — only name, hashed email, and timestamps stored  
- **Email Hashing** — SHA-256 hashing before database storage  
- **Aggregate Metrics Only** — anonymised counters persist after deletion

---

## 🛠 Tech Stack

**Frontend**  
React · Vite · Tailwind CSS · React Router

**Backend**  
Node.js · Express · PostgreSQL

**Infrastructure**  
Docker · Docker Compose · Vercel · Railway 

---

## Technical Highlights

- **TypeScript** across frontend and backend  
- **RESTful API architecture** separating client and server  
- **Session lifecycle management** with automatic expiry  
- **Database transactions** to maintain data consistency  
- **Containerised development environment** using Docker  
- **Responsive mobile-first UI** built with Tailwind CSS

---

## Purpose

This project demonstrates:

- privacy first application design  
- responsible data lifecycle management  
- modern full-stack development practices  
- production-style architecture with containerisation

Built as a **portfolio project to explore privacy-by-design principles in modern web applications.**
