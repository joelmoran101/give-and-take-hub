require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const swaggerDocs = require('./utilities/swagger')
const nodemailer = require('nodemailer')
// additional features to minimize risks of cyber attacks
// import express-rate-limit
const rateLimit = require('express-rate-limit')
// import helmet
const helmet = require('helmet')

const app = express();

// SECURITY
    // make use of express-rate-limit
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10 // limit each IP to 10 requests per window
    });    
  app.use(limiter);
  
      // make use of helmet
  app.use(helmet())

app.use(express.json());
app.use(cors())

// Connect to MongoDB

try {
  mongoose.connect(process.env.MONGO_DB)
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

    console.log(req.body)

    try {

        const foundUser = await User.findOne({$or:[{username}, {email}]})

        if(foundUser){
            return res.status(400).send('user already exist')
        }
        const newUser = new User({ username, firstname, lastname, email, phone })
        await newUser.save();
        res.status(201).send('user created successfully')

    }catch(err){
        console.log(err)
        res.status(500).send('something went wrong')
    }

})

app.post('/api/login', async (req, res) => {
  const { username_or_email } = req.body;

  try {
    const foundUser = await User.findOne({$or:[{username:username_or_email}, {email:username_or_email}]})
    console.log(foundUser)
    console.log(await loginCode)

    if(!foundUser){
      return res.status(401).send('Invalid credentials');
    }
    // uuid to create a random code
    // code should be sent to user's email; copy paste back to the login page

    const isValidLoginCode = await bcrypt.compare(loginCode, foundUser.loginCode);
    if (!isValidLoginCode) {
      return res.status(401).send('Invalid username or loginCode');
    }
    // If the username and password are valid, generate a JWT token
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

app.post('/api/request-password', async (req, res) => {
  const { username_or_email } = req.body;
  // simulating always a good response
  res.json({ success: true });
})



// Send the code to the user's email

 // Store the code in a session or database for later verification
  // ...
  
app.post('/send-email', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: '',
      pass: '',
    },
  });

  const mailOptions = {
    from: '',
    to: '',
    subject: 'Test email',
    text: 'Hello from server-side!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent!');
  });
});




// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port '+process.env.PORT);
  swaggerDocs(app, process.env.PORT)
});
