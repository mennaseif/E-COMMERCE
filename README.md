# E-COMMERCE
 🛒 E-Commerce Backend
📋 Table of Contents
📖 Introduction
✨ Features
💻 Technologies Used
⚙️ Installation
🚀 Usage
🔗 API Endpoints
🤝 Contributing

📖 Introduction
This is the backend of the 🛍️ E-Commerce application, built with Node.js and Express.js. It handles API endpoints for user authentication, product management, order processing, and payment integration.

✨ Features
👤 User Authentication (JWT-based)
🛍️ Product Management (CRUD operations)
📦 Order Management
💳 Payment Integration (Stripe API)
🛠️ Admin Access Control
💻 Technologies Used
Backend Framework: Node.js, Express.js 🖥️
Database: MongoDB 🗄️
Authentication: JWT (JSON Web Tokens) 🔐
Payment Gateway: Stripe API 💸
⚙️ Installation
To run the backend server locally, follow these steps:

Clone the repository:
git clone https://github.com/mennaseif/E-COMMERCE.git
cd E-COMMERCE/server
Install the necessary dependencies:
npm install
Set up environment variables: Create a .env file in the server directory and add the following:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Start the server:

npm run dev
🚀 Usage
Once the server is up and running, the API will be accessible at http://localhost:3000. You can interact with the API using tools like Postman to test the following features:

User Authentication: Login, Register, Token-based auth
Product Management: Add, Edit, Delete products
Order Processing: Create and view orders
Payment: Integration with Stripe for order payments
🔗 API Endpoints
Here are the main API endpoints:

🛍️ Products
GET /api/products - Get all products
GET /api/products/:id - Get a product by ID
POST /api/products - Add a new product (Admin only)
PUT /api/products/:id - Update a product (Admin only)
DELETE /api/products/:id - Delete a product (Admin only)
👤 Users
POST /api/users/login - Authenticate user
POST /api/users/register - Register a new user
GET /api/users/profile - Get user profile (Protected route)
📦 Orders
POST /api/orders - Create a new order
GET /api/orders/:id - Get order details
GET /api/orders/myorders - Get logged-in user orders
PUT /api/orders/:id/pay - Mark an order as paid (Stripe)
🤝 Contributing
Feel free to contribute by submitting a pull request 🛠️. Make sure to follow the coding guidelines and document your changes properly.
