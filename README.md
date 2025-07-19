#MyRentalApp - Property Rental Management System

A modern, responsive Angular-based web application for property rental management with user authentication, booking system, and real-time date range selection.
## 📁 Project Structure

```
myRentalApp/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   ├── signup.component.html
│   │   │   │   ├── signup.component.css
│   │   │   │   └── signup.component.ts
│   │   │   ├── login/
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.css
│   │   │   │   └── login.component.ts
│   │   │   └── auth.service.ts
│   │   ├── landing-page/
│   │   │   ├── landing-page.component.html
│   │   │   ├── landing-page.component.css
│   │   │   ├── landing-page.component.ts
│   │   │   ├── booking-popup.component.html
│   │   │   ├── booking-popup.component.css
│   │   │   ├── booking-popup.component.ts
│   │   │   ├── data-service.service.ts
│   │   │   ├── data-service.service.specs.ts
│   │   │   ├── my-bookings.component.html
│   │   │   ├── my-bookings.component.css
│   │   │   └── my-bookings.component.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   ├── assets/
│   │   └── icons/
│   │       ├── calendar.svg
│   │       ├── house.svg
│   │       ├── money.svg
│   │       └── booking-list.svg
│   └── environments/
├── package.json
├── angular.json
└── README.md
```
## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v15 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd myRentalApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open application**
   Navigate to `http://localhost:4200` in your browser

### Build for Production
```bash
ng build --prod
```
