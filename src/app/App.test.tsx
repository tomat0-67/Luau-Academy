import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows the welcome page and starter learning paths', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /du premier script/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Commencer à apprendre' })).toBeInTheDocument()
    expect(screen.getByText('Découvrir Luau')).toBeInTheDocument()
  })
})
