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
    const { countryCode, formData } = req.body;
    const existingIndicators = await FirstGroupIndicators.findOne({ countryCode });

    if (!existingIndicators) {
      const newIndicator = new FirstGroupIndicators({
        countryCode,
        GDPGroup: formData.GDPGroup || [],
        PopulationGroup: formData.PopulationGroup || [],
      });

      await newIndicator.save();
      res.status(201).json({ message: "Дані успішно збережено." });
    } else {
      if (formData.GDPGroup && Array.isArray(formData.GDPGroup)) {
        formData.GDPGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.GDPGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.GDPGroup.push(entry);
            }
          }
        });
      }

      if (formData.PopulationGroup && Array.isArray(formData.PopulationGroup)) {
        formData.PopulationGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.PopulationGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.PopulationGroup.push(entry);
            }
          }
        });
      }

      await existingIndicators.save();
      res.json({ message: 'Дані успішно оновлено.' });
    }
  } catch (error) {
    console.error('Помилка при оновленні індикаторів:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

routerCountryList.put('/api/second-group-edit', async (req, res) => {
  try {
    const { countryCode, formData } = req.body;
    const existingIndicators = await SecondGroupIndicators.findOne({ countryCode });

    if (!existingIndicators) {
      const newIndicator = new SecondGroupIndicators({
        countryCode,
        BudgetGroup: formData.BudgetGroup || [],
        InflationGroup: formData.InflationGroup || [],
        UnemploymentGroup: formData.UnemploymentGroup || [],
        DebtGroup: formData.DebtGroup || [],
        HappyLevelGroup: formData.HappyLevelGroup || [],
        QualityLifeGroup: formData.QualityLifeGroup || [],
        CorruptionGroup: formData.CorruptionGroup || [],
        GoldReservGroup: formData.GoldReservGroup || [],
        AverageSalaryGroup: formData.AverageSalaryGroup || [],
      });

      await newIndicator.save();
      res.status(201).json({ message: "Дані успішно збережено." });
    } else {
      if (formData.BudgetGroup && Array.isArray(formData.BudgetGroup)) {
        formData.BudgetGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.BudgetGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.BudgetGroup.push(entry);
            }
          }
        });
      }

      if (formData.InflationGroup && Array.isArray(formData.InflationGroup)) {
        formData.InflationGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.InflationGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.InflationGroup.push(entry);
            }
          }
        });
      }
      if (formData.UnemploymentGroup && Array.isArray(formData.UnemploymentGroup)) {
        formData.UnemploymentGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.UnemploymentGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.UnemploymentGroup.push(entry);
            }
          }
        });
      }
      if (formData.DebtGroup && Array.isArray(formData.DebtGroup)) {
        formData.DebtGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.DebtGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.DebtGroup.push(entry);
            }
          }
        });
      }
      if (formData.HappyLevelGroup && Array.isArray(formData.HappyLevelGroup)) {
        formData.HappyLevelGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.HappyLevelGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.HappyLevelGroup.push(entry);
            }
          }
        });
      }
      if (formData.QualityLifeGroup && Array.isArray(formData.QualityLifeGroup)) {
        formData.QualityLifeGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.QualityLifeGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.QualityLifeGroup.push(entry);
            }
          }
        });
      }
      if (formData.CorruptionGroup && Array.isArray(formData.CorruptionGroup)) {
        formData.CorruptionGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.CorruptionGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.CorruptionGroup.push(entry);
            }
          }
        });
      }
      if (formData.GoldReservGroup && Array.isArray(formData.GoldReservGroup)) {
        formData.GoldReservGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.GoldReservGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.GoldReservGroup.push(entry);
            }
          }
        });
      }
      if (formData.AverageSalaryGroup && Array.isArray(formData.AverageSalaryGroup)) {
        formData.AverageSalaryGroup.forEach((entry) => {
          if (entry.year && entry.value) {
            const existingEntry = existingIndicators.AverageSalaryGroup.find((item) => item.year === entry.year);

            if (existingEntry) {
              existingEntry.value = entry.value;
            } else {
              existingIndicators.AverageSalaryGroup.push(entry);
            }
          }
        });
      }
      await existingIndicators.save();
      res.json({ message: 'Дані успішно оновлено.' });
    }
  } catch (error) {
    console.error('Помилка при оновленні індикаторів:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

routerCountryList.put('/api/third-group-edit', async (req, res) => {
  try {
    const { countryCode, formData } = req.body;
    const existingIndicators = await ThirdGroupIndicator.findOne({ countryCode });

    if (!existingIndicators) {
      const newIndicator = new ThirdGroupIndicator({
        countryCode,
        importValue: formData.importValue || null,
        exportValue: formData.exportValue || null,
        importPartners: formData.importPartners || [],
        exportPartners: formData.exportPartners || [],
      });
      await newIndicator.save();
      res.status(201).json({ message: "Дані успішно збережено." });
    } else {
      if (formData.importValue !== undefined && formData.importValue !== '') {
        existingIndicators.importValue = formData.importValue;
      }
      if (formData.exportValue !== undefined && formData.exportValue !== '') {
        existingIndicators.exportValue = formData.exportValue;
      }
      
      if (formData.importPartners && Array.isArray(formData.importPartners)) {
        formData.importPartners.forEach(partner => {
          if (partner.name && partner.value) {
            const existingPartnerIndex = existingIndicators.importPartners.findIndex(p => p.name === partner.name);
            if (existingPartnerIndex !== -1) {
              existingIndicators.importPartners[existingPartnerIndex].value = partner.value;
            } else {
              existingIndicators.importPartners.push(partner);
            }
          }
        });
      }
      
      if (formData.exportPartners && Array.isArray(formData.exportPartners)) {
        formData.exportPartners.forEach(partner => {
          if (partner.name && partner.value) {
            const existingPartnerIndex = existingIndicators.exportPartners.findIndex(p => p.name === partner.name);
            if (existingPartnerIndex !== -1) {
              existingIndicators.exportPartners[existingPartnerIndex].value = partner.value;
            } else {
              existingIndicators.exportPartners.push(partner);
            }
          }
        });
      }
      
      await existingIndicators.save();
      res.json({ message: 'Дані успішно оновлено.' });
    }
  } catch (error) {
    console.error('Помилка при оновленні індикаторів:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});


  routerCountryList.delete('/api/delete-country/:countryCode', async (req, res) => {
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
      const thirdGroupIndicator = await ThirdGroupIndicator.findOne({ countryCode });
  
      // Знаходимо запис FirstGroupIndicators за countryCode
      const firstGroupIndicators = await FirstGroupIndicators.findOne({ countryCode });
  
      // Знаходимо запис SecondGroupIndicators за countryCode
      const secondGroupIndicators = await SecondGroupIndicators.findOne({ countryCode });
  
      let partnerList;
      let indicatorType;
  
      // Визначаємо, який модель використовувати та отримуємо відповідний партнерний список
      if (partnerType === 'export') {
        partnerList = thirdGroupIndicator.exportPartners;
        indicatorType = 'ThirdGroupIndicator';
      } else if (partnerType === 'import') {
        partnerList = thirdGroupIndicator.importPartners;
        indicatorType = 'ThirdGroupIndicator';
      } else if (partnerType === 'GDPGroup') {
        partnerList = firstGroupIndicators.GDPGroup;
        indicatorType = 'FirstGroupIndicators';
      } else if (partnerType === 'PopulationGroup') {
        partnerList = firstGroupIndicators.PopulationGroup;
        indicatorType = 'FirstGroupIndicators';
      } 
      else if (partnerType === 'BudgetGroup') {
        partnerList = secondGroupIndicators.BudgetGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'InflationGroup') {
          partnerList = secondGroupIndicators.InflationGroup;
          indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'UnemploymentGroup') {
        partnerList = secondGroupIndicators.UnemploymentGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'DebtGroup') {
        partnerList = secondGroupIndicators.DebtGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'HappyLevelGroup') {
        partnerList = secondGroupIndicators.HappyLevelGroup;
        indicatorType = 'SecondGroupIndicators';
      } 
      else if (partnerType === 'QualityLifeGroup') {
        partnerList = secondGroupIndicators.QualityLifeGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'CorruptionGroup') {
        partnerList = secondGroupIndicators.CorruptionGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'GoldReservGroup') {
        partnerList = secondGroupIndicators.GoldReservGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else if (partnerType === 'AverageSalaryGroup') {
        partnerList = secondGroupIndicators.AverageSalaryGroup;
        indicatorType = 'SecondGroupIndicators';
      }
      else {
        res.status(400).json({ error: 'Невірно вказано тип партнера' });
        return;
      }
  
      // Знаходимо індекс партнера за його partnerId
      const partnerIndex = partnerList.findIndex((partner) => partner._id == partnerId);
  
      if (partnerIndex === -1) {
        res.status(404).json({ error: 'Партнер не знайдений' });
        return;
      }
  
      // Виконуємо видалення партнера за індексом
      partnerList.splice(partnerIndex, 1);
  
      // Зберігаємо оновлені дані відповідно до типу індикатора
      if (indicatorType === 'ThirdGroupIndicator') {
        await thirdGroupIndicator.save();
      } else if (indicatorType === 'FirstGroupIndicators') {
        await firstGroupIndicators.save();
      } else if (indicatorType === 'SecondGroupIndicators') {
        await secondGroupIndicators.save();
      }
  
      res.json({ success: true, message: 'Партнера успішно видалено' });
      
    } catch (error) {
      console.error('Помилка при видаленні партнера:', error);
      res.status(500).json({ error: 'Помилка сервера' });
    }
  });
  
  
  
  
  
export default routerCountryList;