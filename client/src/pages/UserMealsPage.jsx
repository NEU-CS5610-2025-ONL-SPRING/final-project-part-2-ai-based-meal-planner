import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserMealsPage() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/meals', { credentials: 'include' })
      .then(res => res.json())
      .then(setMeals);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/');
  };

  // ✅ Filter meals based on name or ingredients
  const filteredMeals = meals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      {/* Header with logout and create buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h2>Your Meals ({filteredMeals.length})</h2>
        <div>
          <button
            onClick={() => navigate('/add-meal')}
            style={{
              marginRight: '1rem',
              background: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            + Create Meal
          </button>
          <button
            onClick={() => navigate('/planner')}
            style={{
              background: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            📆 Open Meal Planner
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Search bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or ingredients..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      {/* Meal list */}
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {filteredMeals.map(meal => (
          <div key={meal.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            padding: '0.75rem 0'
          }}>
            <div>
              <strong>{meal.name}</strong>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {meal.description || 'No description'}
              </div>
            </div>
            <button 
              onClick={() => navigate(`/meals/${meal.id}`)}
              style={{
              background: '#e0e7ff',
              color: '#3730a3',
              border: 'none',
              borderRadius: '8px',
              padding: '0.25rem 0.75rem',
              cursor: 'pointer'
            }}>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
