const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.cjs');
const portfolioRoutes = require('./routes/portfolio.routes.cjs');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount routes with proper '/api' prefixes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
