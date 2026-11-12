# Stackly — Vanilla Frontend

A multi-screen travel and hospitality frontend built with **HTML5, CSS3 and vanilla JavaScript only**. No React, Vite, npm, bundler or build step.

## Run with VS Code Live Server
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Install the Live Server extension.
4. Right-click `index.html` → **Open with Live Server**.

## Publish on GitHub Pages
1. Push the contents of this folder to the root of your GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
4. Wait for GitHub Pages to publish the site.

## Screens included
- Landing / destination discovery
- Search results, sorting and filters
- Property details, gallery, room/rate selection
- Login and create-account screens
- Checkout form and booking summary
- Booking confirmation
- My Trips and saved stays
- Responsive desktop/mobile navigation
- Footer, help information and FAQ

## Interaction and animation
- Animated preloader and reveal-on-scroll transitions
- Hero image motion, image hover zoom, floating stamp
- Responsive mobile menu, sticky header
- Search/filter/sort interactions
- Save-to-favourites with localStorage
- Login/signup demo flow with password visibility and strength meter
- Checkout demo flow, generated booking reference and local trip persistence
- FAQ accordion, toast notifications and reduced-motion support

## Design source notes
The supplied Figma exports cover Landing, Destination & experience discovery, Search results, Property & trip detail, Booking & checkout, Booking confirmation & trip summary, Site navigation, Footer and Recommendation cards. The login/sign-up screens were not present in those supplied exports; these have been added in the same Stackly visual language to satisfy the requested account journey.

## Backend handoff
This is a frontend prototype. Authentication, social login, inventory, real availability, booking creation, email delivery and payments are not connected to a backend. Demo profile, saved stays and demo booking are stored only in the current browser's `localStorage`.

Suggested API integration points:
- `POST /auth/login`, `POST /auth/register`, `POST /auth/forgot-password`
- `GET /destinations`, `GET /stays?destination=&checkIn=&checkOut=&guests=`
- `GET /stays/:id`, `GET /stays/:id/availability`
- `POST /bookings`, `GET /bookings/:reference`, `GET /me/bookings`
- Payment provider checkout/session endpoints (never process card data directly in browser code)

Replace the demo handlers in `app.js` with API requests and server-side validation. Never use real card data with this prototype.

## External assets
Google Fonts and travel photographs are loaded from external CDNs (Google Fonts and Unsplash). A live internet connection is required for those assets. The Stackly logo is bundled locally.


### Header logo and navigation update
The header uses a transparent, tightly cropped light Stackly wordmark (`assets/stackly-logo-light.png`) and a high-contrast pill navigation with clear active, hover, and focus states.


### Demo authentication behaviour
- The login form accepts any non-empty email and password (email must be a valid email format).
- Successful demo login returns to the Explore/home page and updates the profile menu.
- Demo authentication is stored in `sessionStorage` for the current browser tab only.
- Opening the login page clears stale profiles left by older builds. Logout clears the demo session.
- This is frontend-only demo authentication. Replace it with backend authentication before production.
