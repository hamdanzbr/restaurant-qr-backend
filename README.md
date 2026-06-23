# Restaurant QR Ordering System - Backend

A RESTful backend API for a restaurant QR ordering system built with Node.js, Express.js, PostgreSQL, Prisma ORM, and Socket.IO.

## Features

### Authentication & Authorization

* Admin login with JWT authentication
* Protected admin routes
* Role-based authorization

### Category Management

* Create category
* Update category
* Delete category
* List all categories
* Category statistics

### Dish Management

* Create dish
* Update dish
* Delete dish
* Search dishes
* Filter by category
* Sort dishes
* Dish statistics
* Cloudinary image uploads

### Table Management

* Create restaurant tables
* Generate QR codes for tables
* Update table information
* Delete tables

### Order Management

* Create customer orders
* View all orders
* View order details
* Update order status
* Order status validation
* Real-time order updates using Socket.IO

### Dashboard & Analytics

* Dashboard summary metrics
* Revenue analytics
* Popular dishes
* Popular categories
* Peak ordering hours
* Recent orders

### Real-Time Features

* Live order creation updates
* Live order status updates
* Customer order tracking
* Admin live order board

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Socket.IO
* Cloudinary
* QRCode
* Zod Validation

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd restaurant-backend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start development server:

```bash
npm run dev
```

## Production

```bash
npm start
```

## API Base URL

```txt
/api
```

## Deployment

Backend deployed on Railway.
