import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddMeal from './pages/AddMeal';
import UserMealsPage from './pages/UserMealsPage';
import MealDetails from './pages/MealDetails';
import MealPlanDashboard from './pages/MealPlanDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-meal" element={<AddMeal />} />
        <Route path="/meals" element={<UserMealsPage />} />
        <Route path="/meals/:id" element={<MealDetails />} />
        <Route path="/planner" element={<MealPlanDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
