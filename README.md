# 🛒 MyFresh - Full Stack E-commerce Web App

## 📌 Description
MyFresh is a full-stack e-commerce web application where users can browse products, add items to cart, place orders, and manage addresses. It also includes an admin panel for managing products, stock, and orders.

---

## 🌍 Live Demo
🔗 Frontend:(https://myfresh.vercel.app/) 
🔗 Backend API:(https://myfresh-backend.vercel.app/)
---

## 🚀 Features

### 👤 User Features
- User Authentication (Signup/Login)
- Browse Products
- Add to Cart
- Place Orders
- Manage Addresses
- Order History

### 🛠️ Admin Features
- Add  Products
- Upload Product Images
- Manage Orders
- Toggle Stock Availability

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Other Tools
- Cloudinary (Image Upload)
- JWT (Authentication)

---

## 📂 Project Structure
myfresh/
│── client/          # Frontend (React)
│── server/          # Backend root
│    │── models/        # Mongoose Models
│    │── routes/        # API Routes
│    │── controllers/   # Business Logic
│    │── middleware/    # Auth & CORS
│    │── config/        # DB, Cloudinary, etc.
│    │── server.js / app.js   # Entry point
│    │── package.json

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/dyuvaraj148-ai/myfresh.git
cd myfresh

###2️⃣ Install Dependencies
Backend
cd server
npm install
Frontend
cd ../client
npm install

###🔐 Environment Variables
Create a .env file inside the server/ directory:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_secret

###▶️ Run the Project Locally
Start Backend Server
cd server
npm run server
Start Frontend
cd ../client
npm run dev

👨‍💻 Author
Yuvaraj
