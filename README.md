# 🚀 Social Media Platform

A modern, full-stack social media application built with TypeScript, React, Node.js, and MongoDB.

> ## 🚧 Project Status: Under Development 🚧
> This project is currently being actively developed. Some features may be incomplete or subject to change as development progresses. I'm continuously working on improvements and new functionality. Feel free to check back regularly to see updates and new features being added!

## ✨ Features

- 👤 User authentication with JWT (access & refresh tokens)
- 🔐 Secure password hashing and validation
- 🖼️ Cloudinary integration for image uploads and avatar management
- 🌐 RESTful API architecture
- 📝 Clean code with TypeScript throughout the stack
- 🧩 Modular architecture with separation of concerns

## 🛠️ Tech Stack

### Backend
- **Node.js & Express** - Fast, unopinionated web framework
- **TypeScript** - Static type checking for JavaScript
- **MongoDB & Mongoose** - NoSQL database and ODM
- **JWT** - Secure authentication with access and refresh tokens
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Cloudinary** - Cloud image storage and transformation
- **Socket.io** - Real-time communication

### Frontend
- **React 19** - Latest version of the popular UI library
- **TypeScript** - Type safety for components and state
- **Vite** - Lightning-fast build tool and dev server
- **CSS** - Styling

### Development & Deployment
- **ESLint** - Code quality and style enforcement
- **Nodemon** - Hot reloading during development
- **Environment Variables** - Secure configuration management

## 🏗️ Architecture

The project follows a clean architecture pattern with:

- **MVC Pattern** - Separation of concerns
- **Repository Pattern** - Data access abstraction
- **Service Layer** - Business logic encapsulation
- **Middleware** - Cross-cutting concerns like authentication
- **Controllers** - Request handling
- **Models** - Data representation
- **Routes** - API endpoints organization

## 🔒 Security Features

- JWT-based authentication with short-lived access tokens
- Refresh token rotation for enhanced security
- Password validation with regex patterns for strong passwords
- Environment variable protection for sensitive data
- HTTP security headers with Helmet
- CORS configuration

## 🗂️ Project Structure

my-social-media/<br> ├── client/ # React frontend<br> └── server/ # Node.js backend<br> &nbsp;&nbsp;&nbsp;├── config/ # Configuration files<br> &nbsp;&nbsp;&nbsp;├── controllers/ # Request handlers<br> &nbsp;&nbsp;&nbsp;├── middlewares/ # Custom middleware<br> &nbsp;&nbsp;&nbsp;├── models/ # Mongoose models<br> &nbsp;&nbsp;&nbsp;├── repositories/ # Data access layer<br> &nbsp;&nbsp;&nbsp;├── routes/ # API routes<br> &nbsp;&nbsp;&nbsp;├── services/ # Business logic<br> &nbsp;&nbsp;&nbsp;├── socket/ # WebSocket handlers<br> &nbsp;&nbsp;&nbsp;├── utils/ # Utility functions<br> &nbsp;&nbsp;&nbsp;└── validations/ # Request validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository

git clone https://github.com/yourusername/my-social-media.git cd my-social-media

2. Set up the backend

cd server npm install cp .env.example .env

Add your environment variables to .env
npm run dev

3. Set up the frontend

TBD


## 💡 What I Learned

- Implementing secure authentication with JWT access and refresh tokens
- Building a scalable API with TypeScript and Express
- Creating a responsive React frontend with modern practices
- Managing cloud-based image storage with Cloudinary
- Implementing proper error handling and validation

---

Created with ❤️ by [Nikodem Nowak](https://github.com/NikodemNowak)
