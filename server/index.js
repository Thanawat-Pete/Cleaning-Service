const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const BASE_URL = process.env.BASE_URL;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.get('/', (req, res) => {
  res.send('<h1>Hello from Mern Stack Backend</h1>');
});

if (!DB_URL) {
  console.log('DB_URL is missing. Please set it in the .env file.');
} else {
    mongoose.connect(DB_URL)
    .then(async () => {
        console.log('Connected to MongoDB');
        // Create roles if not exist
        const Type = require('./Models/type.js');
        const adminRole = await Type.findOne({ name: 'admin' });
        if (!adminRole) {
            await Type.create({ name: 'admin' });
            console.log('Admin role created');
        }
        const userRole = await Type.findOne({ name: 'user' });
        if (!userRole) {
            await Type.create({ name: 'user' });
            console.log('User role created');
        }
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
}

const userRouter = require('./Routers/user.router.js');
app.use('/api/v1/user', userRouter);

const seviceRouter = require('./Routers/service.router.js');
app.use('/api/v1/services', seviceRouter);

const bookingRouter = require('./Routers/booking.router.js');
app.use('/api/v1/bookings', bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});