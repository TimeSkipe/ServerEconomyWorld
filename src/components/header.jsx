import React, { useEffect, useState } from "react";
import "../styles/header.css";
import { Link, useNavigate } from 'react-router-dom';
import languages from "../language/language.js"
import flags from "../img/flags.js";
import { PORT } from "../connect/connect";
function Header(props) {
  const [HiddeActive, setHiddeActive] = useState(false);
  
  const OpenHiddeMenu = () => {
    setHiddeActive(!HiddeActive)
  }
  
  const handleLogout = () => {
    props.setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setHiddeActive(false); // Скидаємо стан HiddeActive
  };
  const [HiddeLan, setHiddeLan] = useState(false)
  const OpenLanguage = () =>{
    setHiddeLan(!HiddeLan)
    setHiddeActive(false)
  }
  const handleChangeLan = async (userId, Lan)=>{
    try {
      const response = await fetch(
        `${PORT}/userlan/${userId}`,
        {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Lan,
          }),
        });
      const data = await response.json();
      console.log('Мова успішно змінена', data);
      setHiddeLan(!HiddeLan)
      
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const renderButton = () => {
    if (props.isAuthenticated) {
      if (props.username.level === 'Admin' || props.username.level === 'Moderator') {
        return (
          <div className={HiddeActive ? "AccountBar Active" : "AccountBar"}>
            <div className={HiddeLan ? "HiddeLanMenu Active" : "HiddeLanMenu"}>
              {Object.entries(flags).map(([keyFl, value]) => {
                    return <img src={value} key={keyFl} onClick={()=>handleChangeLan(props.username._id, keyFl)}/>;
                })}
            </div>
            <div className={HiddeLan ? "ImgAccount Deactive" : "ImgAccount"} onClick={OpenLanguage}>
            {Object.entries(flags).map(([key, value]) => {
                if(props.lan){
                  if(key === props.lan){
                    return <img src={value} key={key}/>;
                  }
                }
              })}
              
            </div>
            <div className="NameAccount">{props.username.firstname} {props.username.secondname}</div>
            <div className="SpanAccount" onClick={OpenHiddeMenu} style={{ rotate: HiddeActive ? "180deg" : "0deg" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            </div>
            <div className="HiddeMenuAccount" style={{ display: HiddeActive ? 'block' : "none" }}>
              <div><Link style={{color:'white', textDecoration:'none'}} to={props.account}>{props.lan ? languages[props.lan].Header.ListOfUsers : languages.English.Header.ListOfUsers}</Link></div>
              <div><Link style={{color:'white', textDecoration:'none'}} to={props.CountryList}>{props.lan ? languages[props.lan].Header.ListOfCountry: languages.English.Header.ListOfCountry}</Link></div>
              <div onClick={handleLogout}>{props.lan ? languages[props.lan].Header.Exit :languages.English.Header.Exit}</div>
            </div>
          </div>
        );
      } else if (props.username.level === 'User') {
        return (
          <div className={HiddeActive ? "AccountBar Active" : "AccountBar"}>
            <div className="ImgAccount">
              <img src={flags[props.username.language]}/>
            </div>
            <div className="NameAccount">{props.username.firstname} {props.username.secondname}</div>
            <div className="SpanAccount" onClick={OpenHiddeMenu} style={{ rotate: HiddeActive ? "180deg" : "0deg" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            </div>
            <div className="HiddeMenuAccount" style={{ display: HiddeActive ? 'block' : "none" }}>
              <div onClick={handleLogout}>{languages.English.Header.Exit}</div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div style={{ position: 'absolute', right: '15px' }}>
          <Link className="RegisterButton" to={props.register}>
            {languages.English.Header.Registration}
          </Link>
          <Link className="SignInButton" to={props.register}>
            {languages.English.Header.SignIn}
          </Link>
        </div>
      );
    }
  };
  
  
  const Header = () =>{
      if(props.isAuthenticated){
        return(
          <div className="MenuBar">
            <div><Link to={props.News} style={{ color:"white", textDecoration:'none'}}>{props.lan ? languages[props.lan].Header.News : languages.English.Header.News}</Link></div>
            <div><Link to={props.Graphs} style={{ color:"white", textDecoration:'none'}}>{props.lan ? languages[props.lan].Header.Graphs : languages.English.Header.Graphs}</Link></div>
            <div><Link to={props.countries} style={{ color:"white", textDecoration:'none'}}>{props.lan ? languages[props.lan].Header.Country : languages.English.Header.Country}</Link></div>
            <div><Link to={props.Support} style={{ color:"white", textDecoration:'none'}}>{props.lan ? languages[props.lan].Header.Support : languages.English.Header.Support}</Link></div>
          </div>
        )
      }else {
        return(
          <div className="MenuBar">
            <div><Link to={props.News} style={{ color:"white", textDecoration:'none'}}>{languages.English.Header.News}</Link></div>
            <div><Link to={props.Graphs} style={{ color:"white", textDecoration:'none'}}>{languages.English.Header.Graphs}</Link></div>
            <div><Link to={props.countries} style={{ color:"white", textDecoration:'none'}}>{languages.English.Header.Country}</Link></div>
            <div><Link to={props.Support} style={{ color:"white", textDecoration:'none'}}>{languages.English.Header.Support}</Link></div>
          </div>
        )
      }
    
    
  }
  return (
    
    <div className="Header">
      
      <div className="TitleBar">
        <strong>World</strong> Economy
      </div>
      
      {Header()}
      {renderButton()}

    </div>
  );
}

export default Header;
