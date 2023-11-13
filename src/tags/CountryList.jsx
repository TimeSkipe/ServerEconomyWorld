import React, {useEffect, useState} from "react";
import '../styles/CountryList.css'
import { PORT } from "../connect/connect";
import languages from "../language/language.js"
import axios from "axios";
import HandleContinentsKeep from "../function/handleContinentsKepp";
import {handleToggleHidden, handleToggleVisible} from '../function/toggleVisible.js'
import Region from "../function/region";
import svg from "../img/svg";
const CountryList = (props) =>{
    const [firstgroupGet, setFirstGroupGet] = useState([]);
    useEffect(() => {
        const firstGet = async () =>{
            try {
                const response = await fetch(`${PORT}/api/first-group-get`);
                const data = await response.json();
                setFirstGroupGet(data);
            } catch (error) {
                console.log('Error', error)
            }
        }
        firstGet();
    },[])
    const handleCreateCountry = (event)=>{
      event.preventDefault();
          if(!countryCode){
            console.log("Erorr")
          }
          try {
            const formData = {
              countryCode,
              Visible:'Invisible',
              Continent:HandleContinentsKeep(countryCode),
              Region:Region(countryCode),
              Economic:{},
              Social:{
                AverageSalary:'',
                AverageWorkingHours:"",
                HappyLevelGroup:"",
                QualityLifeGroup:"",
                LiteracyLevel:"",
                AverageLifeExpectancy:"",
                PercentageOfPopulationPoverty:"",
                InfantMortalityRate:"",
                SocialInequality:""
              },
              Politic:{
                FormOfGovernment:"",
                CorruptionGroup:"",
                GoldReservGroup:"",
                DemocracyIndex:"",
                LevelOfPressFreedom:"",
              }
            };
            // Відправити форму на сервер
            axios
              .post(`${PORT}/api/first-group-indicators`, formData)
              .then((response) => {
                // Обробка успішної відповіді
                console.log(response.data);
              })
              .catch((error) => {
                // Обробка помилки
                console.error(error);
              });
        
            // Очистити поля форми
            
            window.location.reload()
            setCountryCode('');
          } catch (error) {
            console.log(error)
          }
      }
    const handleToggleHiddenBar = (index) => {
      setFirstGroupGet(prevState => {
        const updatedList = prevState.map((firstGroup, i) => {
          if (i === index) {
            return { ...firstGroup, showHiddenBar: !firstGroup.showHiddenBar };
          }
          return firstGroup;
        });
        return updatedList;
      });
    };
    const handleDeleteCountry = async (countryCode) => {
      const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цю країну?');
      if(confirmDelete){
        try {
          const response = await fetch(
            `${PORT}/api/delete-country/${countryCode}`,
            {
              method: "DELETE",
            }
          );
            
          if (response.ok) {
            // Видалити країну зі списку після успішного видалення з бази даних
            setFirstGroupGet((prevList) =>
              prevList.filter((country) => country.countryCode !== countryCode)
            );
          } else {
            console.error("Помилка при видаленні країни");
          }
        } catch (error) {
          console.error("Помилка при видаленні країни:", error);
        }
      }
      
    };
    const [activeIndex, setActiveIndex] = useState(null);
    const ScInputOpen = (index) => {
      setActiveIndex(index)
    };
    const[countryCode, setCountryCode] = useState('')
    const handleCreateCountryCode = (e) =>{
      setCountryCode(e.target.value)
    }
    const handleSendEconomic = (event, countryCode) =>{
      event.preventDefault();
      const ValueGDP = event.target.elements.ValueGDP.value;
      const YearGDP = event.target.elements.yearGDP.value;
      const InflationValue = event.target.elements.InflationValue.value;
      const InflationYear = event.target.elements.Inflationyear.value;
      const BudgetValue = event.target.elements.BudgetValue.value;
      const BudgetYear = event.target.elements.Budgetyear.value;
      const DebtValue = event.target.elements.DebtValue.value;
      const DebtYear = event.target.elements.Debtyear.value;
      const UnemploymentValue = event.target.elements.UnemploymentValue.value;
      const UnemploymentYear = event.target.elements.Unemploymentyear.value;
      const PopulationValue = event.target.elements.UnemploymentValue.value;
      const PopulationYear = event.target.elements.Unemploymentyear.value;
      const ImportValue = event.target.elements.importValue.value;
      const ExportValue = event.target.elements.exportValue.value;
      const ExportParName = event.target.elements.ExportParName.value;
      const ExportParValue = event.target.elements.ExportParValue.value;
      const ImportParName = event.target.elements.ImportParName.value;
      const ImportParValue = event.target.elements.ImportParValue.value;
      const data = {
        Economic: {
          GDPGroup: ValueGDP && YearGDP ? [{ year: YearGDP, value: ValueGDP }] : [],
          InflationGroup: InflationValue && InflationYear ? [{ year: InflationYear, value: InflationValue }] : [],
          BudgetGroup: BudgetValue && BudgetYear ? [{ year: BudgetYear, value: BudgetValue }] : [],
          DebtGroup: DebtValue && DebtYear ? [{ year: DebtYear, value: DebtValue }] : [],
          UnemploymentGroup: UnemploymentValue && UnemploymentYear ? [{ year: UnemploymentYear, value: UnemploymentValue }] : [],
          PopulationGroup: PopulationValue && PopulationYear ? [{ year: PopulationYear, value: PopulationValue }] : [],
          importValue: ImportValue ? ImportValue : null,
          exportValue: ExportValue ? ExportValue : null,
          exportPartners: ExportParName && ExportParValue ? [{ name: ExportParName, value: ExportParValue }] : [],
          importPartners: ImportParName && ImportParValue ? [{ name: ImportParName, value: ImportParValue }] : [],
        },
      };
      axios.put(`${PORT}/api/first-group-indicators/${countryCode}`, data)
        .then(response => {
          // Обробка успішної відповіді
          console.log(response.data);
        })
        .catch(error => {
          // Обробка помилки
          console.error(error);
        });

      // Очистити поля форми
      event.target.reset();
    }
    const handleSendSocial = (event, countryCode) =>{
      event.preventDefault();
      const AverageSalary = event.target.elements.AverageSalary.value;
      const AverageWorkingHours = event.target.elements.AverageWorkingHours.value;
      const HappyLevelGroup = event.target.elements.HappyLevelGroup.value;
      const QualityLifeGroup = event.target.elements.QualityLifeGroup.value;
      const LiteracyLevel = event.target.elements.LiteracyLevel.value;
      const AverageLifeExpectancy = event.target.elements.AverageLifeExpectancy.value;
      const PercentageOfPopulationPoverty = event.target.elements.PercentageOfPopulationPoverty.value;
      const InfantMortalityRate = event.target.elements.InfantMortalityRate.value;
      const SocialInequality = event.target.elements.SocialInequality.value;

      const data = {
        Social :{
          AverageSalary: AverageSalary ? AverageSalary : null,
          AverageWorkingHours: AverageWorkingHours ? AverageWorkingHours : null,
          HappyLevelGroup: HappyLevelGroup ? HappyLevelGroup : null,
          QualityLifeGroup: QualityLifeGroup ? QualityLifeGroup : null,
          LiteracyLevel: LiteracyLevel ? LiteracyLevel : null,
          AverageLifeExpectancy: AverageLifeExpectancy ? AverageLifeExpectancy : null,
          PercentageOfPopulationPoverty: PercentageOfPopulationPoverty ? PercentageOfPopulationPoverty : null,
          InfantMortalityRate: InfantMortalityRate ? InfantMortalityRate : null,
          SocialInequality: SocialInequality ? SocialInequality : null,
        }
      }
      axios.put(`${PORT}/api/second-group-indicators/${countryCode}`, data)
        .then(response => {
          // Обробка успішної відповіді
          console.log(response.data);
        })
        .catch(error => {
          // Обробка помилки
          console.error(error);
        });

      // Очистити поля форми
      event.target.reset();
    }
    const handleSendPolitic = (event, countryCode) =>{
      event.preventDefault();
      const FormOfGovernment = event.target.elements.FormOfGovernment.value;
      const CorruptionGroup = event.target.elements.CorruptionGroup.value;
      const GoldReservGroup = event.target.elements.GoldReservGroup.value;
      const DemocracyIndex = event.target.elements.DemocracyIndex.value;
      const LevelOfPressFreedom = event.target.elements.LevelOfPressFreedom.value;
      const InternationalAgreements = event.target.elements.InternationalAgreements.value;

      const data = {
        Politic :{
          FormOfGovernment: FormOfGovernment ? FormOfGovernment : null,
          CorruptionGroup: CorruptionGroup ? CorruptionGroup : null,
          GoldReservGroup: GoldReservGroup ? GoldReservGroup : null,
          DemocracyIndex: DemocracyIndex ? DemocracyIndex : null,
          LevelOfPressFreedom: LevelOfPressFreedom ? LevelOfPressFreedom : null,
          InternationalAgreements: InternationalAgreements && InternationalAgreements ? [{ organizacionName: InternationalAgreements}] : [],
        }
      }
      axios.put(`${PORT}/api/third-group-indicators/${countryCode}`, data)
        .then(response => {
          // Обробка успішної відповіді
          console.log(response.data);
        })
        .catch(error => {
          // Обробка помилки
          console.error(error);
        });

      // Очистити поля форми
      event.target.reset();
    }
    
    const handleSendRegion = async (event, countryCode) => {
      event.preventDefault();
    
      const formData = new FormData(event.target);
    
      const regionData = firstgroupGet
  .filter((firstGroup) => firstGroup.countryCode === countryCode)
  .map((firstGroup) => firstGroup.Region.map((region, indexReg) => {
    const gdpKey = `gdp_${indexReg}`;
    const populationKey = `population_${indexReg}`;

    const gdpValue = formData.get(gdpKey);
    const populationValue = formData.get(populationKey);

    return {
      regionName: region.regionName,
      gdp: gdpValue,
      population: populationValue,
    };
  }));

      try {
        const response = await fetch(`${PORT}/api/region-group-indicators/${countryCode}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(regionData),
        });
    
        if (response.ok) {
          console.log('Дані успішно відправлено на сервер');
        } else {
          console.error('Помилка під час відправлення даних на сервер');
        }
      } catch (error) {
        console.error('Помилка під час виконання запиту:', error);
      }
    
      event.target.reset();
    };
    const handleDeleteGdp = async (countryCode, index) => {
      
      try {
        await axios.delete(`${PORT}/api/delete-object/${countryCode}/${index}`); // Замініть шлях на свій API маршрут для видалення об'єкта
        
      } catch (error) {
        console.error('Помилка під час видалення об\'єкта:', error);
      }
    };
    return(
        <div className="CountryList">
          <div className="CreateCountryBlock">
            <form onSubmit={handleCreateCountry}>
              <input type="text" placeholder={props.lan ? languages[props.lan].Indicators.Countrycode : languages.English.Indicators.Countrycode} onChange={(e)=>handleCreateCountryCode(e)} value={countryCode} required/>
              <div>{props.lan ? languages[props.lan].Countries[countryCode.toUpperCase()] : languages.English.Countries[countryCode.toUpperCase()]}</div>
              <button type="submit">{props.lan ? languages[props.lan].Indicators.CreateCountry : languages.English.Indicators.CreateCountry}</button>
            </form>
          </div>
            {firstgroupGet.map((firstGroup, index) => {
                return(
                    <div className="CountryBar" key={index}>
                        <div className="CountryNumber">{index + 1}</div>
                        <div className="CountryCode">{firstGroup.countryCode}</div>
                        <div className="CountryTitle">{props.lan ? languages[props.lan].Countries[firstGroup.countryCode] : languages.English.Countries[firstGroup.countryCode]}</div>  
                        <div className="CountryButtons">
                            <div className="HiddenBut" style={{display:`${firstGroup.Visible === "Invisible" ? 'flex' : 'none'}`}}onClick={() => handleToggleVisible(firstGroup.countryCode)}>{props.lan ? languages[props.lan].Indicators.Invisible : languages.English.Indicators.Invisible}</div>
                            <div className="VisibleBut" style={{display:`${firstGroup.Visible === "Visible" ? 'flex' : 'none'}`}} onClick={() => handleToggleHidden(firstGroup.countryCode)}>{props.lan ? languages[props.lan].Indicators.Visible : languages.English.Indicators.Visible}</div>
                            <div className="Edit" onClick={() => handleToggleHiddenBar(index)}>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_135_20)">
                                <path d="M14.5329 1.81875C14.6204 1.90662 14.6696 2.02562 14.6696 2.14969C14.6696 2.27376 14.6204 2.39276 14.5329 2.48063L13.555 3.45938L11.68 1.58438L12.6579 0.605627C12.7458 0.51775 12.865 0.468384 12.9893 0.468384C13.1136 0.468384 13.2328 0.51775 13.3207 0.605627L14.5329 1.81781V1.81875ZM12.8922 4.12125L11.0172 2.24625L4.63005 8.63438C4.57845 8.68596 4.5396 8.74888 4.51661 8.81813L3.76192 11.0813C3.74823 11.1225 3.74629 11.1668 3.75631 11.2091C3.76633 11.2514 3.78791 11.29 3.81865 11.3208C3.84938 11.3515 3.88806 11.3731 3.93036 11.3831C3.97266 11.3931 4.01691 11.3912 4.05817 11.3775L6.3213 10.6228C6.39045 10.6001 6.45336 10.5616 6.50505 10.5103L12.8922 4.12125Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.9375 12.6562C0.9375 13.0292 1.08566 13.3869 1.34938 13.6506C1.6131 13.9143 1.97079 14.0625 2.34375 14.0625H12.6562C13.0292 14.0625 13.3869 13.9143 13.6506 13.6506C13.9143 13.3869 14.0625 13.0292 14.0625 12.6562V7.03125C14.0625 6.90693 14.0131 6.7877 13.9252 6.69979C13.8373 6.61189 13.7181 6.5625 13.5938 6.5625C13.4694 6.5625 13.3502 6.61189 13.2623 6.69979C13.1744 6.7877 13.125 6.90693 13.125 7.03125V12.6562C13.125 12.7806 13.0756 12.8998 12.9877 12.9877C12.8998 13.0756 12.7806 13.125 12.6562 13.125H2.34375C2.21943 13.125 2.1002 13.0756 2.01229 12.9877C1.92439 12.8998 1.875 12.7806 1.875 12.6562V2.34375C1.875 2.21943 1.92439 2.1002 2.01229 2.01229C2.1002 1.92439 2.21943 1.875 2.34375 1.875H8.4375C8.56182 1.875 8.68105 1.82561 8.76896 1.73771C8.85686 1.6498 8.90625 1.53057 8.90625 1.40625C8.90625 1.28193 8.85686 1.1627 8.76896 1.07479C8.68105 0.986886 8.56182 0.9375 8.4375 0.9375H2.34375C1.97079 0.9375 1.6131 1.08566 1.34938 1.34938C1.08566 1.6131 0.9375 1.97079 0.9375 2.34375V12.6562Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_135_20">
                                <rect width="15" height="15" fill="white"/>
                                </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="Delete" onClick={() => handleDeleteCountry(firstGroup.countryCode)}>
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15625 5.15625C5.28057 5.15625 5.3998 5.20564 5.48771 5.29354C5.57561 5.38145 5.625 5.50068 5.625 5.625V11.25C5.625 11.3743 5.57561 11.4935 5.48771 11.5815C5.3998 11.6694 5.28057 11.7188 5.15625 11.7188C5.03193 11.7188 4.9127 11.6694 4.82479 11.5815C4.73689 11.4935 4.6875 11.3743 4.6875 11.25V5.625C4.6875 5.50068 4.73689 5.38145 4.82479 5.29354C4.9127 5.20564 5.03193 5.15625 5.15625 5.15625ZM7.5 5.15625C7.62432 5.15625 7.74355 5.20564 7.83146 5.29354C7.91936 5.38145 7.96875 5.50068 7.96875 5.625V11.25C7.96875 11.3743 7.91936 11.4935 7.83146 11.5815C7.74355 11.6694 7.62432 11.7188 7.5 11.7188C7.37568 11.7188 7.25645 11.6694 7.16854 11.5815C7.08064 11.4935 7.03125 11.3743 7.03125 11.25V5.625C7.03125 5.50068 7.08064 5.38145 7.16854 5.29354C7.25645 5.20564 7.37568 5.15625 7.5 5.15625ZM10.3125 5.625C10.3125 5.50068 10.2631 5.38145 10.1752 5.29354C10.0873 5.20564 9.96807 5.15625 9.84375 5.15625C9.71943 5.15625 9.6002 5.20564 9.51229 5.29354C9.42439 5.38145 9.375 5.50068 9.375 5.625V11.25C9.375 11.3743 9.42439 11.4935 9.51229 11.5815C9.6002 11.6694 9.71943 11.7188 9.84375 11.7188C9.96807 11.7188 10.0873 11.6694 10.1752 11.5815C10.2631 11.4935 10.3125 11.3743 10.3125 11.25V5.625Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5938 2.8125C13.5938 3.06114 13.495 3.2996 13.3192 3.47541C13.1433 3.65123 12.9049 3.75 12.6562 3.75H12.1875V12.1875C12.1875 12.6848 11.99 13.1617 11.6383 13.5133C11.2867 13.865 10.8098 14.0625 10.3125 14.0625H4.6875C4.19022 14.0625 3.71331 13.865 3.36167 13.5133C3.01004 13.1617 2.8125 12.6848 2.8125 12.1875V3.75H2.34375C2.09511 3.75 1.85665 3.65123 1.68084 3.47541C1.50502 3.2996 1.40625 3.06114 1.40625 2.8125V1.875C1.40625 1.62636 1.50502 1.3879 1.68084 1.21209C1.85665 1.03627 2.09511 0.9375 2.34375 0.9375H5.625C5.625 0.68886 5.72377 0.450403 5.89959 0.274587C6.0754 0.0987721 6.31386 0 6.5625 0L8.4375 0C8.68614 0 8.9246 0.0987721 9.10041 0.274587C9.27623 0.450403 9.375 0.68886 9.375 0.9375H12.6562C12.9049 0.9375 13.1433 1.03627 13.3192 1.21209C13.495 1.3879 13.5938 1.62636 13.5938 1.875V2.8125ZM3.86063 3.75L3.75 3.80531V12.1875C3.75 12.4361 3.84877 12.6746 4.02459 12.8504C4.2004 13.0262 4.43886 13.125 4.6875 13.125H10.3125C10.5611 13.125 10.7996 13.0262 10.9754 12.8504C11.1512 12.6746 11.25 12.4361 11.25 12.1875V3.80531L11.1394 3.75H3.86063ZM2.34375 2.8125V1.875H12.6562V2.8125H2.34375Z" fill="white"/>
                              </svg>
                            </div>
                        </div>
                        {firstGroup.showHiddenBar && (
                        <div className={`hiddeBar ${index === activeIndex ? 'Activait' : ''}`} key={index}>
                            <div className="TableWithInformation">
                              <div className="FirstBlockTitle">
                                <div className="Fr-TitleBl">Economic</div>
                                <div className="Fr-FrInd">
                                  <div>GDP</div>
                                  <div>Inflation</div>
                                  <div>Budget</div>
                                  <div>Debt</div>
                                  <div>Unemployment</div>
                                  <div>Population "Social"</div>
                                  <div>Import partners</div>
                                  <div>Export partner</div>
                                  <div>Import</div>
                                  <div>Export</div>
                                  
                                </div>
                                <div className="Fr-TitleBl">Social</div>
                                <div className="Fr-FrInd">
                                  <div>Average Salary "Economic"</div>
                                  <div>Average Working hours "Economic"</div>
                                  <div>HappyLevelGroup</div>
                                  <div>Quality life</div>
                                  <div>Litaracy Level</div>
                                  <div>Average life expectancy</div>
                                  <div>Percentage of population povery</div>
                                  <div>Infant mortality rate</div>
                                  <div>Social inequality</div>
                                </div>
                                <div className="Fr-TitleBl">Politic</div>
                                <div className="Fr-FrInd">
                                  <div>Form of Government</div>
                                  <div>Corruption</div>
                                  <div>GoldReserv</div>
                                  <div>Democracy index</div>
                                  <div>Level of PressFreedom</div>
                                  <div>International agreements</div>
                                </div>
                                <div className="Fr-TitleBl">Regions</div>
                                <div className="Fr-FrInd">
                                  {firstGroup.Region.map((region, index)=>{
                                    return(
                                      <div key={index}>{region.regionName}</div>
                                    )
                                  })}
                                  
                                </div>
                              </div>
                              <div className={`SecondBlockInput`}>
                                <div className="Sc-Void"></div>
                                <div className="Sc-FrIn">
                                  <form onSubmit={(e)=>handleSendEconomic(e,firstGroup.countryCode)}> 
                                      <div>
                                        <input type="number" onClick={() => ScInputOpen(index)} name='ValueGDP' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Year : languages.English.Indicators.Year}  name="yearGDP"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" onClick={() => ScInputOpen(index)} name='InflationValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Year : languages.English.Indicators.Year}  name="Inflationyear"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" onClick={() => ScInputOpen(index)} name='BudgetValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Year : languages.English.Indicators.Year}  name="Budgetyear"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" onClick={() => ScInputOpen(index)} name='DebtValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Year : languages.English.Indicators.Year}  name="Debtyear"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" onClick={() => ScInputOpen(index)} name='UnemploymentValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Year : languages.English.Indicators.Year}  name="Unemploymentyear"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" onClick={() => ScInputOpen(index)} name='PopulationValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Year : languages.English.Indicators.Year}  name="Populationyear"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="text" onClick={() => ScInputOpen(index)} name='ExportParName' placeholder={props.lan ? languages[props.lan].Indicators.CountryName : languages.English.Indicators.CountryName}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Percent : languages.English.Indicators.Percent}  name="ExportParValue"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="text" onClick={() => ScInputOpen(index)} name='ImportParName' placeholder={props.lan ? languages[props.lan].Indicators.CountryName : languages.English.Indicators.CountryName}/> 
                                        <input type="number" placeholder={props.lan ? languages[props.lan].Indicators.Percent : languages.English.Indicators.Percent}  name="ImportParValue"/>
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='importValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='exportValue' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      
                                  </form>
                                  <div className="Void"></div>
                                  <form onSubmit={(e)=>handleSendSocial(e,firstGroup.countryCode)}> 
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='AverageSalary' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='AverageWorkingHours' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='HappyLevelGroup' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='QualityLifeGroup' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='LiteracyLevel' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='AverageLifeExpectancy' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='PercentageOfPopulationPoverty' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='InfantMortalityRate' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='SocialInequality' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      
                                  </form>
                                  <div className="Void"></div>
                                  <form onSubmit={(e)=>handleSendPolitic(e,firstGroup.countryCode)}>
                                      <div>
                                        <input type="text" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='FormOfGovernment' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='CorruptionGroup' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='GoldReservGroup' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='DemocracyIndex' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="number" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='LevelOfPressFreedom' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                      <div>
                                        <input type="text" style={{width:'80%'}} onClick={() => ScInputOpen(index)} name='InternationalAgreements' placeholder={props.lan ? languages[props.lan].Indicators.Value : languages.English.Indicators.Value}/> 
                                        <button className="button" type='submit'>
                                          <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d={svg.plus} fill="white"/>
                                          </svg>
                                        </button>
                                      </div>
                                  </form>
                                  <div className="Void"></div>
                                  <form onSubmit={(e)=>handleSendRegion(e, firstGroup.countryCode)}>
                                    {firstGroup.Region.map((region, indexReg)=>{
                                      const gdpKey = `gdp_${indexReg}`;
                                      const populationKey = `population_${indexReg}`;
                                      return(
                                        <div key={indexReg}>
                                          <input type="number" style={{width:"37%"}} onClick={() => ScInputOpen(index)} name={gdpKey} placeholder="GDP"/>
                                          <input type="number" style={{width:"37%"}} onClick={() => ScInputOpen(index)} name={populationKey} placeholder="Population"/> 
                                          <button className="button" type='submit'>
                                            <svg width="13" height="13" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d={svg.plus} fill="white"/>
                                            </svg>
                                          </button>
                                        </div>
                                      )
                                    })}
                                      
                                  </form>
                                  
                                </div>
                              </div>
                              <div className={`ThirdBlockInfo`}>
                                <div className="BlockColumnsInfo" style={{height:"211px"}}>
                                  <div style={{width:`${firstGroup.Economic.GDPGroup.length * 151}px`}}>
                                    

                                  {firstGroup.Economic.GDPGroup
                                    .map((partner) => partner.year) // Отримати масив років
                                    .sort((a, b) => a - b) // Сортувати роки від найменшого до найбільшого
                                    .map((year, index) => (
                                      <div className="ColumnInfo">
                                      <div className="TitleColumn" key={index}>{year}</div>
                                      <div>
                                      {firstGroup.Economic.GDPGroup.map((partner, partnerIndex) => {  
                                        if(partner.year === year){
                                          return(
                                          <div className="BarCol" key={partnerIndex}>
                                            <div className="BarColText" title="GDPGroup">{partner.value}</div>
                                            <div className="DeleteButton" onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                              <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_136_179)">
                                                <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_136_179">
                                                <rect width="9" height="9" fill="white"/>
                                                </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          )
                                        }
                                      })}
                                      </div>
                                      <div>
                                      {firstGroup.Economic.InflationGroup.map((partner, partnerIndex) => {
                                        if(partner.year === year){
                                          return(
                                          <div className="BarCol" key={partnerIndex}>
                                            <div className="BarColText" title="PopulationGroup">{partner.value}</div>
                                            <div className="DeleteButton" onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                              <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_136_179)">
                                                <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_136_179">
                                                <rect width="9" height="9" fill="white"/>
                                                </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          )
                                        }
                                      })}
                                      </div>
                                      <div>
                                      {firstGroup.Economic.BudgetGroup.map((partner, partnerIndex) => {
                                        if(partner.year === year){
                                          return(
                                          <div className="BarCol" key={partnerIndex}>
                                            <div className="BarColText" title="PopulationGroup">{partner.value}</div>
                                            <div className="DeleteButton" onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                              <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_136_179)">
                                                <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_136_179">
                                                <rect width="9" height="9" fill="white"/>
                                                </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          )
                                        }
                                      })}
                                      </div>
                                      <div>
                                      {firstGroup.Economic.DebtGroup.map((partner, partnerIndex) => {
                                        if(partner.year === year){
                                          return(
                                          <div className="BarCol" key={partnerIndex}>
                                            <div className="BarColText" title="PopulationGroup">{partner.value}</div>
                                            <div className="DeleteButton" onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                              <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_136_179)">
                                                <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_136_179">
                                                <rect width="9" height="9" fill="white"/>
                                                </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          )
                                        }
                                      })}
                                      </div>
                                      <div>
                                      {firstGroup.Economic.UnemploymentGroup.map((partner, partnerIndex) => {
                                        if(partner.year === year){
                                          return(
                                          <div className="BarCol" key={partnerIndex}>
                                            <div className="BarColText" title="PopulationGroup">{partner.value}</div>
                                            <div className="DeleteButton" onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                              <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_136_179)">
                                                <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_136_179">
                                                <rect width="9" height="9" fill="white"/>
                                                </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          )
                                        }
                                      })}
                                      </div>
                                      <div>
                                      {firstGroup.Economic.PopulationGroup.map((partner, partnerIndex) => {
                                        if(partner.year === year){
                                          return(
                                          <div className="BarCol" key={partnerIndex}>
                                            <div className="BarColText" title="PopulationGroup">{partner.value}</div>
                                            <div className="DeleteButton" onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                              <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_136_179)">
                                                <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_136_179">
                                                <rect width="9" height="9" fill="white"/>
                                                </clipPath>
                                                </defs>
                                              </svg>
                                            </div>
                                          </div>
                                          )
                                        }
                                      })}
                                      </div>
                                      
                                    </div>
                                    ))
                                  }

                                    
                                  </div> 
                                </div>
                                <div className="RowInfo" style={{height:"120px"}}>
                                <div className="BarPartner">
                                  {firstGroup.Economic.exportPartners.map((partner, indexPar)=>{
                                    return(
                                        <div key={indexPar}>
                                          <div>{partner.name}</div>
                                          <div>{partner.value}%</div>
                                          <div onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    )
                                  })}
                                  </div>
                                  <div className="BarPartner">
                                  {firstGroup.Economic.importPartners.map((partner, indexPar)=>{
                                    return(
                                      
                                        <div key={indexPar}>
                                          <div>{partner.name}</div>
                                          <div>{partner.value}%</div>
                                          <div onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                      
                                    )
                                  })}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Economic.importValue ? (
                                      <div>
                                          <div>{firstGroup.Economic.importValue}</div>
                                          <div style={{display:'none'}}>
                                          <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Economic.exportValue ? (
                                      <div>
                                          <div>{firstGroup.Economic.exportValue}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div style={{height:"31px", float:"left", width:"100%"}}></div>

                                <div className="RowInfo" style={{height:"270px"}}>
                                  
                                  <div className="BarPartner">
                                    {firstGroup.Social.AverageSalary ? (
                                      <div>
                                          <div>{firstGroup.Social.AverageSalary}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.AverageWorkingHours ? (
                                      <div>
                                          <div>{firstGroup.Social.AverageWorkingHours}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.HappyLevelGroup ? (
                                      <div>
                                          <div>{firstGroup.Social.HappyLevelGroup}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.QualityLifeGroup ? (
                                      <div>
                                          <div>{firstGroup.Social.QualityLifeGroup}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.LiteracyLevel ? (
                                      <div>
                                          <div>{firstGroup.Social.LiteracyLevel}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.AverageLifeExpectancy ? (
                                      <div>
                                          <div>{firstGroup.Social.AverageLifeExpectancy}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.PercentageOfPopulationPoverty ? (
                                      <div>
                                          <div>{firstGroup.Social.PercentageOfPopulationPoverty}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.InfantMortalityRate ? (
                                      <div>
                                          <div>{firstGroup.Social.InfantMortalityRate}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Social.SocialInequality ? (
                                      <div>
                                          <div>{firstGroup.Social.SocialInequality}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                
                                </div>

                                <div style={{height:"31px", float:"left", width:"100%"}}></div>

                                <div className="RowInfo" style={{height:"180px"}}>
                                  <div className="BarPartner">
                                    {firstGroup.Politic.FormOfGovernment ? (
                                      <div>
                                          <div>{firstGroup.Politic.FormOfGovernment}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Politic.CorruptionGroup ? (
                                      <div>
                                          <div>{firstGroup.Politic.CorruptionGroup}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Politic.GoldReservGroup ? (
                                      <div>
                                          <div>{firstGroup.Politic.GoldReservGroup}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Politic.DemocracyIndex ? (
                                      <div>
                                          <div>{firstGroup.Politic.DemocracyIndex}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                    {firstGroup.Politic.LevelOfPressFreedom ? (
                                      <div>
                                          <div>{firstGroup.Politic.LevelOfPressFreedom}</div>
                                          <div style={{display:'none'}}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                    ) : null}
                                  </div>
                                  <div className="BarPartner">
                                  {firstGroup.Politic.InternationalAgreements.map((partner, indexPar)=>{
                                    return(
                                      
                                        <div key={indexPar}>
                                          <div>{partner.organizacionName}</div>
                                          <div onClick={() => handleDeleteGdp(firstGroup.countryCode,partner._id)}>
                                            <svg  viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_136_179)">
                                              <path d="M3.09375 3.09375C3.16834 3.09375 3.23988 3.12338 3.29262 3.17613C3.34537 3.22887 3.375 3.30041 3.375 3.375V6.75C3.375 6.82459 3.34537 6.89613 3.29262 6.94887C3.23988 7.00162 3.16834 7.03125 3.09375 7.03125C3.01916 7.03125 2.94762 7.00162 2.89488 6.94887C2.84213 6.89613 2.8125 6.82459 2.8125 6.75V3.375C2.8125 3.30041 2.84213 3.22887 2.89488 3.17613C2.94762 3.12338 3.01916 3.09375 3.09375 3.09375ZM4.5 3.09375C4.57459 3.09375 4.64613 3.12338 4.69887 3.17613C4.75162 3.22887 4.78125 3.30041 4.78125 3.375V6.75C4.78125 6.82459 4.75162 6.89613 4.69887 6.94887C4.64613 7.00162 4.57459 7.03125 4.5 7.03125C4.42541 7.03125 4.35387 7.00162 4.30113 6.94887C4.24838 6.89613 4.21875 6.82459 4.21875 6.75V3.375C4.21875 3.30041 4.24838 3.22887 4.30113 3.17613C4.35387 3.12338 4.42541 3.09375 4.5 3.09375ZM6.1875 3.375C6.1875 3.30041 6.15787 3.22887 6.10512 3.17613C6.05238 3.12338 5.98084 3.09375 5.90625 3.09375C5.83166 3.09375 5.76012 3.12338 5.70738 3.17613C5.65463 3.22887 5.625 3.30041 5.625 3.375V6.75C5.625 6.82459 5.65463 6.89613 5.70738 6.94887C5.76012 7.00162 5.83166 7.03125 5.90625 7.03125C5.98084 7.03125 6.05238 7.00162 6.10512 6.94887C6.15787 6.89613 6.1875 6.82459 6.1875 6.75V3.375Z" fill="white"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M8.15625 1.6875C8.15625 1.83668 8.09699 1.97976 7.9915 2.08525C7.88601 2.19074 7.74293 2.25 7.59375 2.25H7.3125V7.3125C7.3125 7.61087 7.19397 7.89702 6.98299 8.10799C6.77202 8.31897 6.48587 8.4375 6.1875 8.4375H2.8125C2.51413 8.4375 2.22798 8.31897 2.017 8.10799C1.80603 7.89702 1.6875 7.61087 1.6875 7.3125V2.25H1.40625C1.25707 2.25 1.11399 2.19074 1.0085 2.08525C0.903013 1.97976 0.84375 1.83668 0.84375 1.6875V1.125C0.84375 0.975816 0.903013 0.832742 1.0085 0.727252C1.11399 0.621763 1.25707 0.5625 1.40625 0.5625H3.375C3.375 0.413316 3.43426 0.270242 3.53975 0.164752C3.64524 0.0592632 3.78832 0 3.9375 0L5.0625 0C5.21168 0 5.35476 0.0592632 5.46025 0.164752C5.56574 0.270242 5.625 0.413316 5.625 0.5625H7.59375C7.74293 0.5625 7.88601 0.621763 7.9915 0.727252C8.09699 0.832742 8.15625 0.975816 8.15625 1.125V1.6875ZM2.31638 2.25L2.25 2.28319V7.3125C2.25 7.46168 2.30926 7.60476 2.41475 7.71025C2.52024 7.81574 2.66332 7.875 2.8125 7.875H6.1875C6.33668 7.875 6.47976 7.81574 6.58525 7.71025C6.69074 7.60476 6.75 7.46168 6.75 7.3125V2.28319L6.68362 2.25H2.31638ZM1.40625 1.6875V1.125H7.59375V1.6875H1.40625Z" fill="white"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0_136_179">
                                              <rect width="9" height="9" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                        </div>
                                      
                                    )
                                  })}
                                  </div>

                                </div>

                                <div style={{height:"31px", float:"left", width:"100%"}}></div>
                              </div>
                            </div>
                        </div>)}
                    </div>
                )
            })}
        </div>
    );
}
export default CountryList;