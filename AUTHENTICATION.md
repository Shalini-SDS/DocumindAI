# Authentication System Setup

## Overview
A complete authentication system has been implemented with SQLite database, user registration, and login functionality.

## Backend Changes

### 1. User Model (backend/app.py)
- Created `User` model with fields:
  - `id` (primary key)
  - `email` (unique)
  - `username` (unique)
  - `password_hash` (securely hashed)
  - `role` (admin, employee, auditor)
  - `created_at` (timestamp)

- Password hashing using `werkzeug.security`:
  - `set_password(password)` - hashes password with salt
  - `check_password(password)` - verifies password against hash

### 2. Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "role": "employee"  // or "admin", "auditor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "role": "employee",
    "createdAt": "2025-11-21T08:00:00Z"
  }
}
```

**Validations:**
- Email and username must be unique
- Password minimum 6 characters
- Valid roles: admin, employee, auditor (defaults to employee)
- All fields required

#### POST `/api/auth/login`
Authenticate user and get their data.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "role": "employee",
    "createdAt": "2025-11-21T08:00:00Z"
  }
}
```

**Error Responses:**
- `Invalid email or password` (401)
- `Email and password are required` (400)

## Frontend Changes

### 1. Landing Page (frontend/src/pages/Landing.tsx)
- Login form with email and password fields
- Sign up form with email, username, password, and role selection
- Toggle between login and signup views
- Form submission to backend endpoints
- Error/success message display
- User data stored in localStorage after successful auth
- Redirect to appropriate dashboard based on user role

### 2. DashboardLayout Logout
- Added logout button in header
- `handleLogout()` clears localStorage and redirects to login
- Works for all user types (admin, employee, auditor)

### 3. App Routing (frontend/src/App.tsx)
- Landing page set as root route (`/`)
- Dashboard routes: `/admin`, `/employee`, `/auditor`
- User redirected to dashboard based on their role after login

## Database Setup

### Initialization Script
Run `init_db.py` to create database tables and test user:

```bash
python init_db.py
```

This creates:
- SQLite database with User table
- Test admin account:
  - Email: `admin@example.com`
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin`

Database location: `instance/expenses.db`

## Testing the System

### 1. Sign Up
1. Go to http://localhost:5173 (or your frontend URL)
2. Click "Sign up" link
3. Select role (admin/employee/auditor)
4. Enter email, username, password
5. Click "Sign Up"
6. User redirected to appropriate dashboard

### 2. Login
1. Go to http://localhost:5173
2. Enter email and password
3. Click "Sign In"
4. User redirected to their dashboard

### 3. Test Credentials
```
Email: admin@example.com
Password: admin123
Role: admin
```

### 4. Logout
- Click "Logout" button in top header
- User session cleared from localStorage
- Redirected to login page

## Security Features

✓ Password hashing with werkzeug.security
✓ Unique email and username constraints
✓ Password minimum length (6 characters)
✓ Input validation on backend
✓ Role-based access (admin, employee, auditor)
✓ Session management via localStorage

## Technical Stack

- **Backend**: Flask + SQLAlchemy + SQLite
- **Frontend**: React + TypeScript + React Router
- **Auth**: werkzeug.security (PBKDF2 with SHA256)
- **Storage**: SQLite database with User table

## Future Enhancements

- JWT tokens for stateless authentication
- Session timeout and refresh tokens
- Password reset functionality
- Email verification
- Multi-factor authentication (MFA)
- Rate limiting on auth endpoints
- Audit logging for login attempts
