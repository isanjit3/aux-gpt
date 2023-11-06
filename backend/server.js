// dependencies
const express = require('express');
const app = express();

// app config
app.use(express.json());
const PORT = process.env.PORT || 3001;

// route imports
const authRoutes = require('./routes/auth/authRoutes');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('AuxGPT Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});