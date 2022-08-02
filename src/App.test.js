import React from 'react'
import { render, screen } from '@testing-library/react'
import AppFooter from '../src/components/AppFooter'

test('renders dashboard', () => {
  render(<AppFooter />)
  const productName = screen.getByText(/Zainab-Fahim/i)
  expect(productName).toBeInTheDocument()
})
