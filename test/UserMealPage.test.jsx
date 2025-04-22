// __tests__/UserMealsPage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMealsPage from '../pages/UserMealsPage';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          id: '1',
          name: 'Mocked Meal',
          description: 'A delicious test meal.',
          ingredients: 'Rice, Beans, Spices',
          instructions: 'Mix and cook for 30 minutes.'
        }
      ])
    })
  );
});

test('renders mocked meals correctly', async () => {
  render(<UserMealsPage />);
  expect(await screen.findByText(/mocked meal/i)).toBeInTheDocument();
  expect(await screen.findByText(/a delicious test meal/i)).toBeInTheDocument();
});