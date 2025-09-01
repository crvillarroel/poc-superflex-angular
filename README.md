# Shipping Information App

This Angular application contains a shipping information form component based on a Figma design.

## Getting Started

1. Install dependencies:
\```bash
npm install
\```

2. Start the development server:
\```bash
npm start
\```

3. Open your browser and navigate to `http://localhost:4200`

## Features

- Responsive shipping information form
- Form validation with Angular Reactive Forms
- Custom styled components matching Figma design
- Inter font integration
- Accessible form controls

## Project Structure

- `src/app/shipping-information/` - Main shipping information component
- `src/app/app.module.ts` - Main application module
- `src/styles.css` - Global styles
- `src/index.html` - Main HTML template with Inter font

## Form Fields

- Full Name (required)
- Location (required dropdown)
- Delivery Note (optional textarea)
- Accept Terms checkbox (required)

The form includes proper validation and will only submit when all required fields are completed.
