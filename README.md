# OfficeBites 🍽️

OfficeBites is a **smart cafeteria ordering web application** built with **React, TypeScript, and Vite**.  
It simulates an office or campus cafeteria experience where users can browse food stalls, place digital orders, track preparation status, and view order history — all with realistic UX and business rules.

This project is **frontend-focused** and designed to demonstrate:
- modern React architecture
- global state management
- route protection
- session vs account modeling
- scalable UI patterns

---

## 🧠 Core Concepts Used

- **React Context API** for global state (Cart, Search)
- **Route guards** using React Router
- **Session vs Account scoped data**
- **Derived UI & calculated state**
- **Clean separation of UI & business logic**
- **Frontend architecture ready for backend integration**

---

## 🧩 Tech Stack

- React 19
- Vite
- TypeScript
- React Router DOM
- Material UI (MUI)
- Axios
- LocalStorage (for persistence simulation)

---

## 🚀 Features

- Select cafeteria location or office hub
- Search restaurants, stalls, and menu items from the top navbar
- Browse cafeteria stalls and inspect menus
- Add and remove items from a global cart
- Simulate checkout flow with Pay at Counter or UPI
- Generate a pickup token after order placement
- View live order preparation status
- See current and past order history
- Use profile dropdown to access orders and order status

---

## 📁 Project Structure

```
src/
│
├── assets/                 # Images, icons and static assets
├── components/             # Reusable UI components
│   ├── CartBar.tsx
│   ├── CafeteriaList.tsx
│   ├── CurrentOrder.tsx
│   ├── DealCard.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── IconSwitch.tsx
│   ├── LocationModal.tsx
│   ├── MenuItemRow.tsx
│   ├── MenuShimmer.tsx
│   ├── Navbar.tsx
│   ├── PastOrders.tsx
│   ├── RestaurantFooter.tsx
│   └── SearchBar.tsx
├── context/                # Application state providers
│   ├── CartContext.tsx
│   └── SearchContext.tsx
├── hooks/                  # Custom React hooks
│   └── useGeolocation.ts
├── pages/                  # Route page components
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Menu.tsx
│   ├── OrderConfirmation.tsx
│   ├── Orders.tsx
│   ├── Profile.tsx
│  
├── utils/                  
│   └── logout.ts             
│   └── orderStorage.ts
├── App.tsx
└── main.tsx
```

## 💻 Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Generate a production-ready build
- `npm run preview` - Preview the build locally
- `npm run lint` - Run ESLint across the project

## 🧠 How it Works

- `src/context/CartContext.tsx` manages the cart state across the app
- `src/context/SearchContext.tsx` enables global search from the navbar
- `src/pages/Menu.tsx` displays menu items and adds them to the cart
- `src/pages/Checkout.tsx` simulates order submission and payment selection
- `src/pages/OrderConfirmation.tsx` shows the pickup token and order details
- `src/pages/Orders.tsx` lists past orders and current order status

## 🎯 Use Cases

- Office cafeteria ordering experience
- Campus meal ordering simulation
- Food ordering UX prototype for restaurants and vendors
- Demonstration of React state management and e-commerce workflows

## � Future Improvements

- Add backend integration for real order persistence and user authentication
- Support real payment gateways and secure UPI/payment flows
- Add vendor/stall management and menu administration panels
- Improve accessibility and mobile responsive layout
- Add user profiles with favorites and saved orders
- Implement push notifications and live order updates
- Add location-based cafeteria suggestions and multi-tenant support

## �📌 Notes

This project is a frontend-focused demo app and uses simulated payment and order flows. It is designed for prototyping and UX presentation rather than a production-ready backend deployment.

