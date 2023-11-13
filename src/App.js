// Компонент App
import React, { useEffect, useState } from 'react';
import Header from './components/header.jsx';
import { Routes, Route } from 'react-router-dom';
import Register from './tags/register.jsx';
import Account from './tags/Account.jsx'
import Countries from './tags/Countries.jsx';
import CountryList from './tags/CountryList.jsx';
import News from './tags/News.jsx';
import Support from './tags/Support.jsx';
import Graphs from './tags/Graphs.jsx';
import { PORT } from './connect/connect.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [Lan, setLan] = useState('');
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user'));

    if (isAuthenticated) {
      setIsAuthenticated(true);
      setUsername(user);
      // Перевіряємо, чи існує значення user.language перед встановленням значення Lan
      
    }
    
    const UserLan = async (user) =>{
      
      try {
          const response = await fetch(`${PORT}/userlan/${user._id}`);
          const data = await response.json();
          if (user && user.language) {

            setLan(data.language);
          }
      } catch (error) {
          console.log('Error', error)
      }
  }
  UserLan(user);
  }, []);
  
  return (
    <div className="App" style={{ background: "#313033" }}>
      <Header
        register="/register"
        account="/account"
        isAuthenticated={isAuthenticated}
        username={username}
        lan={Lan ? Lan : ""}
        setIsAuthenticated={setIsAuthenticated} // Додано setIsAuthenticated
        handleLogout={handleLogout}
        countries='/countries'
        CountryList = '/countryList'
        News = '/news'
        Support = '/support'
        Graphs = '/graphs'
      />
      <Routes>
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />}
        ></Route>
        <Route
          path="/account"
          element={<Account/>}
        ></Route>
        <Route path='/countries' element={<Countries username={username} isAuthenticated={isAuthenticated} lan={Lan ? Lan : ""}/>}></Route>
        <Route path='/countryList' element={<CountryList lan={Lan ? Lan : ""}/>}></Route>
        <Route path='/*' element={<News/>}></Route>
        <Route path='/news' element={<News/>}></Route>
        <Route path='/support' element={<Support/>}></Route>
        <Route path='/graphs' element={<Graphs/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
