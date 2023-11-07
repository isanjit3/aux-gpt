require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");

// app config
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

// route imports
const authRoutes = require('./routes/auth/authRoutes');
app.use('/auth', authRoutes);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
