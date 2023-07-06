import express from 'express';
import User from './Schems.js';
const routerUser = express.Router();

routerUser.post('/register', (req, res) => {
  // Отримання даних з тіла запиту
  const { firstname,secondname, email, password, level, language } = req.body;

  // Перевірка, чи існує користувач з таким email
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        // Користувач з таким email вже існує
        return res.status(400).json({ error: 'Користувач з цим email вже існує' });
      }

      // Створення нового користувача
      const newUser = new User({ firstname,secondname, email, password, level, language });

      // Збереження нового користувача в базі даних
      newUser.save()
        .then(savedUser => {
          res.json({ message: 'Користувач успішно зареєстрований', user: savedUser });
        })
        .catch(error => {
          console.error('Помилка збереження користувача', error);
          res.status(500).json({ error: 'Сталась помилка на сервері' });
        });
    })
    .catch(error => {
      console.error('Помилка пошуку користувача', error);
      res.status(500).json({ error: 'Сталась помилка на сервері' });
    });
});

routerUser.get('/user', async (req, res) => {
  try {
    // Отримання всіх користувачів з бази даних
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});
routerUser.post('/login', (req, res) => {
  // Отримання даних з тіла запиту
  const { email, password } = req.body;

  // Пошук користувача за email
  User.findOne({ email })
    .then(existingUser => {
      if (!existingUser) {
        // Користувача з таким email не знайдено
        return res.status(400).json({ error: 'Невірний email або пароль' });
      }

      // Перевірка пароля
      if (existingUser.password !== password) {
        // Невірний пароль
        return res.status(400).json({ error: 'Невірний email або пароль' });
      }

      // Користувач успішно авторизований
      res.json({ message: 'Користувач успішно авторизований', user: existingUser });
    })
    .catch(error => {
      console.error('Помилка авторизації', error);
      res.status(500).json({ error: 'Сталась помилка на сервері' });
    });
});

/* Редагування профілю*/
routerUser.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { level } = req.body;

    // Оновлення рівня користувача в базі даних
    const updatedUser = await User.findByIdAndUpdate(userId, { level }, { new: true });

    res.json({ message: 'Рівень користувача оновлено', user: updatedUser });
  } catch (error) {
    console.error('Помилка оновлення рівня користувача', error);
    res.status(500).json({ error: 'Сталась помилка на сервері' });
  }
});
/* Видалення профілю*/
routerUser.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Видалення користувача з бази даних
    await User.findByIdAndRemove(userId);

    res.json({ message: 'Користувача видалено' });
  } catch (error) {
    console.error('Помилка видалення користувача', error);
    res.status(500).json({ error: 'Сталась помилка на сервері' });
  }
});


export default routerUser;