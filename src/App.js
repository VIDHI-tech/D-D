import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import "./App.css";

function App() {
  return (

    <div className='App'>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<LandingPage/>} />
           <Route path="/login" element={<LoginPage/>} />
           <Route path="/signup" element={<SignupPage/>} />
           <Route path="/profile" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
