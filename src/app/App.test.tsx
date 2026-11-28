import { fireEvent, render, screen, within } from '@testing-library/react'
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

  it('filters the lesson list with the labelled search field', () => {
    render(<App />)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Rechercher une leçon' }), { target: { value: 'variables' } })
    const lessonNavigation = screen.getByRole('navigation', { name: 'Leçons du tutoriel' })
    expect(within(lessonNavigation).getByRole('button', { name: /Variables et valeurs/ })).toBeInTheDocument()
    expect(within(lessonNavigation).queryByRole('button', { name: /Préparer son environnement/ })).not.toBeInTheDocument()
  })

  it('opens the dashboard and returns to the available learning path', () => {
    render(<App />)
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Sections' })).getByRole('button', { name: 'Dashboard' }))
    expect(screen.getByRole('heading', { name: 'Ton parcours' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le parcours' }))
    expect(screen.getByRole('heading', { name: 'Préparer son environnement' })).toBeInTheDocument()
  })

  it('saves the selected theme and exposes unavailable sections as non-interactive', () => {
    render(<App />)
    expect(within(screen.getByRole('navigation', { name: 'Sections' })).getByText('Playground').closest('[aria-disabled="true"]')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Playground' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir les paramètres' }))
    fireEvent.click(screen.getByRole('radio', { name: 'Clair' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem('luau-academy.theme')).toBe('light')
    expect(screen.getByRole('status')).toHaveTextContent('Thème clair activé')
  })
})
