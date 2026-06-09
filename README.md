# TaskMeet Authentication App

A production-ready React 18 authentication app built with Vite, React Router DOM v7, Zustand, Axios, and SCSS modules.

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

## Features

- Email/password login form
- Field validation and loading states
- Centralized Axios instance with auth interceptor
- Protected dashboard route
- Zustand auth store with token and user info
- Responsive mobile-first design
- Logout flow with cleanup

## Project Structure

- `src/api/` - API layer and Axios setup
- `src/store/` - Zustand auth store
- `src/pages/` - Login and Dashboard pages
- `src/components/` - Reusable UI components
- `src/layouts/` - Page layouts
- `src/router/` - App routing
- `src/hooks/` - Auth hooks

## Notes

The application uses the Meetusvr API endpoints defined in the task prompt, including `token` and `user/info`.
