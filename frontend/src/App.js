import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WelcomePage from './pages/WelcomePage';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({});

  const handleNext = (navigate, data) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    const path = window.location.pathname;

    switch (path) {
      case '/welcome':
        navigate('/step1');
        break;
      case '/step1':
        navigate('/step2');
        break;
      case '/step2':
        navigate('/step3');
        break;
      case '/step3':
        navigate('/step4');
        break;
      default:
        navigate('/');
    }
  };

  const handleSubmit = async (navigate, data) => {
    const finalData = { ...formData, ...data };
    try {
      await axios.post('http://localhost:8000/api/driverinfo/', finalData);
      setFormData({});
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error.response.data);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin-dashboard" element={<AdminPage />} />
      <Route path="/welcome" element={<WelcomePage onNext={handleNext} />} />
      <Route path="/step1" element={<Step1 onNext={handleNext} />} />
      <Route path="/step2" element={<Step2 onNext={handleNext} />} />
      <Route path="/step3" element={<Step3 onNext={handleNext} />} />
      <Route path="/step4" element={<Step4 onSubmit={handleSubmit} />} />
    </Routes>
  );
};

export default App;
