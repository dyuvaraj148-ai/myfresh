# API Documentation

This document provides detailed information about the MyFresh e-commerce API endpoints.

## Base URL
```
https://myfresh-backend.vercel.app/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### User Routes

#### Register User
- **Method:** POST
- **Endpoint:** `/user/register`
- **Description:** Register a new user account
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "jwt_token"
  }
  ```

#### Login User
- **Method:** POST
- **Endpoint:** `/user/login`
- **Description:** Login an existing user
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt_token"
  }
  ```

#### Get User Profile
- **Method:** GET
- **Endpoint:** `/user/profile`
- **Description:** Get current user's profile information
- **Headers:** Authorization required
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Product Routes

#### Get All Products
- **Method:** GET
- **Endpoint:** `/product/list`
- **Description:** Retrieve all available products
- **Response:**
  ```json
  {
    "success": true,
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "image": "string",
        "category": "string",
        "stock": "boolean"
      }
    ]
  }
  ```

#### Add Product (Seller Only)
- **Method:** POST
- **Endpoint:** `/product/add`
- **Description:** Add a new product (requires seller authentication)
- **Headers:** Authorization required (seller token)
- **Request Body:** Form data with image upload
  ```
  name: string
  description: string
  price: number
  category: string
  image: file
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product added successfully"
  }
  ```

#### Remove Product (Seller Only)
- **Method:** POST
- **Endpoint:** `/product/remove`
- **Description:** Remove a product (requires seller authentication)
- **Headers:** Authorization required (seller token)
- **Request Body:**
  ```json
  {
    "id": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product removed successfully"
  }
  ```

### Cart Routes

#### Add to Cart
- **Method:** POST
- **Endpoint:** `/cart/add`
- **Description:** Add item to user's cart
- **Headers:** Authorization required
- **Request Body:**
  ```json
  {
    "itemId": "string",
    "quantity": "number"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Item added to cart"
  }
  ```

#### Update Cart
- **Method:** POST
- **Endpoint:** `/cart/update`
- **Description:** Update quantity of item in cart
- **Headers:** Authorization required
- **Request Body:**
  ```json
  {
    "itemId": "string",
    "quantity": "number"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cart updated successfully"
  }
  ```

#### Get Cart
- **Method:** GET
- **Endpoint:** `/cart/get`
- **Description:** Get user's cart items
- **Headers:** Authorization required
- **Response:**
  ```json
  {
    "success": true,
    "cart": [
      {
        "itemId": "string",
        "quantity": "number"
      }
    ]
  }
  ```

### Order Routes

#### Place Order
- **Method:** POST
- **Endpoint:** `/order/place`
- **Description:** Place a new order
- **Headers:** Authorization required
- **Request Body:**
  ```json
  {
    "addressId": "string",
    "items": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Order placed successfully",
    "orderId": "string"
  }
  ```

#### Get User Orders
- **Method:** GET
- **Endpoint:** `/order/userorders`
- **Description:** Get current user's order history
- **Headers:** Authorization required
- **Response:**
  ```json
  {
    "success": true,
    "orders": [
      {
        "id": "string",
        "items": [...],
        "total": "number",
        "status": "string",
        "date": "date"
      }
    ]
  }
  ```

### Address Routes

#### Add Address
- **Method:** POST
- **Endpoint:** `/address/add`
- **Description:** Add a new address for the user
- **Headers:** Authorization required
- **Request Body:**
  ```json
  {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Address added successfully"
  }
  ```

#### Get Addresses
- **Method:** GET
- **Endpoint:** `/address/get`
- **Description:** Get user's saved addresses
- **Headers:** Authorization required
- **Response:**
  ```json
  {
    "success": true,
    "addresses": [
      {
        "id": "string",
        "street": "string",
        "city": "string",
        "state": "string",
        "zipCode": "string",
        "country": "string"
      }
    ]
  }
  ```

### Seller Routes

#### Seller Login
- **Method:** POST
- **Endpoint:** `/seller/login`
- **Description:** Login as a seller
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Seller login successful",
    "token": "jwt_token"
  }
  ```

#### Get All Orders (Seller Only)
- **Method:** GET
- **Endpoint:** `/seller/orders`
- **Description:** Get all orders for seller management
- **Headers:** Authorization required (seller token)
- **Response:**
  ```json
  {
    "success": true,
    "orders": [...]
  }
  ```

## Error Responses
All endpoints may return error responses in the following format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error