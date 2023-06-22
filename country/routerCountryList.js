import express from "express";
import  { FirstGroupIndicators, SecondGroupIndicators, ThirdGroupIndicator } from './Schems.js';
const routerCountryList = express.Router();

routerCountryList.get('/api/first-group-get', async (req , res) =>{
    try{
        const firstGroupGet = await FirstGroupIndicators.find();
        res.json(firstGroupGet)
    }catch(error){
        console.error('Error retrieving users', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
})
routerCountryList.get('/api/second-group-get', async (req , res) =>{
    try{
        const secondGroupGet = await SecondGroupIndicators.find();
        res.json(secondGroupGet)
    }catch(error){
        console.error('Error retrieving users', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
})
routerCountryList.get('/api/third-group-get', async (req , res) =>{
    try{
        const thirdGroupGet = await ThirdGroupIndicator.find();
        res.json(thirdGroupGet)
    }catch(error){
        console.error('Error retrieving users', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
})

routerCountryList.put('/api/first-group-edit', async (req, res) => {
    try {
      const { countryCode, year, currentGDP, previousGDP, population } = req.body;
  
      // Знайдіть запис індикаторів першої групи за countryCode
      const indicator = await FirstGroupIndicators.findOne({ countryCode });
  
      if (!indicator) {
        return res.status(404).json({ error: 'Індикатор не знайдено' });
      }
  
      // Оновлення полів індикатора, які були передані в запиті
      if (year) {
        indicator.year = year;
      }
      if (currentGDP) {
        indicator.currentGDP = currentGDP;
      }
      if (previousGDP) {
        indicator.previousGDP = previousGDP;
      }
      if (population) {
        indicator.population = population;
      }
  
      // Збереження оновленого запису індикатора
      const updatedIndicator = await indicator.save();
  
      // Повернення оновленого запису як відповідь
      res.json(updatedIndicator);
    } catch (error) {
      console.error('Помилка при оновленні індикаторів:', error);
      res.status(500).json({ error: 'Помилка сервера' });
    }
  });

  routerCountryList.put('/api/second-group-edit', async (req, res) => {
    const { countryCode, ...formData } = req.body;
  
    try {
      const updatedCountry = await SecondGroupIndicators.findOneAndUpdate(
        { countryCode },
        { $set: formData },
        { new: true, upsert: true } // Додано опцію upsert: true
      );
  
      console.log('Дані успішно оновлено:', updatedCountry);
      res.json({ success: true });
    } catch (error) {
      console.error('Помилка при оновленні даних:', error);
      res.status(500).json({ error: 'Помилка при оновленні даних' });
    }
  });
  routerCountryList.put('/api/third-group-edit', async (req, res) => {
    try {
      const { countryCode, importValue, exportValue, exportPartners, importPartners } = req.body;
  
      // Перевірка, чи існує запис з вказаним countryCode
      const existingIndicator = await ThirdGroupIndicator.findOne({ countryCode });
  
      if (!existingIndicator) {
        // Якщо запис не існує, створити новий
        const newIndicator = new ThirdGroupIndicator({
          countryCode,
          importValue,
          exportValue,
          exportPartners,
          importPartners,
        });
  
        await newIndicator.save();
        res.status(201).json({ message: 'Дані успішно збережено.' });
      } else {
        // Оновити поля, використовуючи вхідні дані
        existingIndicator.importValue = importValue !== undefined ? importValue : existingIndicator.importValue;
        existingIndicator.exportValue = exportValue !== undefined ? exportValue : existingIndicator.exportValue;
  
        // Додати нових партнерів до списку
        if (exportPartners && Array.isArray(exportPartners)) {
          existingIndicator.exportPartners.push(...exportPartners);
        }
        if (importPartners && Array.isArray(importPartners)) {
          existingIndicator.importPartners.push(...importPartners);
        }
  
        await existingIndicator.save();
        res.json({ message: 'Дані успішно оновлено.' });
      }
    } catch (error) {
      console.error('Помилка при обробці запиту:', error);
      res.status(500).json({ message: 'Помилка сервера. Будь ласка, спробуйте пізніше.' });
    }
  });
  routerCountryList.delete('/api/countries/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode;
  
    try {
      // Виконуємо видалення для кожної групи показників
  
      // Перша група показників
      await FirstGroupIndicators.deleteMany({ countryCode });
  
      // Друга група показників
      await SecondGroupIndicators.deleteMany({ countryCode });
  
      // Третя група показників
      await ThirdGroupIndicator.deleteMany({ countryCode });
  
      return res.status(200).json({ message: 'Країна та її показники успішно видалені' });
    } catch (error) {
      console.error('Помилка при видаленні країни та її показників:', error);
      return res.status(500).json({ error: 'Помилка сервера' });
    }
  });
  routerCountryList.delete('/api/delete-partner/:countryCode', async (req, res) => {
    const { partnerId, partnerType, countryCode } = req.body;
  
    try {
      // Знаходимо запис ThirdGroupIndicator за countryCode
      const indicator = await ThirdGroupIndicator.findOne({ countryCode });
  
      if (!indicator) {
        res.status(404).json({ error: 'Запис не знайдено' });
        return;
      }
  
      // Визначаємо, чи видаляти партнера з експорту чи імпорту
      let partnerList;
      if (partnerType === 'export') {
        partnerList = indicator.exportPartners;
      } else if (partnerType === 'import') {
        partnerList = indicator.importPartners;
      } else {
        res.status(400).json({ error: 'Невірно вказано тип партнера' });
        return;
      }
  
      // Знаходимо індекс партнера за його partnerId
      const partnerIndex = partnerList.findIndex((partner) => partner._id == partnerId);
      console.log(partnerIndex)
      if (partnerIndex === -1) {
        res.status(404).json({ error: 'Партнер не знайдений' });
        return;
      }
  
      // Виконуємо видалення партнера за індексом
      partnerList.splice(partnerIndex, 1);
  
      // Зберігаємо оновлений запис
      await indicator.save();
  
      res.json({ success: true, message: 'Партнера успішно видалено' });
    } catch (error) {
      console.error('Помилка при видаленні партнера:', error);
      res.status(500).json({ error: 'Помилка сервера' });
    }
  });

  
  
  
  
export default routerCountryList;