import { useState } from 'react'
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
  const lesson = tutorialCourse.lessons[activeIndex]
  const isCompleted = completedLessons.includes(lesson.id)
  const completionPercent = Math.round((completedLessons.length / tutorialCourse.lessons.length) * 100)

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

  return (
    <section aria-label="Tutoriel Luau" className="mt-12">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">Tutoriel guidé · {tutorialCourse.level}</p>
          <h2 className="mt-2 text-2xl font-semibold">{tutorialCourse.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{tutorialCourse.description}</p>
        </div>
        <p className="shrink-0 text-sm text-slate-400">12 leçons · environ {tutorialCourse.estimatedMinutes} minutes</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
            <span>Progression</span><span>{completedLessons.length}/{tutorialCourse.lessons.length}</span>
          </div>
          <div
            aria-label={`Progression du tutoriel : ${completionPercent}%`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={completionPercent}
            className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
          >
            <div className="h-full rounded-full bg-violet-400 transition-all" style={{ width: `${completionPercent}%` }} />
          </div>
          <nav aria-label="Leçons du tutoriel" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {tutorialCourse.lessons.map((item, index) => {
              const selected = index === activeIndex
              const done = completedLessons.includes(item.id)
              return (
                <button
                  key={item.id}
                  aria-current={selected ? 'step' : undefined}
                  className={`flex min-w-52 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition lg:min-w-0 ${selected ? 'bg-violet-500/15 text-violet-100 ring-1 ring-violet-400/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  onClick={() => selectLesson(index)}
                  type="button"
                >
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs ${done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                    {done ? '✓' : index + 1}
                  </span>
                  <span>{item.title}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        <article aria-labelledby="lesson-title" className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-sky-300">Leçon {activeIndex + 1} / {tutorialCourse.lessons.length}</span>
            {isCompleted && <span className="text-xs font-medium text-emerald-300">Leçon terminée</span>}
          </div>
          <h3 id="lesson-title" className="mt-3 text-2xl font-semibold">{lesson.title}</h3>
          <p className="mt-2 text-sm text-violet-200">Objectif : {lesson.objective}</p>

          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            {lesson.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {lesson.steps && (
            <section aria-label="Étapes pratiques" className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <h4 className="font-semibold">À faire dans Roblox Studio</h4>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
                {lesson.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </section>
          )}

          <section className="mt-6" aria-label="Exemple Luau">
            <h4 className="mb-2 text-sm font-semibold text-slate-200">Exemple Luau</h4>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-[#07070c] p-4 text-xs leading-6 text-sky-100 sm:text-sm"><code>{lesson.code}</code></pre>
          </section>

          <section className="mt-6 rounded-xl border border-violet-400/20 bg-violet-500/5 p-5">
            <h4 className="font-semibold">À toi d’essayer</h4>
            <p className="mt-2 text-sm leading-6 text-slate-300">{lesson.exercise}</p>
            <button
              aria-expanded={showSolution}
              className="mt-4 rounded-lg border border-violet-400/30 px-3 py-2 text-sm text-violet-200 hover:bg-violet-400/10"
              onClick={() => setShowSolution((visible) => !visible)}
              type="button"
            >
              {showSolution ? 'Masquer une proposition' : 'Afficher une proposition'}
            </button>
            {showSolution && <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-emerald-100 sm:text-sm"><code>{lesson.solution}</code></pre>}
          </section>

          {lesson.nextSteps && <p className="mt-6 rounded-xl border border-slate-800 p-4 text-sm leading-6 text-slate-400"><strong className="text-slate-200">Pour continuer : </strong>{lesson.nextSteps}</p>}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5">
            <button
              className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={activeIndex === 0}
              onClick={() => selectLesson(activeIndex - 1)}
              type="button"
            >Précédent</button>
            <div className="flex gap-3">
              <button
                aria-pressed={isCompleted}
                className="rounded-lg border border-emerald-400/30 px-4 py-2.5 text-sm text-emerald-200 hover:bg-emerald-400/10"
                onClick={toggleCompleted}
                type="button"
              >{isCompleted ? 'Annuler la validation' : 'Marquer comme terminée'}</button>
              <button
                className="rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={activeIndex === tutorialCourse.lessons.length - 1}
                onClick={() => selectLesson(activeIndex + 1)}
                type="button"
              >Suivant</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
