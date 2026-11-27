type CourseCardProps = { title: string; detail: string; label: string }

export function CourseCard({ title, detail, label }: CourseCardProps) {
  return <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><span className="text-xs font-medium text-sky-300">{label}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p></article>
}
