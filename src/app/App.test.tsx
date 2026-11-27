import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => window.localStorage.clear())

  it('shows the first lesson of the Luau tutorial', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /du premier script/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Préparer son environnement' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Leçons du tutoriel' })).toBeInTheDocument()
    expect(screen.getByText('12 leçons · environ 150 minutes')).toBeInTheDocument()
  })

  it('navigates lessons, reveals practice solutions, and stores completion locally', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Afficher une proposition' }))
    expect(screen.getByText(/Remplace Alex par ton prénom/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Suivant' }))
    expect(screen.getByRole('heading', { name: 'Variables et valeurs' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Marquer comme terminée' }))
    expect(JSON.parse(window.localStorage.getItem('luau-academy.completed.luau-fondamentaux') ?? '[]')).toContain('variables-et-valeurs')
  })
})
