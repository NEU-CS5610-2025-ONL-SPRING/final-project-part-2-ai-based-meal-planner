// File: client/src/pages/MealPlanDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealModal from '../components/MealModal';
import Select from 'react-select';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

export default function MealPlanDashboard() {
  const [plans, setPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectKey, setSelectKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/mealplans', { credentials: 'include' })
      .then(res => res.json())
      .then(setPlans);

    fetch('/api/meals', { credentials: 'include' })
      .then(res => res.json())
      .then(setMeals);
  }, []);

  const getPlannedMeals = (date, mealTime) => {
    return plans.filter(p => new Date(p.date).toDateString() === date.toDateString() && p.mealTime === mealTime);
  };

  const startOfWeek = (() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  })();

  const handleAssign = async (date, mealTime, mealId) => {
    const res = await fetch('/api/mealplans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: date.toISOString(), mealTime, mealId })
    });

    if (res.ok) {
      const newPlan = await res.json();
      setPlans([...plans, newPlan]);
      setSelectKey(prev => prev + 1);
    } else {
      alert('Failed to assign meal');
    }
  };

  const handleUnassign = async (planId) => {
    const res = await fetch(`/api/mealplans/${planId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) {
      setPlans(plans.filter(p => p.id !== planId));
    } else {
      alert('Failed to unassign meal');
    }
  };

  const handleView = async (id) => {
    const res = await fetch(`/api/meals/${id}`, { credentials: 'include' });
    const meal = await res.json();
    setSelectedMeal(meal);
    setIsEditing(false);
    setShowModal(true);
  };

  const tableStyles = {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'separate',
    borderSpacing: '0.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden'
  };

  const buttonStyle = {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  };

  return (
    <div style={{ maxWidth: '100%', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', maxWidth: 1100, marginInline: 'auto' }}>
        <h2 style={{ fontSize: '1.75rem' }}>📆 Weekly Meal Planner</h2>
        <button
          onClick={() => navigate('/meals')}
          style={{
            background: '#e5e7eb',
            color: '#111827',
            padding: '0.5rem 1.25rem',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          ⬅ Back to Meals
        </button>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: 1100, marginInline: 'auto', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', background: '#f9fafb', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}></th>
              {weekdays.map((day, i) => (
                <th key={i} style={{ padding: '1rem', background: '#f9fafb', textAlign: 'center', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTimes.map(time => (
              <tr key={time}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', textAlign: 'left', background: '#f3f4f6' }}>{time}</td>
                {weekdays.map((_, i) => {
                  const date = new Date(startOfWeek);
                  date.setDate(date.getDate() + i);
                  const slotPlans = getPlannedMeals(date, time);

                  return (
                    <td key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem', verticalAlign: 'top', background: '#fff' }}>
                      {slotPlans.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          {slotPlans.map(plan => (
                            <div key={plan.id} style={{ background: '#f3f4f6', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                              <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{plan.meal.name}</div>
                              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                                <button onClick={() => handleView(plan.meal.id)} style={{ ...buttonStyle, background: '#dbeafe', color: '#1e3a8a', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View</button>
                                <button onClick={() => handleUnassign(plan.id)} style={{ ...buttonStyle, background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <Select
                        key={selectKey + '-' + time + '-' + i}
                        options={meals.map(meal => ({ value: meal.id, label: meal.name }))}
                        onChange={(selected) => handleAssign(date, time, selected.value)}
                        placeholder="+ Assign"
                        isSearchable
                        styles={{
                          container: base => ({ ...base }),
                          control: base => ({ ...base, borderRadius: '8px' })
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedMeal && (
        <MealModal
          meal={selectedMeal}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onClose={() => setShowModal(false)}
          onChange={setSelectedMeal}
        />
      )}
    </div>
  );
}