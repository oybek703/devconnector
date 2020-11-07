const express = require('express');
const connectToDatabase  = require('./config/database');
const app = express();

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.NODE_ENV || 5000;
connectToDatabase().then(() => console.log('Connected to MongoDB...'));
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)});