import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders dashboard', () => {
  render(<App />)
  const h1Element = screen.getByText(/Hello/i)
  expect(h1Element).toBeInTheDocument()
})
