import { Tutorial } from '../learning/Tutorial'

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
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Apprends Luau pas à pas avec un parcours hors ligne de 12 leçons, des exemples et des exercices guidés pour Roblox Studio.</p>
        </section>
        <Tutorial />
        <footer className="mt-12 border-t border-slate-800 pt-5 text-sm text-slate-500">Les exemples montrent du code Luau réel. Cette version ne les exécute pas; teste-les dans Roblox Studio sur Windows ou macOS.</footer>
      </div>
    </main>
  )
}
