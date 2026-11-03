# DriveNow – Car Rental System (React + Vite)

A React conversion of the original DriveNow HTML/CSS/JavaScript project.

## Features
- Home page with red-and-white DriveNow branding
- User registration and login using Local Storage
- Admin login and protected admin dashboard
- Browse and search available cars
- Rental date selection and automatic price calculation
- User booking history
- Admin car inventory: add, edit and delete cars
- Admin booking overview and dashboard statistics

## Tech stack
React, Vite, React Router, CSS, JavaScript and Browser Local Storage.

## Run locally
1. Install Node.js (LTS).
2. Open this project folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed in the terminal (usually http://localhost:5173).

## Demo admin login
- Email: `admin@drivenow.com`
- Password: `admin123`

Users can create an account from the Register page. Data is stored in the browser's Local Storage. This is a frontend academic demo; Local Storage is not secure authentication for a production application.

## Build for deployment
Run `npm run build`. Vite creates the production build in `dist/`.

## Deploy on Vercel
Import the GitHub repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
