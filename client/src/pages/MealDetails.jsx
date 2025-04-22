// File: client/src/pages/MealDetails.jsx
//this page is no longer needed
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';

export default function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/meals/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(setMeal);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;

    await fetch(`${API_BASE}/api/meals/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    navigate('/meals');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(meal),
    });

    if (res.ok) {
      alert('Meal updated!');
      setEditing(false);
    } else {
      alert('Update failed.');
    }
  };

  if (!meal) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/meals')}
          style={{
            background: '#e5e7eb',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ⬅ Back to Meals
        </button>
      </div>

      <div style={{
        background: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        {!editing ? (
          <>
            <h2 style={{ marginBottom: '0.5rem' }}>{meal.name}</h2>
            <p style={{ marginBottom: '1rem', color: '#555' }}>
              <strong>Description:</strong> {meal.description || 'None'}
            </p>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Ingredients:</p>
            <pre style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{meal.ingredients}</pre>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Instructions:</p>
            <pre style={{ whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{meal.instructions}</pre>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setEditing(true)}
                style={{
                  // background: '#3b82f6',
                  // color: 'white',
                  // border: 'none',
                  // padding: '0.5rem 1rem',
                  // borderRadius: '8px',
                  // cursor: 'pointer'
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <img src="/edit.png" alt="Edit" style={{ width: '16px', height: '16px' }} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <img src="/delete.png" alt="Edit" style={{ width: '16px', height: '16px' }} />
                Delete
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              value={meal.name}
              onChange={(e) => setMeal({ ...meal, name: e.target.value })}
              placeholder="Meal Name"
            />
            <textarea
              value={meal.description}
              onChange={(e) => setMeal({ ...meal, description: e.target.value })}
              placeholder="Description"
            />
            <textarea
              value={meal.ingredients}
              onChange={(e) => setMeal({ ...meal, ingredients: e.target.value })}
              placeholder="Ingredients"
            />
            <textarea
              value={meal.instructions}
              onChange={(e) => setMeal({ ...meal, instructions: e.target.value })}
              placeholder="Instructions"
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                💾 Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                style={{
                  background: '#e5e7eb',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
