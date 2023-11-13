import React, { useEffect, useState } from "react";
import '../styles/Countries.css'
import { EuropaBar, Africa, Oceania, AmericaSouth, GreenLand, AmericaNorth, Asia, moskou } from "../svgLink/svgLink";
import languages from "../language/language"
import { PORT } from "../connect/connect";
const Countries = (props)=>{
    const [active, setActive] = useState(false);
    const [FirstGroupGet ,setFirstGroupGet] = useState('')
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
    
    const CountryList = () =>{
        if(props.isAuthenticated){
            return(
                <div className="ListBar"  style={{display:active ? 'none' : 'block'}}>
                    <div className="RegionBar">
                        <div className="NameRegionBar">{props.lan ? languages[props.lan].Continents.Africa : languages.English.Continents.Africa}</div>
                        <div className="EveryCountriesBar">
                        {FirstGroupGet && Array.isArray(FirstGroupGet) ? (
                            FirstGroupGet.map((firstGroup, index) => {
                                if (firstGroup.Continent === "Africa" && firstGroup.Visible === 'Visible') {
                                return (
                                    <div key={index}>
                                    {props.lan
                                        ? languages[props.lan].Countries[firstGroup.countryCode]
                                        : languages.English.Countries[firstGroup.countryCode]}
                                    </div>
                                );
                                }
                                return null;
                            })
                            ) : null}
                        </div>
                    </div>

                    <div className="RegionBar">
                        <div className="NameRegionBar">{props.lan ? languages[props.lan].Continents.Asia : languages.English.Continents.Asia}</div>
                        <div className="EveryCountriesBar">
                        {FirstGroupGet && Array.isArray(FirstGroupGet) ? (
                            FirstGroupGet.map((firstGroup, index) => {
                                if (firstGroup.Continent === "Asia" && firstGroup.Visible === 'Visible') {
                                return (
                                    <div key={index}>
                                    {props.lan
                                        ? languages[props.lan].Countries[firstGroup.countryCode]
                                        : languages.English.Countries[firstGroup.countryCode]}
                                    </div>
                                );
                                }
                                return null;
                            })
                            ) : null}
                            
                        </div>
                    </div>
                    <div className="RegionBar">
                        <div className="NameRegionBar">{props.lan ? languages[props.lan].Continents.Europa : languages.English.Continents.Europa}</div>
                        <div className="EveryCountriesBar">
                        {FirstGroupGet && Array.isArray(FirstGroupGet) ? (
                            FirstGroupGet.map((firstGroup, index) => {
                                if (firstGroup.Continent === "Europa" && firstGroup.Visible === 'Visible') {
                                return (
                                    <div key={index}>
                                    {props.lan
                                        ? languages[props.lan].Countries[firstGroup.countryCode]
                                        : languages.English.Countries[firstGroup.countryCode]}
                                    </div>
                                );
                                }
                                return null;
                            })
                            ) : null}
                            
                        </div>
                    </div>
                    <div className="RegionBar">
                        <div className="NameRegionBar">{props.lan ? languages[props.lan].Continents.NorthAmerica : languages.English.Continents.NorthAmerica}</div>
                        <div className="EveryCountriesBar">
                        {FirstGroupGet && Array.isArray(FirstGroupGet) ? (
                            FirstGroupGet.map((firstGroup, index) => {
                                if (firstGroup.Continent === "NorthAmerica" && firstGroup.Visible === 'Visible') {
                                return (
                                    <div key={index}>
                                    {props.lan
                                        ? languages[props.lan].Countries[firstGroup.countryCode]
                                        : languages.English.Countries[firstGroup.countryCode]}
                                    </div>
                                );
                                }
                                return null;
                            })
                            ) : null}
                            
                            
                        </div>
                    </div>
                    <div className="RegionBar">
                        <div className="NameRegionBar">{props.lan ? languages[props.lan].Continents.Oceania : languages.English.Continents.Oceania}</div>
                        <div className="EveryCountriesBar">
                        {FirstGroupGet && Array.isArray(FirstGroupGet) ? (
                            FirstGroupGet.map((firstGroup, index) => {
                                if (firstGroup.Continent === "Oceania" && firstGroup.Visible === 'Visible') {
                                return (
                                    <div key={index}>
                                    {props.lan
                                        ? languages[props.lan].Countries[firstGroup.countryCode]
                                        : languages.English.Countries[firstGroup.countryCode]}
                                    </div>
                                );
                                }
                                return null;
                            })
                            ) : null}
                            
                            
                        </div>
                    </div>
                    <div className="RegionBar">
                        <div className="NameRegionBar">{props.lan ? languages[props.lan].Continents.SouthAmerica : languages.English.Continents.SouthAmerica}</div>
                        <div className="EveryCountriesBar">
                        {FirstGroupGet && Array.isArray(FirstGroupGet) ? (
                            FirstGroupGet.map((firstGroup, index) => {
                                if (firstGroup.Continent === "SouthAmerica" && firstGroup.Visible === 'Visible') {
                                return (
                                    <div key={index}>
                                    {props.lan
                                        ? languages[props.lan].Countries[firstGroup.countryCode]
                                        : languages.English.Countries[firstGroup.countryCode]}
                                    </div>
                                );
                                }
                                return null;
                            })
                            ) : null}
                            
                            
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="ListBar"  style={{display:active ? 'none' : 'block'}}>
                <div className="RegionBar">
                    <div className="NameRegionBar">Африка</div>
                    <div className="EveryCountriesBar">
                        <div>Алжир</div>
                        <div>Ангола</div>
                        <div>Бенін</div>
                        <div>Ботсвана</div>
                        <div>Буркіна Фасо</div>
                        <div>Букунді</div>
                        <div>Кабо Верде</div>
                        <div>Камерун</div>
                        <div>Цар</div>
                        <div>Чад</div>
                        <div>Коморос</div>
                        <div>Конго</div>
                        <div>Кот Д'івуар</div>
                        <div>Джибуті</div>
                        <div>Др Конго</div>
                        <div>Єгипет</div>
                        <div>Екваторіальна Гвінея</div>
                        <div>Еритрея</div>
                        <div>Есватіні</div>
                        <div>Ефіопія</div>
                        <div>Ґабон</div>
                        <div>Гамбія</div>
                        <div>Гана</div>
                        <div>Гвінея</div>
                        <div>Гвінея-Біссау</div>
                        <div>Кенія</div>
                        <div>Лесото</div>
                        <div>Ліберія</div>
                        <div>Лівія</div>
                        <div>Мадагаскар</div>
                        <div>Малаві</div>
                        <div>Малі</div>
                        <div>Мавританія</div>
                        <div>Маврикій</div>
                        <div>Марокко</div>
                        <div>Мозамбік</div>
                        <div>Намібія</div>
                        <div>Нігер</div>
                        <div>Руанда</div>
                        <div>Сан-Томе і Принсіпі</div>
                        <div>Сенегал</div>
                        <div>Сейшельські острови</div>
                        <div>Сьєрра-Леоне</div>
                        <div>Сомалі</div>
                        <div>Південна Африка</div>
                        <div>Південий Судан</div>
                        <div>Судан</div>
                        <div>Танзанія</div>
                        <div>Того</div>
                        <div>Уганда</div>
                        <div>Замбія</div>
                        <div>Зімбабве</div>
                    </div>
                </div>
                <div className="RegionBar">
                    <div className="NameRegionBar">Азія</div>
                    <div className="EveryCountriesBar">
                        <div>Японія</div>
                        <div>Філіппіни</div>
                        
                    </div>
                </div>
                <div className="RegionBar">
                    <div className="NameRegionBar">Європа</div>
                    <div className="EveryCountriesBar">
                        <div>Албанія</div>
                        <div>Андорра</div>
                        <div>Австрія</div>
                        <div>Білорусь</div>
                        <div>Бельгія</div>
                        <div>Боснія і Герцеговина</div>
                        <div>Болгарія</div>
                        <div>Хорватія</div>
                        <div>Чехія</div>
                        <div>Данія</div>
                        <div>Естонія</div>
                        <div>Фінляндія</div>
                        <div>Франція</div>
                        <div>Німеччина</div>
                        <div>Греція</div>
                        <div>Ватикан</div>
                        <div>Угорщина</div>
                        <div>Ісландія</div>
                        <div>Ірландія</div>
                        <div>Італія</div>
                        <div>Латвія</div>
                        <div>Ліхтенштейн</div>
                        <div>Литва</div>
                        <div>Люксембург</div>
                        <div>Мальта</div>
                        <div>Молдова</div>
                        <div>Монако</div>
                        <div>Чорногорія</div>
                        <div>Нідерланди</div>
                        <div>Північна Македонія</div>
                        <div>Норвегія</div>
                        <div>Польща</div>
                        <div>Португалія</div>
                        <div>Румунія</div>
                        <div>Сан-Марино</div>
                        <div>Сербія</div>
                        <div>Словаччина</div>
                        <div>Словенія</div>
                        <div>Іспанія</div>
                        <div>Швеція</div>
                        <div>Швейцарія</div>
                        <div>Україна</div>
                        <div>Великобританія</div>
                    </div>
                </div>
                </div>
            )
        }
    }
    return(
        <div className="CountriesBar">
            <div className="CountriesButton" onClick={()=>{setActive(true)}} style={{display:active ? 'none' : 'flex'}}>Мапа</div>
            <div className="CountriesButton"  onClick={()=>{setActive(false)}} style={{display:active ? 'flex' : 'none'}}>Список</div>
            <div className="InteractiveMap"  style={{display:active ? 'block' : 'none'}}>
                <svg viewBox="0 0 3384 1512">
                    <path d={EuropaBar} className="ContinentBar"></path>
                    <path d={Africa} className="ContinentBar"></path>
                    <path d={Oceania} className="ContinentBar"></path>
                    <path d={AmericaSouth} className="ContinentBar"></path>
                    <path d={GreenLand} className="ContinentBar"></path>
                    <path d={AmericaNorth} className="ContinentBar"></path>
                    <path d={Asia} className="ContinentBar"></path>
                    <path d={moskou} className="ContinentBar"></path>
                </svg>
            </div>
            {CountryList()}
        </div>
    )
}
export default Countries;