const app = require("./app");
const port = process.env.PORT || 3001;

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
    origin: 'https://stock-portfolio-frontend-zxb0.onrender.com/',
    methods: ['GET', 'POST']
  }
});

app.set('io', io);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})