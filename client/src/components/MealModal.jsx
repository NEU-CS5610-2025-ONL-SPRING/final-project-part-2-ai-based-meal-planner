// File: client/src/components/MealModal.jsx

import React from 'react';

export default function MealModal({ meal, isEditing, setIsEditing, onClose, onSave, onDelete, onChange }) {
  const isReadOnly = !onSave || !onDelete;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        {!isEditing ? (
          <>
            <h3 style={{ marginTop: 0 }}>{meal.name}</h3>
            <p><strong>Description:</strong> {meal.description || 'None'}</p>
            <p><strong>Ingredients:</strong></p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{meal.ingredients}</pre>
            <p><strong>Instructions:</strong></p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{meal.instructions}</pre>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              {!isReadOnly && (
                <>
                  <button onClick={() => setIsEditing(true)} style={buttonStyle('#3b82f6')}>Edit</button>
                  <button onClick={onDelete} style={buttonStyle('#ef4444')}>Delete</button>
                </>
              )}
              <button onClick={onClose} style={buttonStyle('#9ca3af')}>Close</button>
            </div>
          </>
        ) : (
          <>
            <h3>{meal.id ? 'Edit Meal' : 'Create New Meal'}</h3>
            <label>Name:</label>
            <input value={meal.name} onChange={e => onChange({ ...meal, name: e.target.value })} style={inputStyle} />
            <label>Description:</label>
            <textarea value={meal.description} onChange={e => onChange({ ...meal, description: e.target.value })} style={inputStyle} />
            <label>Ingredients:</label>
            <textarea value={meal.ingredients} onChange={e => onChange({ ...meal, ingredients: e.target.value })} style={inputStyle} />
            <label>Instructions:</label>
            <textarea value={meal.instructions} onChange={e => onChange({ ...meal, instructions: e.target.value })} style={inputStyle} />
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={onSave} style={buttonStyle('#10b981')}>Save</button>
              <button onClick={() => setIsEditing(false)} style={buttonStyle('#9ca3af')}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const buttonStyle = (bg) => ({
  background: bg,
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  cursor: 'pointer'
});

const inputStyle = {
  width: '100%',
  marginBottom: '0.5rem'
};
