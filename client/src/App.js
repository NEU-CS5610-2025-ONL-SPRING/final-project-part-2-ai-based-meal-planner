import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddMeal from './pages/AddMeal';
import UserMealsPage from './pages/UserMealsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-meal" element={<AddMeal />} />
        <Route path="/meals" element={<UserMealsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
