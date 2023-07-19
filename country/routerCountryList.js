import express from "express";
import  {FirstGroupIndicators} from './Schems.js';
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

routerCountryList.delete('/api/delete-country/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode;
  
    try {
      // Виконуємо видалення для кожної групи показників
  
      // Перша група показників
      await FirstGroupIndicators.deleteMany({ countryCode });
      return res.status(200).json({ message: 'Країна та її показники успішно видалені' });
    } catch (error) {
      console.error('Помилка при видаленні країни та її показників:', error);
      return res.status(500).json({ error: 'Помилка сервера' });
    }
});

routerCountryList.put('/api/first-group-indicators/:countryCode', (req, res) => {
    const { countryCode } = req.params;
  
    // Отримання старих даних з бази даних
    FirstGroupIndicators.findOne({ countryCode })
      .then(oldData => {
        // Оновлення груп, які мають бути додані
        const newData = {
          Economic: {
            GDPGroup: oldData.Economic.GDPGroup.concat(req.body.Economic.GDPGroup || []),
            InflationGroup: oldData.Economic.InflationGroup.concat(req.body.Economic.InflationGroup || []),
            BudgetGroup: oldData.Economic.BudgetGroup.concat(req.body.Economic.BudgetGroup || []),
            DebtGroup: oldData.Economic.DebtGroup.concat(req.body.Economic.DebtGroup || []),
            UnemploymentGroup: oldData.Economic.UnemploymentGroup.concat(req.body.Economic.UnemploymentGroup || []),
            PopulationGroup: oldData.Economic.PopulationGroup.concat(req.body.Economic.PopulationGroup || []),
            importValue: req.body.Economic.importValue || oldData.Economic.importValue,
            exportValue: req.body.Economic.exportValue || oldData.Economic.exportValue,
            exportPartners: oldData.Economic.exportPartners.concat(req.body.Economic.exportPartners || []),
            importPartners: oldData.Economic.importPartners.concat(req.body.Economic.importPartners || []),
          },
        };
  
        // Оновлення даних в базі даних
        FirstGroupIndicators.findOneAndUpdate({ countryCode }, newData, { new: true })
          .then(updatedData => {
            res.json(updatedData);
          })
          .catch(error => {
            console.error('Failed to update data', error);
            res.status(500).json({ error: 'Failed to update data' });
          });
      })
      .catch(error => {
        console.error('Failed to fetch old data', error);
        res.status(500).json({ error: 'Failed to fetch old data' });
      });
});
routerCountryList.put('/api/second-group-indicators/:countryCode', (req, res) => {
    const { countryCode } = req.params;
  
    // Отримання старих даних з бази даних
    FirstGroupIndicators.findOne({ countryCode })
      .then(oldData => {
        // Оновлення груп, які мають бути додані
        const newData = {
          Social: {
            AverageSalary: req.body.Social.AverageSalary || oldData.Social.AverageSalary,
            AverageWorkingHours: req.body.Social.AverageWorkingHours || oldData.Social.AverageWorkingHours,
            HappyLevelGroup: req.body.Social.HappyLevelGroup || oldData.Social.HappyLevelGroup,
            QualityLifeGroup: req.body.Social.QualityLifeGroup || oldData.Social.QualityLifeGroup,
            LiteracyLevel: req.body.Social.LiteracyLevel || oldData.Social.LiteracyLevel,
            AverageLifeExpectancy: req.body.Social.AverageLifeExpectancy || oldData.Social.AverageLifeExpectancy,
            PercentageOfPopulationPoverty: req.body.Social.PercentageOfPopulationPoverty || oldData.Social.PercentageOfPopulationPoverty,
            InfantMortalityRate: req.body.Social.InfantMortalityRate || oldData.Social.InfantMortalityRate,
            SocialInequality: req.body.Social.SocialInequality || oldData.Social.SocialInequality,
          },
        };
  
        // Оновлення даних в базі даних
        FirstGroupIndicators.findOneAndUpdate({ countryCode }, newData, { new: true })
          .then(updatedData => {
            res.json(updatedData);
          })
          .catch(error => {
            console.error('Failed to update data', error);
            res.status(500).json({ error: 'Failed to update data' });
          });
      })
      .catch(error => {
        console.error('Failed to fetch old data', error);
        res.status(500).json({ error: 'Failed to fetch old data' });
      });
});
routerCountryList.put('/api/third-group-indicators/:countryCode', (req, res) => {
  const { countryCode } = req.params;

  // Отримання старих даних з бази даних
  FirstGroupIndicators.findOne({ countryCode })
    .then(oldData => {
      // Оновлення груп, які мають бути додані
      const newData = {
        Politic: {
          FormOfGovernment: req.body.Politic.FormOfGovernment || oldData.Politic.FormOfGovernment,
          CorruptionGroup: req.body.Politic.CorruptionGroup || oldData.Politic.CorruptionGroup,
          GoldReservGroup: req.body.Politic.GoldReservGroup || oldData.Politic.GoldReservGroup,
          DemocracyIndex: req.body.Politic.DemocracyIndex || oldData.Politic.DemocracyIndex,
          LevelOfPressFreedom: req.body.Politic.LevelOfPressFreedom || oldData.Politic.LevelOfPressFreedom,
          InternationalAgreements: oldData.Politic.InternationalAgreements.concat(req.body.Politic.InternationalAgreements || []),
        },
      };

      // Оновлення даних в базі даних
      FirstGroupIndicators.findOneAndUpdate({ countryCode }, newData, { new: true })
        .then(updatedData => {
          res.json(updatedData);
        })
        .catch(error => {
          console.error('Failed to update data', error);
          res.status(500).json({ error: 'Failed to update data' });
        });
    })
    .catch(error => {
      console.error('Failed to fetch old data', error);
      res.status(500).json({ error: 'Failed to fetch old data' });
    });
});
routerCountryList.put('/api/region-group-indicators/:countryCode', async (req, res) => {
  const countryCode = req.params.countryCode;
  try {
    // Знаходимо наявні дані за кодом країни
    const existingData = await FirstGroupIndicators.findOne({ countryCode });

    if (existingData) {
      if (Array.isArray(req.body)) {
        // Оновлюємо дані для кожного регіону, якщо вони попали в запит
        req.body.forEach((regionData) => {
          if (Array.isArray(regionData) && regionData.length > 0) {
            regionData.forEach((data) => {
              
              if (
                data.regionName &&
                data.gdp !== undefined &&
                data.gdp !== null &&
                data.gdp !== '' &&
                data.population !== undefined &&
                data.population !== null && 
                data.population !== ''
              ) {
                
                const existingRegion = existingData.Region.find((region) => region.regionName === data.regionName);
                
                if (existingRegion) {
                  // Регіон вже існує, оновлюємо дані
                  console.log(existingRegion , "exist")
                  existingRegion.gdp = data.gdp !== '' ? parseFloat(data.gdp) : null;
                  existingRegion.population = data.population !== '' ? parseFloat(data.population) : null;
                } else {
                  // Регіон новий, додаємо його до списку
                  existingData.Region.push({
                    regionName: data.regionName,
                    gdp: data.gdp !== '' ? parseFloat(data.gdp) : null,
                    population: data.population !== '' ? parseFloat(data.population) : null,
                  });
                }
              }
            });
          }
        });

        await existingData.save();
      }
    }

    res.status(200).json({ message: 'Дані успішно оновлено' });
  } catch (error) {
    console.error('Помилка під час оновлення даних:', error);
    res.status(500).json({ error: 'Помилка під час оновлення даних' });
  }
});
routerCountryList.delete('/api/delete-object/:countryCode/:id', async (req, res) => {
  const countryCode = req.params.countryCode;
  const id = req.params.id;

  try {
    const existingData = await FirstGroupIndicators.findOne({ countryCode });

    if (existingData) {
      // Видалення значень з об'єктів
      let isDeleted = false;

      // GDPGroup
      existingData.Economic.GDPGroup.forEach((gdpGroup, index) => {
        if (String(gdpGroup._id) === id) {
          existingData.Economic.GDPGroup.splice(index, 1);
          isDeleted = true;
        }
      });

      // InflationGroup
      existingData.Economic.InflationGroup.forEach((inflationGroup, index) => {
        if (String(inflationGroup._id) === id) {
          existingData.Economic.InflationGroup.splice(index, 1);
          isDeleted = true;
        }
      });

      // BudgetGroup
      existingData.Economic.BudgetGroup.forEach((budgetGroup, index) => {
        if (String(budgetGroup._id) === id) {
          existingData.Economic.BudgetGroup.splice(index, 1);
          isDeleted = true;
        }
      });

      // DebtGroup
      existingData.Economic.DebtGroup.forEach((debtGroup, index) => {
        if (String(debtGroup._id) === id) {
          existingData.Economic.DebtGroup.splice(index, 1);
          isDeleted = true;
        }
      });

      // UnemploymentGroup
      existingData.Economic.UnemploymentGroup.forEach((unemploymentGroup, index) => {
        if (String(unemploymentGroup._id) === id) {
          existingData.Economic.UnemploymentGroup.splice(index, 1);
          isDeleted = true;
        }
      });

      // PopulationGroup
      existingData.Economic.PopulationGroup.forEach((populationGroup, index) => {
        if (String(populationGroup._id) === id) {
          existingData.Economic.PopulationGroup.splice(index, 1);
          isDeleted = true;
        }
      });

      // exportPartners
      existingData.Economic.exportPartners.forEach((exportPartner, index) => {
        if (String(exportPartner._id) === id) {
          existingData.Economic.exportPartners.splice(index, 1);
          isDeleted = true;
        }
      });

      // importPartners
      existingData.Economic.importPartners.forEach((importPartner, index) => {
        if (String(importPartner._id) === id) {
          existingData.Economic.importPartners.splice(index, 1);
          isDeleted = true;
        }
      });

      // InternationalAgreements
      existingData.Politic.InternationalAgreements.forEach((internationalAgreement, index) => {
        if (String(internationalAgreement._id) === id) {
          existingData.Politic.InternationalAgreements.splice(index, 1);
          isDeleted = true;
        }
      });

      if (isDeleted) {
        await existingData.save();
        res.status(200).json({ message: 'Об\'єкт успішно видалено' });
      } else {
        res.status(404).json({ error: 'Елемент не знайдено' });
      }
    } else {
      res.status(404).json({ error: 'Об\'єкт не знайдено' });
    }
  } catch (error) {
    console.error('Помилка під час видалення об\'єкта:', error);
    res.status(500).json({ error: 'Помилка під час видалення об\'єкта' });
  }
});




















export default routerCountryList;