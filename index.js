// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// express app initialization
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Import Routes
const adminRoutes = require('./routes/adminRoute');
const contactRoutes = require('./routes/contactRoute');

// application routes
app.get('/', (req, res) => {
    res.send('Hey, Welcome To Rotary API');
});
app.use('/admin', adminRoutes);
app.use('/contact', contactRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
