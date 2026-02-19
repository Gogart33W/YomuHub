const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path'); 

// Завантажуємо конфігурацію
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Логи для перевірки 
//console.log("DEBUG: Шлях до файлу:", path.join(__dirname, '..', '.env'));
//console.log("DEBUG: MONGO_URI:", process.env.MONGO_URI ? "Зчитується ✅" : "Пусто ❌");

const app = express();
app.use(express.json());

// Перевірка статусу
app.get('/api/status', (req, res) => {
    res.json({
        status: "OK",
        message: "Сервер Yomuhub успішно запущено",
    });
});

// Підключення маршрутів 
const authRoutes = require('./routes/auth');
const mangaRoutes = require('./routes/manga');

app.use('/api/auth', authRoutes);
app.use('/api', mangaRoutes);

// ПІДКЛЮЧЕННЯ ДО БД
const mongoURI = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : "";

mongoose.connect(mongoURI, {
    family: 4, 
    serverSelectionTimeoutMS: 5000,
    directConnection: true 
})
.then(() => console.log('✅ Connected to Database!'))
.catch((err) => {
    console.log('❌ Error: Connection failed. Check your .env file!');
    console.error(err.name, ':', err.message); 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});