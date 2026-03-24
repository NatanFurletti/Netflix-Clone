require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsConfig = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/profiles');
const contentRoutes = require('./routes/content');
const genreRoutes = require('./routes/genres');

const app = express();

app.use(cors(corsConfig));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/genres', genreRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Tratamento de erros global
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
