const app = require("./app");
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const redisClient = require('./utils/redisClient');

async function setSamplePrices() {
  for (let i = 1; i <= 20; i++) {
    const price = (Math.random() * 1000).toFixed(2);
    await redisClient.set(`asset:${i}:price`, price);
  }
}

setSamplePrices();


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // adjust for production
    methods: ['GET', 'POST']
  }
});

// Make io accessible globally (optional)
app.set('io', io);

server.listen(5000, () => {
  console.log('Server running on port 5000');
});