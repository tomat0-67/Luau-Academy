import { CourseCard } from '../components/CourseCard'

const starterCourses = [
  { title: 'Découvrir Luau', detail: 'Syntaxe, variables et premières instructions', label: 'Débutant' },
  { title: 'Créer avec Roblox', detail: 'Comprendre les objets et les scripts Roblox', label: 'Parcours' },
  { title: 'Logique et fonctions', detail: 'Décomposer un problème en petites étapes', label: 'À venir' },
]

export default function App() {
  return (
    <main className="min-h-screen px-5 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center gap-3">
          <div aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-violet-500/15 font-bold text-violet-300">L</div>
          <div><p className="text-sm font-semibold tracking-wide">LUAU ACADEMY</p><p className="text-xs text-slate-500">Apprendre en construisant</p></div>
        </header>
        <section className="mt-16 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">Votre espace d’apprentissage</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Du premier script à votre prochain jeu Roblox.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Luau Academy est en cours de construction. Cette base lance l’application et accueillera les cours, exercices et outils de programmation.</p>
        </section>
        <section aria-labelledby="courses-title" className="mt-16">
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-sm text-slate-500">PARCOURS</p><h2 id="courses-title" className="mt-1 text-2xl font-semibold">Commencer à apprendre</h2></div><span className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400">Fondation de l’application</span></div>
          <div className="grid gap-4 md:grid-cols-3">{starterCourses.map((course) => <CourseCard key={course.title} {...course} />)}</div>
        </section>
        <footer className="mt-16 border-t border-slate-800 pt-5 text-sm text-slate-500">Base de développement · Les fonctionnalités d’apprentissage seront livrées par phases.</footer>
      </div>
    </main>
  )
}
