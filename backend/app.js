const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./models/routes/authRoutes');
const ownerRoutes = require('./models/routes/ownerRoutes');
const landHoldingRoutes = require('./models/routes/landHoldingRoutes');
const fileRoutes = require('./models/routes/fileRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/landholdings', landHoldingRoutes);
app.use('/api/files', fileRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
