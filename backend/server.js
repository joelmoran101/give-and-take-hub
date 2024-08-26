require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const swaggerDocs = require('./utilities/swagger')

const app = express();

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
  username: String,
  password: String,
  confirmPassword: String,
  email: String,
  phone: String,
  giver: Boolean,
  searcher: Boolean
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
  const { username_or_email, loginCode } = req.body;

  try {
    const foundUser = await User.findOne({$or:[{username:username_or_email}, {email:username_or_email}]})
    console.log(foundUser)
    console.log(await loginCode)

    if(!foundUser){
      return res.status(401).send('Invalid credentials');
    }

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

// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port '+process.env.PORT);
  swaggerDocs(app, process.env.PORT)
});