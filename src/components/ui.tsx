import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'

export type IconName = 'dashboard' | 'book' | 'exercise' | 'code' | 'projects' | 'trophy' | 'profile' | 'settings' | 'menu' | 'close' | 'arrow' | 'clock' | 'spark' | 'chevron' | 'check' | 'sun' | 'moon' | 'monitor' | 'dots'

const iconPaths: Record<IconName, ReactNode> = {
  dashboard: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h7" /></>,
  exercise: <><path d="m8 12 2.5 2.5L16 9" /><circle cx="12" cy="12" r="9" /></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4m-2-11-4 14" /></>,
  projects: <><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" /></>,
  trophy: <><path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" /></>,
  profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" transform="translate(-1 -1)" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  check: <path d="m5 12 4 4L19 6" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
  moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>,
  dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
}

export function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'icon' }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'secondary', size = 'md', className = '', type = 'button', ...props }, ref) {
  return <button ref={ref} className={`button button-${variant} button-${size} ${className}`} type={type} {...props} />
})

export function Card({ as = 'section', children, className = '', ...props }: { as?: 'section' | 'aside' | 'div' | 'article'; children: ReactNode; className?: string } & React.HTMLAttributes<HTMLElement>) {
  const Element = as
  return <Element className={`card ${className}`} {...props}>{children}</Element>
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'violet' | 'blue' | 'green' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const safeValue = Math.min(100, Math.max(0, value))
  return <div className="progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}><span className="progress-fill" style={{ width: `${safeValue}%` }} /></div>
}

export function Field({ label, id, className = '', ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return <label className={`field ${className}`} htmlFor={id}><span className="field-label">{label}</span><input id={id} className="input" {...props} /></label>
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return <span className="tooltip" data-tooltip={label} title={label}>{children}</span>
}

export type Tab = { id: string; label: string }
export function Tabs({ tabs, selected, onSelect, label }: { tabs: Tab[]; selected: string; onSelect: (id: string) => void; label: string }) {
  return <div className="tabs" role="tablist" aria-label={label}>{tabs.map((tab) => <button key={tab.id} id={`tab-${tab.id}`} type="button" role="tab" aria-controls={`panel-${tab.id}`} aria-selected={selected === tab.id} tabIndex={selected === tab.id ? 0 : -1} className={`tab ${selected === tab.id ? 'is-selected' : ''}`} onClick={() => onSelect(tab.id)}>{tab.label}</button>)}</div>
}

export function Dropdown({ label, items, className = '' }: { label: string; items: { label: string; onSelect: () => void; disabled?: boolean }[]; className?: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKeyDown) }
  }, [open])
  return <div className={`dropdown ${className}`} ref={root}>
    <Button aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)}>{label}<Icon name="chevron" size={16} /></Button>
    {open && <div className="dropdown-menu" role="menu">{items.map((item) => <button key={item.label} className="dropdown-item" role="menuitem" type="button" disabled={item.disabled} onClick={() => { setOpen(false); item.onSelect() }}>{item.label}</button>)}</div>}
  </div>
}

export function Modal({ open, title, description, onClose, children }: { open: boolean; title: string; description?: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButton.current?.focus()
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab') return
      const focusable = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), [href], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => { document.removeEventListener('keydown', handleKey); previouslyFocused?.focus() }
  }, [open, onClose])
  if (!open) return null
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div ref={dialog} aria-labelledby="settings-title" aria-describedby={description ? 'settings-description' : undefined} aria-modal="true" className="modal" role="dialog">
      <div className="modal-heading"><div><h2 id="settings-title">{title}</h2>{description && <p id="settings-description">{description}</p>}</div><Button ref={closeButton} aria-label="Fermer" className="icon-button" size="icon" onClick={onClose}><Icon name="close" /></Button></div>
      {children}
    </div>
  </div>
}

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => { const timeout = window.setTimeout(onDismiss, 3600); return () => window.clearTimeout(timeout) }, [onDismiss])
  return <div className="toast" role="status" aria-live="polite"><span className="toast-check"><Icon name="check" size={16} /></span><span>{message}</span><Button aria-label="Fermer la notification" size="icon" variant="ghost" onClick={onDismiss}><Icon name="close" size={16} /></Button></div>
}

export function CodeBlock({ code, label = 'Exemple Luau' }: { code: string; label?: string }) {
  return <div className="code-block"><div className="code-header"><span className="code-mark">&lt;/&gt;</span><span>{label}</span><Badge tone="violet">LUAU</Badge></div><pre><code>{code}</code></pre></div>
}
