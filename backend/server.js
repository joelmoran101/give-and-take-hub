require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
// const jwt = require('jsonwebtoken');

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
  name: String,
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
    const { username, password, confirmPassword, email, phone, giver, searcher } = req.body;
    try {

        const foundUser = await User.findOne({$or:[{username}, {email}]})

        if(foundUser){
            return res.status(400).send('user already exist')
        }
        const newUser = new User({ username, password, confirmPassword, email, phone, giver, searcher })
        await newUser.save();
        res.status(201).send('user created successfully')

    }catch(err){
        console.log(err)
        res.status(500).send('something went wrong')
    }

})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).send('Invalid username or password');
    }
    // If the username and password are valid, generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
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
});