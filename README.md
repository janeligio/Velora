# Velora Application

A professional-grade React + TypeScript + Vite + TailwindCSS application foundation.

---

## ✨ Core Features

- **Authentication**

  - Secure login flow using Access Tokens and Refresh Tokens.
  - Persistent authentication via localStorage.
  - Automatic session refresh using a manual popup every 14 minutes.

- **Protected Routes**

  - Certain pages (e.g., Dashboard) require authentication.
  - Users are redirected to `/login` if not logged in.
  - After login, users return to the originally requested page.

- **Logging**

  - Page views are logged via a `PageLogger` component.
  - Logs include path, timestamp, user ID, and user agent.
  - Future support planned for logging all API requests.

- **Theme Management**

  - User's selected theme ("light" or "dark") dynamically adjusts UI.
  - TailwindCSS handles dark mode using the `dark` class on `<html>`.
  - Custom CSS also respects theme using `.dark .your-class {}` patterns.

- **Session Manager**

  - Every 14 minutes, users are prompted with a popup to refresh their session.
  - If no action is taken within 1 minute, users are logged out.

- **Form Handling**
  - Controlled React form on the Account Settings page.
  - Fields: Name, Rank, Jdir, Email, Phone, Theme selector (dropdown).
  - Validation for required fields, valid email format, and phone numbers.

---

## 🛠 Technologies

- React
- TypeScript
- Vite
- TailwindCSS
- Custom Context Providers (AuthProvider, ThemeProvider)
- React Router
- Fetch API for communication with backend

---

## 📈 Architecture Overview

Root
│
├── AuthProvider
├── ThemeProvider
├── SessionManager
├── PageLogger
└── App (Protected Routes + Pages + Layout)

---

## 🚀 Future Plans

- Admin page
- Banner markings
- Log every API request (for observability).
- Add session ID tracking.
- Add frontend error logging.
- Add local session timeout warning.
- Potential support for system theme detection (auto light/dark).

---

## 📄 License

MIT License (or your preferred license).
