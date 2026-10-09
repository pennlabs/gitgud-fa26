import './App.css'

const facts = [
  { label: 'Studies', value: 'Computer Science', note: 'in SEAS' },
  { label: 'From', value: 'Houston, TX', note: '' },
  { label: 'Member since', value: 'Spring 2026', note: '' },
  { label: 'Graduates', value: '2029', note: '' },
]

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="avatar" aria-hidden="true">CM</div>
        <p className="eyebrow">Part of Penn Mobile</p>
        <h1>Cassie Mai</h1>
        <p className="role">Android Mobile Engineer</p>
        <p className="intro">Hi! I'm Cassie. I'm in the Android team.</p>
      </section>

      <section className="facts" aria-label="About Cassie">
        {facts.map((f) => (
          <div className="fact" key={f.label}>
            <span className="fact-label">{f.label}</span>
            <span className="fact-value">{f.value}</span>
            {f.note && <span className="fact-note">{f.note}</span>}
          </div>
        ))}
      </section>

      <footer>Cassie Mai · Penn Mobile · Android</footer>
    </main>
  )
}

export default App
