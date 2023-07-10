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
routerCountry.put('/api/indicators/:countryCode/hide', async (req, res) => {
  const { countryCode } = req.params;

  try {
    // Знайти запис за countryCode
    const indicator = await FirstGroupIndicators.findOne({ countryCode });

    if (!indicator) {
      return res.status(404).json({ error: 'Indicator not found' });
    }

    // Змінити значення Visible на "Invisible"
    indicator.Visible = 'Invisible';
    await indicator.save();

    return res.json({ message: 'Indicator hidden' });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Маршрут для зміни значення Visible на "Visible"
routerCountry.put('/api/indicators/:countryCode/show', async (req, res) => {
  const { countryCode } = req.params;

  try {
    // Знайти запис за countryCode
    const indicator = await FirstGroupIndicators.findOne({ countryCode });

    if (!indicator) {
      return res.status(404).json({ error: 'Indicator not found' });
    }

    // Змінити значення Visible на "Visible"
    indicator.Visible = 'Visible';
    await indicator.save();

    return res.json({ message: 'Indicator shown' });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


  
export default routerCountry;
