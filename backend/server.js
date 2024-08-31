// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const swaggerDocs = require('./utilities/swagger');
const { sendEmail } = require('./utilities/mailer');
const generateOTP = require('./utilities/otp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();

// SECURITY
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 requests per window
});
app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(cors());

// Connect to MongoDB
try {
    mongoose.connect(process.env.MONGO_DB);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Error connecting to MongoDB:', err);
}

// Define a model
const User = mongoose.model('User', {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    phone: String,
});

// Define a route
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/api/register', async (req, res) => {
    const { firstname, lastname, username, email, phone } = req.body;
    console.log(req.body);

    try {
        const foundUser = await User.findOne({ $or: [{ username }, { email }] });

        if (foundUser) {
            return res.status(400).send('user already exist');
        }

        const newUser = new User({ username, firstname, lastname, email, phone });
        await newUser.save();
        res.status(201).send('user created successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('something went wrong');
    }
});

app.post('/api/login', async (req, res) => {
    const { username_or_email } = req.body;
    try {
        const foundUser = await User.findOne({ $or: [{ username: username_or_email }, { email: username_or_email }] });
        console.log(foundUser);
        
        if (!foundUser) {
            return res.status(401).send('Invalid credentials');
        }

        const loginCode = generateOTP(); // Generate OTP
        foundUser.loginCode = await bcrypt.hash(loginCode, 10); // Hash and save OTP to user for later validation
        await foundUser.save();

        await sendEmail(foundUser.email, 'Your One-Time Password (OTP)', `Your OTP is: ${loginCode}`);

        res.json({ success: true, message: 'OTP sent to your email' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

app.post('/api/request-password', async (req, res) => {
    const { username_or_email } = req.body;
    res.json({ success: true });
});

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    await sendEmail(to, subject, text);
    res.send('Email sent!');
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
    swaggerDocs(app, process.env.PORT);
});