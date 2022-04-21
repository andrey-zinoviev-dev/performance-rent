const dotEnv = require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const { MONGODB_URI} = process.env;
const { router } = require('./routes/spaces');
mongoose.connect(MONGODB_URI);

const app = express();
const { PORT } = process.env || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  console.log('server is on port' + PORT);
});