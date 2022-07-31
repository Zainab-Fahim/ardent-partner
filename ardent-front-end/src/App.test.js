import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders dashboard', () => {
  render(<App />)
  const h1Element = screen.getByText(/Welcome to EasyAsPie Dashboard/i)
  expect(h1Element).toBeInTheDocument()
})
