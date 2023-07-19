import express from 'express';
import mongoose from 'mongoose';
import routerUser from './register/routesUser.js';
import routerCountry from './country/routerCountry.js';
import routerCountryList from './country/routerCountryList.js';
import {PORT, MongoDB, CorsDomen} from './connecting/connect.js';
import cors from 'cors';
const app = express();
app.use(express.json());
// Підключення до бази даних MongoDB
mongoose.connect(MongoDB,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Підключено до бази даних');
  })
  .catch(error => {
    console.error('Помилка підключення до бази даних', error);
  });

app.use(cors({
  origin: CorsDomen, // Замініть на ваш домен
}))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.use(routerUser);
app.use(routerCountry);
app.use(routerCountryList);
// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});