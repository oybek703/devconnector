const express = require('express');
const path = require('path');
const connectToDatabase  = require('./config/database');
const app = express();

app.use(express.json());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'clint', 'build', 'index.html'));
    });
}

const PORT = process.env.NODE_ENV || 5000;
connectToDatabase().then(() => console.log('Connected to MongoDB...'));
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}...`)});