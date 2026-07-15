# ☀️ SunCart – Summer Essentials Store

A modern and responsive summer eCommerce web application built with **Next.js** where users can browse seasonal products, view detailed information, authenticate securely, and manage their profiles.

---

## 🌐 Live Demo

🔗 Live Site: https://preeminent-tarsier-8d1b1b.netlify.app/

---

## 📂 GitHub Repository

🔗 Repository: https://github.com/sushantarsushil-hub/SunCart/tree/main

---

# 📖 Project Overview

SunCart is a modern online shopping platform designed for summer essentials. Users can explore sunglasses, skincare products, beach accessories, summer outfits, and more.

The application includes secure authentication using **BetterAuth**, protected product details pages, Google Sign-In, user profile management, and a clean responsive interface.

---

# ✨ Features

### 🏠 Home Page

- Beautiful Summer Hero Banner
- Summer Sale Promotion
- Popular Products Section
- Summer Care Tips
- Top Brands Section
- Responsive Design

---

### 🛍 Products

- Browse Summer Products
- Product Cards
- Product Rating
- Product Price
- View Product Details
- Protected Product Details Page

---

### 🔐 Authentication

- BetterAuth Authentication
- Email & Password Login
- Email & Password Registration
- Google Sign In
- Protected Routes
- Redirect Back After Login
- Error Handling with Toast

---

### 👤 User Profile

- View User Information
- User Avatar
- User Email
- User Name
- Update Profile Information
- Update Name
- Update Profile Image

---

### 🎨 UI Features

- Responsive Navbar
- Responsive Footer
- Mobile Friendly Layout
- DaisyUI Components
- Tailwind CSS Styling
- Modern Card Design

---

### ✨ Bonus Features

- Google Authentication
- Protected Routes
- Profile Update
- Lottie / Animate.css / React Spring Animation
- Toast Notifications

---

# 🛒 Product Information

Each product contains

- ID
- Product Name
- Brand
- Category
- Price
- Rating
- Stock
- Description
- Product Image

Example:

```json
{
  "id": 1,
  "name": "UV Protection Sunglasses",
  "brand": "SunShade",
  "price": 15,
  "rating": 4.7,
  "stock": 10,
  "description": "Stylish UV protection sunglasses perfect for summer outings.",
  "category": "Accessories"
}
```

---

# 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- DaisyUI / HeroUI

### Authentication

- BetterAuth
- Google OAuth

### Styling

- Tailwind CSS
- DaisyUI

### Animation

- Animate.css / Lottie / React Spring

### Deployment

- Vercel

---


---

# 🔐 Authentication Flow

### Register

- Name
- Email
- Photo URL
- Password

↓

Account Created Successfully

↓

Redirect to Login

---

### Login

- Email
- Password

↓

Login Success

↓

Redirect to Home

---

### Google Login

Click Google Login

↓

Authenticate

↓

Redirect to Home

---

### Protected Route

Guest User

↓

Click Product Details

↓

Redirect to Login

↓

Login Successful

↓

Redirect Back to Product Details

---

# 👤 My Profile

Users can view

- Profile Image
- Name
- Email

Users can update

- Name
- Profile Image

---

# 📱 Responsive Design

Supports

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/your-username/suncart.git
```

Go to project directory

```bash
cd suncart
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔑 Environment Variables

Create a `.env.local` file in the root directory.

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

# 📦 Dependencies

- next
- react
- tailwindcss
- daisyui
- better-auth
- react-icons
- react-hot-toast
- lottie-react / animate.css / react-spring

---

# 🎯 Future Improvements

- Shopping Cart
- Wishlist
- Product Search
- Product Filtering
- Product Categories
- Dark Mode
- Payment Gateway
- Order History
- Admin Dashboard
- Product Reviews

---

# 📸 Screenshots

## Home Page

_Add Screenshot_

---

## Products Page

_Add Screenshot_

---

## Product Details

_Add Screenshot_

---

## Login Page

_Add Screenshot_

---

## Register Page

_Add Screenshot_

---

## My Profile

_Add Screenshot_

---

# 👨‍💻 Author

**Sushanta Ranjan Sushil**

Frontend Developer

LinkedIn: https://linkedin.com/in/your-profile

---

# 📄 License

This project is developed for educational purposes.

MIT License

---

⭐ If you like this project, don't forget to give it a star!
