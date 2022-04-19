const dotEnv = require('dotenv').config();
const express = require('express');

const app = express();
const { PORT } = process.env || 3000;

app.listen(PORT, () => {
  console.log('server is on port' + PORT);
});