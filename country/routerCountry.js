import express from 'express';
import  { FirstGroupIndicators, SecondGroupIndicators, ThirdGroupIndicator } from './Schems.js';

const routerCountry = express.Router();

routerCountry.post('/api/first-group-indicators', async (req, res) => {
  const formData = req.body;
  const newIndicator = new FirstGroupIndicators(formData);

  try {
    // Перевірка наявності об'єкта в базі даних за countryCode
    const existingIndicator = await FirstGroupIndicators.findOne({ countryCode: newIndicator.countryCode });
    if (existingIndicator) {
      // Об'єкт вже існує в базі даних, повертаємо помилку 409 Conflict
      return res.sendStatus(409);
    }

    // Збереження нового об'єкта в базі даних
    await newIndicator.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

routerCountry.post('/api/second-group-indicators', async (req, res) => {
  const formData = req.body;
  const newIndicator = new SecondGroupIndicators(formData);

  try {
    // Перевірка наявності об'єкта в базі даних за countryCode
    const existingIndicator = await SecondGroupIndicators.findOne({ countryCode: newIndicator.countryCode });
    if (existingIndicator) {
      // Об'єкт вже існує в базі даних, повертаємо помилку 409 Conflict
      return res.sendStatus(409);
    }

    // Збереження нового об'єкта в базі даних
    await newIndicator.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

routerCountry.post('/api/third-group-indicators', async (req, res) => {
  const formData = req.body;
  const newIndicator = new ThirdGroupIndicator(formData);

  try {
    // Перевірка наявності об'єкта в базі даних за countryCode
    const existingIndicator = await ThirdGroupIndicator.findOne({ countryCode: newIndicator.countryCode });
    if (existingIndicator) {
      // Об'єкт вже існує в базі даних, повертаємо помилку 409 Conflict
      return res.sendStatus(409);
    }

    // Збереження нового об'єкта в базі даних
    await newIndicator.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


  
export default routerCountry;
