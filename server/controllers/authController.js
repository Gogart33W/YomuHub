const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Хешуємо пароль перед збереженням у базу
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword // зберігаємо вже зашифрований пароль
        });

        await newUser.save();
        res.status(201).json({ message: "Користувач успішно зареєстрований" });
    } catch (error) {
        res.status(400).json({ error: "Помилка " + error.message });
    }
};