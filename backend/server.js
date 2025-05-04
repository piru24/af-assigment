const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const  cookieParser =require('cookie-parser') ;


dotenv.config();
const app = express();

app.use(cookieParser()); 
const corsOptions = {
  origin: ' http://localhost:5173/',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
