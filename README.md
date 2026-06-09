# TaskMeet Authentication App

A production-ready Next.js 15 authentication app built with App Router, Zustand, Axios, and SCSS modules.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: SCSS Modules
- **React Version**: 19

## Quick Start

1. Install dependencies
   ```bash
   npm install
   ```

2. Run development server
   ```bash
   npm run dev
   ```

3. Open the local URL shown in the terminal to view the app.

4. Build for production
   ```bash
   npm run build
   npm start
   ```

## Features

- Email/password login form with validation
- Real-time field validation with error messages
- Centralized Axios instance with authentication interceptor
- Protected dashboard route with middleware
- Zustand auth store for state management
- Token-based authentication with localStorage
- Responsive mobile-first design
- Logout flow with cleanup
- Loading states and error handling
- Auto-redirect based on auth status

## Project Structure

```
app/
├── login/
│   ├── page.jsx           # Login page component
│   └── page.module.scss   # Login page styles
├── dashboard/
│   ├── page.jsx           # Protected dashboard page
│   └── page.module.scss   # Dashboard styles
├── layout.jsx             # Root layout with metadata
├── page.jsx               # Root page (redirects to login)
├── AuthLayoutWrapper.jsx  # Auth state initialization
└── layout.scss            # Global styles

components/
├── InputField.jsx         # Form input component
├── InputField.module.scss
├── Button.jsx             # Reusable button component
├── Button.module.scss
├── AuthLayout.jsx         # Login page layout
├── AuthLayout.module.scss
├── DashboardLayout.jsx    # Dashboard layout
├── DashboardLayout.module.scss
├── ProtectedRouteWrapper.jsx  # Protected route wrapper
└── ProtectedRoute.jsx     # Legacy protected route (ref)

lib/
├── axios.js              # Axios configuration with interceptors
├── auth.api.js           # Login API
└── user.api.js           # User info API

store/
└── authStore.js          # Zustand authentication store

public/
├── meetus.png            # Branding image
├── sms.png               # Email icon
└── lock.png              # Password icon
```

## Authentication Flow

### On App Load
1. Check if token exists in localStorage
2. If token exists:
   - Set token in Zustand store
   - Call user info endpoint
   - If successful: Save user in store and redirect to dashboard
   - If fails: Clear token and redirect to login
3. If token doesn't exist: Show login page

### After Successful Login
1. Save token to localStorage
2. Set token in Zustand store
3. Call user info endpoint
4. Save user data in store
5. Redirect to dashboard

### On Logout
1. Clear localStorage token
2. Clear Zustand auth state
3. Redirect to login

## API Integration

### Base URL
`https://api-yeshtery.dev.meetusvr.com/v1`

### Endpoints

**Login**
- **POST** `/yeshtery/token`
- Body: `{ email, password, isEmployee: true }`
- Response: `{ token, refresh }`

**User Info**
- **GET** `/user/info`
- Headers: `Authorization: Bearer {token}`
- Response: `{ id, name }`

## Key Differences from React (Vite) to Next.js

1. **Routing**: Replaced React Router with Next.js App Router
2. **Navigation**: Replaced `useNavigate()` with Next.js `useRouter()`
3. **Build Tool**: Replaced Vite with Next.js
4. **Project Structure**: Moved pages to `app/` directory
5. **Client Components**: Added `'use client'` directives where needed
6. **Authentication**: Implemented in `AuthLayoutWrapper.jsx` instead of `App.jsx`
7. **Dependencies**: Removed `react-router-dom`, uses Next.js built-in routing
8. **Assets**: Public files moved to `public/` directory

## Component Details

### AuthLayoutWrapper.jsx
Client component that runs on app initialization:
- Checks for saved token
- Fetches user info if token exists
- Handles redirects based on auth status
- Shows loading state during auth check

### ProtectedRouteWrapper.jsx
Client component that wraps protected pages:
- Checks if user is authenticated
- Redirects to login if not authenticated
- Prevents flash of content by returning null until auth state is ready

### Login Page (`app/login/page.jsx`)
- Email and password inputs with icons
- Real-time validation
- Server error handling
- Form submission with loading state
- Sign up link placeholder

### Dashboard Page (`app/dashboard/page.jsx`)
- Protected route with ProtectedRouteWrapper
- Displays user ID and name
- Logout functionality
- Responsive layout

## Styling

All styles use SCSS Modules for scoped CSS:
- Prevents style conflicts
- Auto-generated class names
- Better maintainability
- CSS Modules are natively supported by Next.js

## Zustand Store

The `useAuthStore` manages:
- `token`: Authentication token
- `user`: User object with `id` and `name`
- `setToken()`: Update token
- `setUser()`: Update user data
- `clearAuth()`: Clear all auth data

## Axios Interceptors

**Request Interceptor**:
- Automatically attaches Bearer token to all requests

**Response Interceptor**:
- On 401 error: Clears token, resets auth state, redirects to login

## Notes

- The app requires a valid authentication token from the API
- Test credentials: email: `dev.aert@gmail.com`, password: `helloworld`
- All styling is preserved from the original React app
- All API integrations work the same way as before
- State management remains unchanged (Zustand)
- Form validation logic is identical

## Production Deployment

1. Build the app:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Environment variables can be configured in `.env.local`

## Migration Notes

This is a complete migration from React (Vite) + React Router to Next.js 15 App Router. All existing functionality, styling, and business logic have been preserved exactly as they were in the original application.
