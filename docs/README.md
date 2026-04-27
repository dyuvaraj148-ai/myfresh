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

## 📦 Installation

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB Atlas account
- Cloudinary account (for image uploads)
- Stripe account (for payments)

### Backend Setup
1. Navigate to the Server directory:
   ```
   cd Server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the Server directory with the following variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the server:
   ```
   npm run server
   ```

### Frontend Setup
1. Navigate to the Client directory:
   ```
   cd Client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

---

## 🚀 Usage

1. Open your browser and go to `http://localhost:5173` (or the port shown by Vite).
2. Register a new account or login.
3. Browse products, add to cart, place orders.

For admin/seller features, login as a seller.

---

## 📚 Documentation

Detailed API documentation can be found in [docs/API.md](docs/API.md).

---

## 📡 API Endpoints

### User Routes
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile

### Product Routes
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add a new product (Seller only)
- `POST /api/product/remove` - Remove a product (Seller only)

### Cart Routes
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item
- `GET /api/cart/get` - Get user's cart

### Order Routes
- `POST /api/order/place` - Place an order
- `GET /api/order/userorders` - Get user's orders

### Address Routes
- `POST /api/address/add` - Add address
- `GET /api/address/get` - Get user's addresses

### Seller Routes
- `POST /api/seller/login` - Seller login
- `GET /api/seller/orders` - Get all orders (Seller only)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

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
