const User = require('../models/User');

exports.register = async(req, res) =>
{
  try
  {
      const {username, email, password} = req.body;
      const newUser = new User({username, email, password});
      await newUser.save();
      res.status(201).json({message: "Користувач успішно зареєстрований"});
  }
  catch (error)
  {
      res.status(400).json({error: "Помилка " + error.message});
  }
};