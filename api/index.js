require('dotenv').config();
console.log('🔥 JWT_SECRET loaded in index.js:', process.env.JWT_SECRET); // 🔥 ADD THIS LINE


const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.listen(3001, () => console.log('Server running on port 3001'));
