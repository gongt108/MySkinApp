const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const submissions = require('./routes/api/submissions');
const reviews = require('./routes/api/reviews');

const app = express();

// Connect Database
connectDB();

//cors
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/submissions', submissions);
app.use('/api/reviews', reviews);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
