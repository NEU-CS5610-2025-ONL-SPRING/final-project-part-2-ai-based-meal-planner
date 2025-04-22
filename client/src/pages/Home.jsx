// File: client/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🍽️ AI Weekly Meal Planner</h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Plan your meals effortlessly with AI-generated ideas and personalized scheduling.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/login" style={linkButtonStyle('#3b82f6')}>Login</Link>
        <Link to="/register" style={linkButtonStyle('#10b981')}>Register</Link>
      </div>
    </div>
  );
}

const linkButtonStyle = (bgColor) => ({
  background: bgColor,
  color: 'white',
  padding: '0.5rem 1.25rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold'
});