// File: client/src/pages/UserMealsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealModal from '../components/MealModal';

export default function UserMealsPage() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleView = async (id) => {
    const res = await fetch(`/api/meals/${id}`, { credentials: 'include' });
    const meal = await res.json();
    setSelectedMeal({
      id: meal.id,
      name: meal.name,
      description: meal.description || '',
      ingredients: meal.ingredients || '',
      instructions: meal.instructions || ''
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;
    await fetch(`/api/meals/${selectedMeal.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    setMeals(meals.filter(m => m.id !== selectedMeal.id));
    handleCancel();
  };

  const handleSave = async () => {
    const method = selectedMeal.id ? 'PUT' : 'POST';
    const url = selectedMeal.id
      ? `/api/meals/${selectedMeal.id}`
      : '/api/meals';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(selectedMeal)
    });

    const result = await res.json();

    if (method === 'POST') {
      setMeals([result, ...meals]);
    } else {
      setMeals(meals.map(m => m.id === result.id ? result : m));
    }

    setSelectedMeal(result);
    setShowModal(false);
    setIsEditing(false);
  };

  const handleGetSuggestions = async () => {
    const res = await fetch('/api/meal-ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ preferences: 'Quick healthy lunch ideas' })
    });

    const suggestion = await res.json();

    if (suggestion && suggestion.name) {
      setSelectedMeal({
        name: suggestion.name,
        description: suggestion.description || '',
        ingredients: suggestion.ingredients || '',
        instructions: suggestion.instructions || ''
      });
      setIsEditing(true);
      setShowModal(true);
    } else {
      alert('Failed to fetch meal suggestions');
    }
  };

  const handleCancel = () => {
    setSelectedMeal(null);
    setIsEditing(false);
    setShowModal(false);
  };

  const filteredMeals = meals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h2>Your Meals ({filteredMeals.length})</h2>
        <div>
          <button
            onClick={() => {
              setSelectedMeal({
                name: '',
                description: '',
                ingredients: '',
                instructions: ''
              });
              setIsEditing(true);
              setShowModal(true);
            }}
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
            onClick={handleGetSuggestions}
            style={{
              marginRight: '1rem',
              background: '#6366f1',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🤖 Get Meal Ideas
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

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or ingredients..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

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
              onClick={() => handleView(meal.id)}
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

      {showModal && selectedMeal && (
        <MealModal
          meal={selectedMeal}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onClose={handleCancel}
          onSave={handleSave}
          onDelete={selectedMeal.id ? handleDelete : null}
          onChange={setSelectedMeal}
        />
      )}
    </div>
  );
}