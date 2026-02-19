const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../.env' });

const app = express();

app.use(express.json());

app.get('/api/status', (req, res) =>
{
    res.json
    ({
        status: "OK",
        message: "Сервер Yomuhub успішно запущено",
    });
});

const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const mangaRoutes = require('./routes/manga');

app.use('/api/auth', authRoutes);
app.use('/api', mangaRoutes);

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
    authSource: 'admin'
})
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log('Database connection error:', err));

app.listen(PORT, () =>
{
    console.log(`Сервер працює на http://localhost:${PORT}`);
});