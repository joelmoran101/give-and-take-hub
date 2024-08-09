require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')

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
app.post('/register', async (req, res) => {
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



// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port '+process.env.PORT);
});