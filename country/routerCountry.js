import express from 'express';
import  { FirstGroupIndicators, SecondGroupIndicators, ThirdGroupIndicator } from './Schems.js';

const routerCountry = express.Router();

routerCountry.post('/api/first-group-indicators', async (req, res) => {
  const { countryCode, year, currentGDP, previousGDP, population } = req.body;

  try {
    const newFirstGroupIndicators = new FirstGroupIndicators({
      countryCode,
      year,
      currentGDP,
      previousGDP,
      population,
    });

    await newFirstGroupIndicators.save();
    res.json({ message: 'Дані успішно збережено' });
  } catch (error) {
    console.error('Помилка при збереженні даних:', error);
    res.status(500).json({ error: 'Помилка при збереженні даних' });
  }
});

routerCountry.post('/api/second-group-indicators', async (req, res) => {
  const { countryCode, budgetPercent, inflation, unemployment, debtPercent, happyLevel, qualityLife, corruption, goldReserv, averageSalary } = req.body;

  try {
    const newSecondGroupIndicators = new SecondGroupIndicators({
      countryCode,
      budgetPercent,
      inflation,
      unemployment,
      debtPercent,
      happyLevel,
      qualityLife,
      corruption,
      goldReserv,
      averageSalary
    });

    await newSecondGroupIndicators.save();
    res.json({ message: 'Дані успішно збережено' });
  } catch (error) {
    console.error('Помилка при збереженні даних:', error);
    res.status(500).json({ error: 'Помилка при збереженні даних' });
  }
});
routerCountry.post('/api/third-group-indicators', async (req, res) => {
    const formData = req.body;
    const newIndicator = new ThirdGroupIndicator(formData);
  
    try {
      await newIndicator.save();
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  
export default routerCountry;
