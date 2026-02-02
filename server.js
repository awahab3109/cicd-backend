require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
