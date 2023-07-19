const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  mobileNo: String,
  address: String,
  isEmployer: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

// Create Express app
const app = express();

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Parse request body
app.use(express.urlencoded({ extended: true }));

// Registration route
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password, mobileNo, address } = req.body;

  // Create a new user
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    mobileNo,
    address
  });

  // Save the user to the database
  user.save()
    .then(() => {
      res.send('Registration successful');
    })
    .catch(err => {
      console.error('Failed to register user', err);
      res.status(500).send('Registration failed');
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
