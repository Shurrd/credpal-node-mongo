# Node.js + TypeScript + Express + MongoDB API

A REST API with JWT authentication and product management.

## 🚀 Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env`:

```env
DB_URL=mongodb://localhost:27017
DB_NAME=your_database_name
PORT=4000
JWT_SECRET=your_secret_key
```

### Run

```bash
npm run start
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/me` - Get single product for a logged in user (Auth required + Owner only)
- `POST /api/products` - Create product (Auth required)
- `PUT /api/products/:id` - Update product (Auth + Owner only)
- `DELETE /api/products/:id` - Delete product (Auth + Owner only)

## 🔐 Authentication

Add JWT token to protected routes:

```
Authorization: Bearer <your_token>
```

## ✨ Features

- JWT authentication
- Password hashing with bcrypt
- Request validation
- Global error handling
- User can only modify their own products
