# NodeJS-Backend
# 🛠️ Asset View Product - Backend

This is the backend service for the **Asset View Product**, a full-stack application that allows users to create, manage, and monitor investment portfolios with real-time asset tracking and scheduled updates.

---

## 📦 Features

- RESTful API using **Express.js** & **Node.js**
- **MySQL** Database integration using **Sequelize ORM**
- **Redis** for caching asset prices
- **JWT-based Authentication**
- Scheduled background jobs with **node-cron**
- Real-time socket communication (with `Socket.IO`)
- Docker-ready configuration
- CORS enabled for frontend communication

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize ORM**
- **MySQL** (via Railway)
- **Redis** (via Railway)
- **Socket.IO**
- **JWT**
- **dotenv**
- **node-cron**

---

## 📁 Project Structure

```bash
.
├── controllers/         # Route handlers
├── Jobs/                # Scheduled jobs (e.g. update asset prices)
├── middleware/          # Auth and error handling
├── models/              # Sequelize models
├── routes/              # API route definitions
├── utils/               # Redis, helpers
├── config/              # Sequelize config
├── .env                 # Environment variables
├── server.js            # Main entry point
└── package.json

🧪 Running Locally
bash
Copy
Edit
# Clone the repo
git clone https://github.com/yourusername/asset-view-backend.git
cd asset-view-backend

# Install dependencies
npm install

# Create a .env file and add variables

# Run the server
npm start

🐳 Docker Support
bash
Copy
Edit
# Build image
docker build -t asset-backend .

# Run container
docker run -p 47435:47435 asset-backend
