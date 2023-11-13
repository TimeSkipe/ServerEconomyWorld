import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PORT } from '../connect/connect';
const Register = ({setIsAuthenticated,setUsername, handleLogin}) => {
  const [firstname, setFirstName] = useState('');
  const [secondname, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regMes, setRegMes] = useState('Sign Up');

  const navigate = useNavigate();

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (
      firstname.trim() === '' ||
      secondname.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${PORT}/register`, {
        firstname,
        secondname,
        email,
        password,
        level: 'Admin',
        language: 'English',
      });

      console.log(response.data);

      setFirstName('');
      setSecondName('');
      setEmail('');
      setPassword('');

      const authResponse = await axios.post(`${PORT}/login`, {
        email,
        password,
      });

      console.log(authResponse.data);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(authResponse.data.user));
      setIsAuthenticated(true);
      setUsername(authResponse.data.user.firstname); // або інше поле, яке містить ім'я користувача
      navigate('/home');
      window.location.reload()
    } catch (error) {
      console.error('Registration error', error);
      setRegMes('The account already exists');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const authResponse = await axios.post(`${PORT}/login`, {
        email,
        password,
      });

      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('user', JSON.stringify(authResponse.data.user));
      setIsAuthenticated(true);
      setUsername(authResponse.data.user); // або інше поле, яке містить ім'я користувача
      navigate('/home');
    } catch (error) {
      console.error('Login error', error);
      setRegMes('Invalid credentials');
    }
  };
  return (
    <div className="Sectione">
      <Helmet>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
      </Helmet>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-style"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btno mt-4">
                              Login
                            </button>
                          </form>
                          
                          <p className="mb-0 mt-4 text-center">
                            <a href="https://www.web-leb.com/code" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <form onSubmit={handleRegistrationSubmit}>
                            <h4 className="mb-3 pb-3">{regMes}</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-style"
                                placeholder="First Name"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="tel"
                                className="form-style"
                                placeholder="Second Name"
                                value={secondname}
                                onChange={(e) => setSecondName(e.target.value)}
                              />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                className="form-style"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btno mt-4" name="send">
                              Register
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
