import { useCallback, useEffect, useState } from 'react'
import { Tutorial } from '../learning/Tutorial'
import { Badge, Button, Card, Dropdown, Icon, Modal, Tabs, Toast, Tooltip, type IconName } from '../components/ui'
import { tutorialCourse } from '../learning/course'

type Page = 'dashboard' | 'learn'
type Theme = 'dark' | 'light'
type SettingsTab = 'appearance' | 'accessibility'

const navItems: { id: Page | 'exercises' | 'playground' | 'projects' | 'achievements' | 'profile'; label: string; icon: IconName; available: boolean }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', available: true },
  { id: 'learn', label: 'Apprendre', icon: 'book', available: true },
  { id: 'exercises', label: 'Exercices', icon: 'exercise', available: false },
  { id: 'playground', label: 'Playground', icon: 'code', available: false },
  { id: 'projects', label: 'Projets', icon: 'projects', available: false },
  { id: 'achievements', label: 'Succès', icon: 'trophy', available: false },
  { id: 'profile', label: 'Profil', icon: 'profile', available: false },
]
const mobilePrimaryIds = new Set(['dashboard', 'learn', 'exercises', 'projects'])
const mobileNavItems = navItems.filter((item) => mobilePrimaryIds.has(item.id))
const mobileMoreItems = navItems.filter((item) => !mobilePrimaryIds.has(item.id))

function readPreference(key: string, fallback: string) {
  try { return window.localStorage.getItem(key) ?? fallback } catch { return fallback }
}

function Dashboard({ onLearn }: { onLearn: () => void }) {
  return <div className="dashboard-page">
    <section className="welcome-panel">
      <div className="welcome-copy">
        <Badge tone="violet"><Icon name="spark" size={14} /> TON ESPACE D’APPRENTISSAGE</Badge>
        <h1>Construis tes premières expériences en Luau.</h1>
        <p>Un parcours guidé, des exemples concrets et des exercices à réaliser dans Roblox Studio.</p>
        <Button variant="primary" onClick={onLearn}>Ouvrir le parcours <Icon name="arrow" size={18} /></Button>
      </div>
      <div className="welcome-art" aria-hidden="true">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <div className="art-code-card"><span className="art-dot" /><span className="art-dot" /><span className="art-dot" /><code><b>local</b> game = <i>"ton idée"</i><br /><b>print</b>(game)</code></div>
        <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span>
      </div>
    </section>

    <div className="section-heading"><div><span className="eyebrow">POUR COMMENCER</span><h2>Ton parcours</h2></div><Badge tone="green">Disponible hors ligne</Badge></div>
    <Card className="course-overview">
      <div className="course-symbol"><Icon name="code" size={25} /></div>
      <div className="course-overview-copy"><div className="course-meta"><Badge tone="blue">{tutorialCourse.level}</Badge><span><Icon name="clock" size={15} /> {tutorialCourse.estimatedMinutes} min</span></div><h3>{tutorialCourse.title}</h3><p>{tutorialCourse.description}</p><div className="course-facts"><span><Icon name="book" size={15} /> {tutorialCourse.lessons.length} leçons</span><span><Icon name="exercise" size={15} /> Exercices guidés</span></div></div>
      <Button className="course-open" onClick={onLearn}>Continuer <Icon name="arrow" size={18} /></Button>
    </Card>

    <div className="section-heading section-heading-note"><div><span className="eyebrow">DANS CETTE VERSION</span><h2>Apprendre à son rythme</h2></div></div>
    <div className="feature-grid">
      <Card className="feature-card"><span className="feature-icon violet-icon"><Icon name="book" /></span><h3>Un cours structuré</h3><p>Les leçons couvrent les bases de Luau et des scripts Roblox, étape par étape.</p></Card>
      <Card className="feature-card"><span className="feature-icon blue-icon"><Icon name="monitor" /></span><h3>Tester dans Studio</h3><p>Les exemples sont à copier dans Roblox Studio. L’application n’exécute pas encore le code.</p></Card>
      <Card className="feature-card"><span className="feature-icon green-icon"><Icon name="check" /></span><h3>Suivi local</h3><p>Les leçons terminées sont mémorisées sur cet appareil, sans compte requis.</p></Card>
    </div>
  </div>
}

function Settings({ theme, setTheme, reducedMotion, setReducedMotion, tab, setTab }: {
  theme: Theme; setTheme: (theme: Theme) => void; reducedMotion: boolean; setReducedMotion: (value: boolean) => void; tab: SettingsTab; setTab: (tab: SettingsTab) => void
}) {
  return <>
    <Tabs label="Catégories des paramètres" selected={tab} onSelect={(value) => setTab(value as SettingsTab)} tabs={[{ id: 'appearance', label: 'Apparence' }, { id: 'accessibility', label: 'Accessibilité' }]} />
    {tab === 'appearance' ? <section className="settings-section" id="panel-appearance" role="tabpanel" aria-labelledby="tab-appearance" tabIndex={0}><div><h3 id="theme-heading">Thème</h3><p>Choisis les couleurs de l’interface.</p></div><div className="theme-options" role="radiogroup" aria-label="Thème de l’application">
      {([['dark', 'Sombre', 'moon'], ['light', 'Clair', 'sun']] as const).map(([value, label, icon]) => <button key={value} type="button" role="radio" aria-checked={theme === value} className={`theme-option ${theme === value ? 'is-selected' : ''}`} onClick={() => setTheme(value)}><Icon name={icon} /><span>{label}</span>{theme === value && <Icon className="theme-check" name="check" size={17} />}</button>)}
    </div></section> : <section className="settings-section" id="panel-accessibility" role="tabpanel" aria-labelledby="tab-accessibility" tabIndex={0}><div><h3 id="motion-heading">Animations</h3><p>Réduis les transitions et mouvements dans l’interface.</p></div><label className="switch-row"><span>Réduire les animations</span><input checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} type="checkbox" /><span className="switch-track" aria-hidden="true" /></label></section>}
    <p className="settings-note">Les préférences sont enregistrées localement sur cet appareil.</p>
  </>
}

export default function App() {
  const [page, setPage] = useState<Page>('learn')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('appearance')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setThemeState] = useState<Theme>(() => readPreference('luau-academy.theme', 'dark') === 'light' ? 'light' : 'dark')
  const [reducedMotion, setReducedMotionState] = useState(() => readPreference('luau-academy.reduced-motion', 'false') === 'true')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.reducedMotion = String(reducedMotion)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0c10' : '#f4f5f9')
  }, [theme, reducedMotion])

  const setTheme = useCallback((value: Theme) => {
    setThemeState(value)
    try { window.localStorage.setItem('luau-academy.theme', value) } catch { /* The current session still uses the selected theme. */ }
    setToastMessage(value === 'dark' ? 'Thème sombre activé' : 'Thème clair activé')
  }, [])

  const setMotion = useCallback((value: boolean) => {
    setReducedMotionState(value)
    try { window.localStorage.setItem('luau-academy.reduced-motion', String(value)) } catch { /* The current session still uses the selected preference. */ }
    setToastMessage(value ? 'Animations réduites' : 'Animations réactivées')
  }, [])

  const closeSettings = useCallback(() => setSettingsOpen(false), [])
  const openSettings = useCallback(() => { setSettingsTab('appearance'); setSettingsOpen(true); setMobileMenuOpen(false) }, [])
  const goTo = useCallback((target: Page) => { setPage(target); setMobileMenuOpen(false); if (reducedMotion) window.scrollTo(0, 0); else window.scrollTo({ top: 0, behavior: 'smooth' }) }, [reducedMotion])

  const dropdownItems = [
    { label: 'Paramètres', onSelect: openSettings },
  ]

  return <div className="app-shell" data-theme={theme} data-reduced-motion={reducedMotion}>
    <aside className="sidebar" aria-label="Navigation principale">
      <a className="brand" href="#accueil" onClick={(event) => { event.preventDefault(); goTo('dashboard') }}>
        <span className="brand-mark"><span>L</span><i /></span>
        <span className="brand-copy"><strong>Luau Academy</strong><small>APPRENDRE EN CONSTRUISANT</small></span>
      </a>
      <div className="sidebar-label">MENU</div>
      <nav className="side-nav" aria-label="Sections">
        {navItems.map((item) => item.available ? <button key={item.id} className={`nav-item ${page === item.id ? 'is-active' : ''}`} type="button" aria-current={page === item.id ? 'page' : undefined} onClick={() => goTo(item.id as Page)}><Icon name={item.icon} /><span>{item.label}</span>{page === item.id && <span className="nav-active-dot" />}</button> : <Tooltip key={item.id} label="Cette section n’est pas encore disponible"><span className="nav-item nav-unavailable" role="note" tabIndex={0} aria-disabled="true" aria-label={`${item.label}, à venir`}><Icon name={item.icon} /><span>{item.label}</span><span className="nav-soon">À venir</span></span></Tooltip>)}
      </nav>
      <div className="sidebar-spacer" />
      <Card className="sidebar-tip"><div className="tip-mark"><Icon name="spark" size={16} /></div><strong>Petit conseil</strong><p>Pratique chaque notion dans Roblox Studio pour mieux la retenir.</p></Card>
      <Button className="settings-nav" variant="ghost" onClick={openSettings}><Icon name="settings" /><span>Paramètres</span></Button>
      <div className="sidebar-footer"><span className="online-dot" /> Cours disponibles hors ligne</div>
    </aside>

    <main className="main-area">
      <header className="topbar"><div className="breadcrumbs"><span>Luau Academy</span><Icon name="chevron" size={14} className="crumb-chevron" /><strong>{page === 'learn' ? 'Apprendre' : 'Dashboard'}</strong></div><div className="topbar-actions"><Tooltip label="Préférences de l’application"><Button className="icon-button top-settings" aria-label="Ouvrir les paramètres" size="icon" variant="ghost" onClick={openSettings}><Icon name="settings" /></Button></Tooltip><Dropdown label="Session locale" items={dropdownItems} /></div></header>
      <div className="page-content" key={page}>{page === 'learn' ? <Tutorial /> : <Dashboard onLearn={() => goTo('learn')} />}</div>
    </main>

    <nav className="mobile-nav" aria-label="Navigation mobile">
      {mobileNavItems.map((item) => item.available ? <button key={item.id} className={`mobile-nav-item ${page === item.id ? 'is-active' : ''}`} type="button" aria-current={page === item.id ? 'page' : undefined} onClick={() => goTo(item.id as Page)}><Icon name={item.icon} size={19} /><span>{item.label}</span></button> : <Tooltip key={item.id} label="Cette section n’est pas encore disponible"><span className="mobile-nav-item nav-unavailable" role="note" tabIndex={0} aria-disabled="true" aria-label={`${item.label}, à venir`}><Icon name={item.icon} size={19} /><span>{item.label}</span></span></Tooltip>)}
      <div className="mobile-more"><Button className={`mobile-nav-item ${mobileMenuOpen ? 'is-active' : ''}`} size="md" variant="ghost" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((value) => !value)}><Icon name="dots" size={19} /><span>Plus</span></Button>{mobileMenuOpen && <div className="mobile-more-menu" role="menu"><div className="mobile-more-heading">Autres sections</div>{mobileMoreItems.map((item) => <div className="mobile-more-disabled" key={item.id}><Icon name={item.icon} size={17} /><span>{item.label}</span><span>À venir</span></div>)}<button className="mobile-more-action" type="button" role="menuitem" onClick={openSettings}><Icon name="settings" size={17} />Paramètres</button></div>}</div>
    </nav>

    <Modal open={settingsOpen} onClose={closeSettings} title="Paramètres" description="Personnalise l’apparence et le confort de lecture.">
      <Settings theme={theme} setTheme={setTheme} reducedMotion={reducedMotion} setReducedMotion={setMotion} tab={settingsTab} setTab={setSettingsTab} />
    </Modal>
    {toastMessage && <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />}
  </div>
}
