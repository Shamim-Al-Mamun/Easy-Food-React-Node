# 🍔 Easy Food – Online Food Ordering Platform

**Easy Food** is a modern food e-commerce platform where users can browse, order, and review food items. Built with a powerful tech stack using React, Redux Toolkit, Tailwind CSS, Node.js, and MongoDB – it offers a seamless and responsive user experience with role-based access control.

---

## 🚀 Features

### 👤 User
- Register/Login with JWT authentication
- View and manage own orders from dashboard
- Update profile and change password
- Add food items to wishlist
- Post reviews on products
- Make payments via **Stripe** or opt for **Cash on Delivery**

### 🛠 Admin
- Full website control panel
- Add, update, delete products and categories
- Promote users to admin or remove users
- View total stats: products, categories, wishlist items, reviews, and orders
- Update order statuses

---

## 💻 Tech Stack

### 🧑‍🎨 Frontend
- **React**
- **React Router DOM**
- **Tailwind CSS**
- **Redux Toolkit** (with `useState` for local state)
- **Redux Toolkit Query** (for all API interactions)
- **Swiper** (for sliders/carousels)
- **Stripe Payment Integration**

### 🔧 Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose** (for schema and relationships)
- **JSON Web Token (JWT)** (for auth & protected routes)
- **Express-validator** (for input validation)

---

## 📦 Installation Guide

To set up the project locally, follow the steps below:

### 🧩 Project Structure

- `client/` — Contains the frontend built with React, Tailwind CSS, Redux Toolkit, and Stripe integration.
- `server/` — Backend API built with Node.js, Express.js, MongoDB (via Mongoose), JWT, and other helper libraries.

---

### 🖥️ Client Setup

The client directory contains all the React-based frontend code. It handles user authentication, product browsing, wishlist, reviews, and integration with Stripe for payments.

- Install all dependencies using `npm install`.
- Ensure the API base URL matches your backend server (usually `http://localhost:5000`).
- Start the development server to serve the frontend.

---

### 🖧 Server Setup

The server directory is responsible for:

- User authentication and authorization (JWT)
- Product and category management
- Order and review handling
- Admin role management
- Integration with Stripe for payment processing

To run the server:

- Install dependencies using `npm install`.
- Create a `.env` file with the necessary environment variables (example below).
- Start the server.

---

### 🔐 .env Configuration

Create a `.env` file in the `server/` directory with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

