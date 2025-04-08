// File: client/src/pages/MealPlanDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

export default function MealPlanDashboard() {
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/mealplans', { credentials: 'include' })
      .then(res => res.json())
      .then(setPlans);

    fetch('/api/meals', { credentials: 'include' })
      .then(res => res.json())
      .then(setMeals);
  }, []);

  const getPlannedMeal = (date, mealTime) => {
    return plans.find(p => new Date(p.date).toDateString() === date.toDateString() && p.mealTime === mealTime);
  };

  const startOfWeek = (() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    return new Date(now.setDate(diff));
  })();

  const handleAssign = async (date, mealTime, mealId) => {
    console.log("Assigning:", { date, mealTime, mealId }); // Debug log
    const res = await fetch('/api/mealplans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date, mealTime, mealId })
    });

    if (res.ok) {
      const newPlan = await res.json();
      setPlans([...plans, newPlan]);
    } else {
      alert('Failed to assign meal');
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>📆 Weekly Meal Planner</h2>
        <button
          onClick={() => navigate('/meals')}
          style={{
            background: '#e5e7eb',
            color: '#111827',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ⬅ Back to Meals
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem', background: '#f3f4f6' }}></th>
              {weekdays.map((day, i) => (
                <th key={i} style={{ padding: '0.5rem', background: '#f3f4f6' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTimes.map(time => (
              <tr key={time}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{time}</td>
                {weekdays.map((_, i) => {
                  const date = new Date(startOfWeek);
                  date.setDate(date.getDate() + i);
                  const plan = getPlannedMeal(date, time);

                  return (
                    <td key={i} style={{ border: '1px solid #e5e7eb', padding: '0.5rem', minWidth: '140px' }}>
                      {plan ? (
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{plan.meal.name}</div>
                          <button onClick={() => navigate(`/meals/${plan.meal.id}`)} style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>View</button>
                        </div>
                      ) : (
                        <select onChange={(e) => handleAssign(date, time, e.target.value)} defaultValue="">
                          <option value="" disabled>+ Assign</option>
                          {meals.map(meal => (
                            <option key={meal.id} value={meal.id}>{meal.name}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 