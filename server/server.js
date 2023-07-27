require('dotenv').config();
const express = require('express');
const db = require('./db/index');
const app = express();
const port = process.env.PORT || 3005;

// middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
}); 