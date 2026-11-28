import { useMemo, useState } from 'react'
import { Badge, Button, Card, CodeBlock, Field, Icon, ProgressBar } from '../components/ui'
import { tutorialCourse } from './course'

const storageKey = `luau-academy.completed.${tutorialCourse.id}`
const lessonIds = new Set(tutorialCourse.lessons.map((lesson) => lesson.id))

function readCompletedLessons(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
    return Array.isArray(value)
      ? [...new Set(value.filter((entry): entry is string => typeof entry === 'string' && lessonIds.has(entry)))]
      : []
  } catch {
    return []
  }
}

export function Tutorial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>(readCompletedLessons)
  const [showSolution, setShowSolution] = useState(false)
  const [query, setQuery] = useState('')
  const lesson = tutorialCourse.lessons[activeIndex]
  const isCompleted = completedLessons.includes(lesson.id)
  const completionPercent = Math.round((completedLessons.length / tutorialCourse.lessons.length) * 100)
  const filteredLessons = useMemo(() => tutorialCourse.lessons.map((item, index) => ({ item, index })).filter(({ item }) => item.title.toLocaleLowerCase('fr').includes(query.trim().toLocaleLowerCase('fr'))), [query])

  function selectLesson(index: number) {
    setActiveIndex(index)
    setShowSolution(false)
  }

  function toggleCompleted() {
    const next = isCompleted
      ? completedLessons.filter((lessonId) => lessonId !== lesson.id)
      : [...completedLessons, lesson.id]
    setCompletedLessons(next)
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      // The lesson still works if the webview blocks local storage.
    }
  }

  return <section aria-label="Tutoriel Luau" className="tutorial-page">
    <header className="learn-heading">
      <div><span className="eyebrow">PARCOURS GUIDÉ · {tutorialCourse.level.toLocaleUpperCase('fr')}</span><h1>Du premier script à votre prochain jeu Roblox.</h1><p>Apprends les bases de Luau en construisant, une étape à la fois.</p></div>
      <Badge tone="green"><span className="online-dot" /> Disponible hors ligne</Badge>
    </header>

    <div className="tutorial-title-row"><div><h2>{tutorialCourse.title}</h2><p>{tutorialCourse.description}</p></div><div className="tutorial-duration"><Icon name="clock" size={16} /><span>{tutorialCourse.lessons.length} leçons · environ {tutorialCourse.estimatedMinutes} minutes</span></div></div>

    <div className="tutorial-layout">
      <Card as="aside" className="lesson-sidebar" aria-label="Navigation du cours">
        <div className="lesson-progress-head"><div><span className="eyebrow">TA PROGRESSION</span><strong>{completedLessons.length}<span>/{tutorialCourse.lessons.length}</span></strong></div><span className="progress-percent">{completionPercent}%</span></div>
        <ProgressBar label={`Progression du tutoriel : ${completionPercent}%`} value={completionPercent} />
        <Field id="lesson-search" label="Rechercher une leçon" className="lesson-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. variables" />
        <nav aria-label="Leçons du tutoriel" className="lesson-list">
          {filteredLessons.map(({ item, index }) => {
            const selected = index === activeIndex
            const done = completedLessons.includes(item.id)
            return <button key={item.id} aria-current={selected ? 'step' : undefined} className={`lesson-link ${selected ? 'is-current' : ''}`} onClick={() => selectLesson(index)} type="button">
              <span className={`lesson-number ${done ? 'is-done' : ''}`}>{done ? <Icon name="check" size={14} /> : String(index + 1).padStart(2, '0')}</span><span className="lesson-link-title">{item.title}</span><Icon className="lesson-chevron" name="chevron" size={15} />
            </button>
          })}
          {filteredLessons.length === 0 && <p className="empty-filter">Aucune leçon ne correspond à cette recherche.</p>}
        </nav>
        <div className="sidebar-course-note"><span className="course-note-icon"><Icon name="spark" size={15} /></span><p>Avance à ton rythme. Ta progression reste sur cet appareil.</p></div>
      </Card>

      <article aria-labelledby="lesson-title" className="lesson-article">
        <div className="lesson-topline"><Badge tone="blue">LEÇON {String(activeIndex + 1).padStart(2, '0')} <span>/ {String(tutorialCourse.lessons.length).padStart(2, '0')}</span></Badge>{isCompleted && <Badge tone="green"><Icon name="check" size={13} /> Terminée</Badge>}</div>
        <h2 id="lesson-title">{lesson.title}</h2>
        <p className="lesson-objective"><Icon name="spark" size={16} /> {lesson.objective}</p>

        <div className="lesson-body">
          <div className="lesson-explanation">{lesson.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {lesson.steps && <section className="lesson-steps" aria-label="Étapes pratiques"><h3><span className="step-icon"><Icon name="projects" size={17} /></span>À faire dans Roblox Studio</h3><ol>{lesson.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>}
          <CodeBlock code={lesson.code} />
          <section className="exercise-panel" aria-label="Exercice de la leçon"><div className="exercise-heading"><span className="exercise-icon"><Icon name="exercise" /></span><div><span className="eyebrow">À TOI D’ESSAYER</span><h3>Petit exercice</h3></div></div><p>{lesson.exercise}</p><Button variant="secondary" size="sm" aria-expanded={showSolution} onClick={() => setShowSolution((visible) => !visible)}>{showSolution ? 'Masquer une proposition' : 'Afficher une proposition'}</Button>{showSolution && <CodeBlock code={lesson.solution} label="Proposition de correction" />}</section>
          {lesson.nextSteps && <p className="lesson-next"><strong>Pour continuer</strong><span>{lesson.nextSteps}</span></p>}
        </div>

        <footer className="lesson-actions"><Button disabled={activeIndex === 0} onClick={() => selectLesson(activeIndex - 1)}><span className="previous-arrow">←</span> Précédent</Button><div className="lesson-actions-end"><Button variant={isCompleted ? 'secondary' : 'ghost'} aria-pressed={isCompleted} onClick={toggleCompleted}>{isCompleted ? <><Icon name="check" size={17} /> Terminée</> : 'Marquer comme terminée'}</Button><Button variant="primary" disabled={activeIndex === tutorialCourse.lessons.length - 1} onClick={() => selectLesson(activeIndex + 1)}>Suivant <Icon name="arrow" size={17} /></Button></div></footer>
      </article>
    </div>
    <p className="learning-disclaimer">Les exemples Luau sont à tester dans Roblox Studio. Cette version de Luau Academy n’exécute pas encore le code.</p>
  </section>
}
