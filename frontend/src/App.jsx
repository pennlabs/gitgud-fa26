import { useEffect, useRef, useState } from 'react'
import './App.css'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const DIGITS = '0123456789'.split('')
const NAME = 'CASSIE MAI'.split('')
const SCORE = '1580'.split('')

const passage = [
  'Cassie Mai is a student at the University of Pennsylvania',
  'who wakes up every morning and chooses excellence. She',
  'thinks in frameworks, dreams in bullet points, and holds',
  'strong opinions about which dining hall is actually good.',
  'She has claimed the best seat on the third floor of Van',
  'Pelt Library and defended it against all comers. She is',
  'humbled and honored to share that she is thrilled to keep',
  'growing. She was also valedictorian. She also scored a',
  '1580 on the SAT. She would like you to know that she does',
  'not bring this up very often, which is itself a lie.',
]

const readingQs = [
  {
    q: 'The author mentions Van Pelt Library (lines 5–6) primarily to',
    options: [
      'establish the setting.',
      'describe a hostile takeover.',
      'build suspense before the 1580.',
      'pad the word count.',
    ],
    answer: 2,
  },
  {
    q: 'As used in line 7, “humbled” most nearly means',
    options: ['modest.', 'grateful.', 'about to mention her SAT score.', 'quiet.'],
    answer: 2,
  },
  {
    q: 'Which choice provides the best evidence for the answer to the previous question?',
    options: ['Lines 1–2', 'Lines 5–6', 'Lines 8–9', 'The entire website you are on'],
    answer: 3,
  },
]

const resume = [
  ['Fall 2026', 'Chief Vibes Officer', 'The Quad (unofficially)', 'Raised hallway morale 340%, mostly by telling the hallway about her 1580.'],
  ['Summer 2026', 'Senior Spreadsheet Whisperer', 'Some Very Important Company', 'Put “1580 SAT” in her email signature. A VP cried.'],
  ['Spring 2026', 'Founder & CEO', 'Van Pelt, 3rd floor, corner seat', 'Defended the seat by reciting her valedictorian speech at intruders.'],
  ['High school', 'Valedictorian', 'High School', 'Speech was 40% gratitude, 60% SAT score.'],
]

const mathQ = {
  q: 'Using the table above, if c = 1580 and v = valedictorian, what is c + v?',
  options: ['1581', 'undefined', 'a LinkedIn post', 'insufferable'],
  answer: 2,
}

const skills = [
  ['Scoring 1580 on the SAT', true],
  ['Being valedictorian', true],
  ['Excel wizardry', true],
  ['Wawa route optimization', true],
  ['Surviving 8am recitations', true],
  ['Thought leadership', false],
  ['Saying “let’s take this offline”', true],
  ['Not mentioning the 1580', false],
]

const essay = [
  ['Cassie is the reason I passed CIS 1200.', 'a grateful classmate'],
  ['Did you know she got a 1580?', 'Cassie'],
  ['Valedictorian, btw.', 'also Cassie'],
  ['Quack (1580).', 'the Quaker'],
]

const notes = [
  'psst. she got a 1580.',
  'did u know she was valedictorian',
  'pass this on: 1580',
  'she told me to give you this. it says 1580.',
  'VALEDICTORIAN (fold & pass)',
]

const wrongNotes = [
  'Nope. Corrected.',
  'Incorrect. See: 1580.',
  'Wrong. A valedictorian would know.',
  'We fixed that for you.',
]

const stampTexts = ['1580', 'VALEDICTORIAN', 'VERIFIED · 1580', 'CLASS RANK #1']

const titles = ['Cassie Mai · 1580', 'VALEDICTORIAN', '1580 1580 1580', 'pencils down (1580)']

function Bubble({ label, filled, onClick, small }) {
  const cls = `bubble${filled ? ' is-filled' : ''}${small ? ' is-small' : ''}`
  if (!onClick) return <span className={cls}>{label}</span>
  return (
    <button className={cls} onClick={onClick} aria-pressed={filled} aria-label={`Option ${label}`}>
      {label}
    </button>
  )
}

function Field({ n, title, children, className = '' }) {
  return (
    <div className={`field ${className}`}>
      <div className="field-head">
        <span className="field-n">{n}</span> {title}
      </div>
      <div className="field-body">{children}</div>
    </div>
  )
}

function Question({ n, q, options, answer }) {
  const [picked, setPicked] = useState(null)
  const [note, setNote] = useState('')
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const pick = (i) => {
    clearTimeout(timer.current)
    setPicked(i)
    if (i === answer) {
      setNote('Correct. Obviously.')
      return
    }
    setNote('')
    timer.current = setTimeout(() => {
      setPicked(answer)
      setNote(wrongNotes[Math.floor(Math.random() * wrongNotes.length)])
    }, 550)
  }

  return (
    <div className="question">
      <p className="q-text">
        <span className="q-n">{n}</span>
        {q}
      </p>
      <ol className="options">
        {options.map((o, i) => (
          <li key={o}>
            <Bubble label={'ABCD'[i]} filled={picked === i} onClick={() => pick(i)} />
            <span>{o}</span>
          </li>
        ))}
      </ol>
      {note && <p className="red-pen">{note}</p>}
    </div>
  )
}

function Section({ n, title, time, children }) {
  return (
    <section className="section">
      <header className="section-head">
        <span className="section-n">{n}</span>
        <h2>{title}</h2>
        <span className="section-time">{time}</span>
      </header>
      {children}
    </section>
  )
}

function ProctorBar() {
  const [secs, setSecs] = useState(1580)
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s <= 0 ? 1580 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return (
    <div className="proctor">
      <span className="proctor-dot" /> PROCTOR
      <span className="proctor-sep">/</span>
      time remaining <b>{mm}:{ss}</b>
      <span className="proctor-sep">/</span>
      <span className="proctor-hint">click anywhere to certify</span>
    </div>
  )
}

function PassedNote() {
  const [open, setOpen] = useState(false)
  const [i, setI] = useState(0)
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setOpen(true), i === 0 ? 4000 : 16000)
    return () => clearTimeout(t)
  }, [open, i])
  if (!open) return null
  return (
    <aside className="passed-note" key={i}>
      <p>{notes[i % notes.length]}</p>
      <button
        onClick={() => {
          setOpen(false)
          setI((x) => x + 1)
        }}
      >
        fold it up
      </button>
    </aside>
  )
}

function useStamps() {
  const [stamps, setStamps] = useState([])
  const id = useRef(0)
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest('button, a')) return
      const s = {
        id: id.current++,
        x: e.pageX,
        y: e.pageY,
        rot: Math.round(Math.random() * 36 - 18),
        text: stampTexts[Math.floor(Math.random() * stampTexts.length)],
      }
      setStamps((all) => [...all.slice(-40), s])
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])
  return stamps
}

function App() {
  const stamps = useStamps()
  const [regrades, setRegrades] = useState(0)

  useEffect(() => {
    let i = 0
    const t = setInterval(() => (document.title = titles[i++ % titles.length]), 1500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="desk">
      <ProctorBar />

      <main className="sheet">
        <div className="coffee-ring" aria-hidden="true" />

        <div className="masthead">
          <div>
            <p className="tiny">University of Pennsylvania · Form 1580‑V · Side 1</p>
            <h1>Cassie Mai</h1>
            <p className="tiny">Use a No. 2 pencil only. Do not fold. She got a 1580.</p>
          </div>
          <div className="serial">
            <div className="barcode" aria-hidden="true" />
            <span>No. 0001580</span>
          </div>
        </div>

        <div className="directions">
          <p>
            <b>DIRECTIONS</b> Fill each bubble completely. Make no stray marks. Every answer is,
            in some sense, 1580.
          </p>
          <div className="marks">
            <span className="marks-label">Correct</span>
            <Bubble label="" filled small />
            <span className="marks-label">Incorrect</span>
            <span className="bubble is-small is-x" />
            <span className="bubble is-small is-check" />
            <span className="bubble is-small is-dot" />
          </div>
        </div>

        <div className="fields">
          <Field n="1" title="Your name" className="field-name">
            <div className="grid">
              {NAME.map((ch, c) => (
                <div className="col" key={c}>
                  <span className="write-in">{ch.trim()}</span>
                  {LETTERS.map((l) => (
                    <Bubble key={l} label={l} filled={l === ch} small />
                  ))}
                </div>
              ))}
            </div>
          </Field>

          <div className="fields-stack">
            <Field n="2" title="SAT score">
              <div className="grid">
                {SCORE.map((d, c) => (
                  <div className="col" key={c}>
                    <span className="write-in">{d}</span>
                    {DIGITS.map((x) => (
                      <Bubble key={x} label={x} filled={x === d} small />
                    ))}
                  </div>
                ))}
              </div>
            </Field>

            <Field n="3" title="Class rank">
              <ul className="checks">
                {['Top 10%', 'Salutatorian', 'Valedictorian', 'Other'].map((r) => (
                  <li key={r} className={r === 'Valedictorian' ? 'is-on' : undefined}>
                    <span className="box" /> {r}
                  </li>
                ))}
              </ul>
            </Field>

            <Field n="4" title="School">
              <p className="write-line">University of Pennsylvania</p>
              <p className="write-line small">major: undecided between everything</p>
            </Field>
          </div>
        </div>

        <Section n="1" title="Reading — About the Candidate" time="25 MIN">
          <p className="prompt">Questions 1–3 are based on the following passage.</p>
          <div className="passage">
            {passage.map((line, i) => (
              <p key={i}>
                <span className="line-n">{(i + 1) % 5 === 0 ? i + 1 : ''}</span>
                {line}
              </p>
            ))}
          </div>
          {readingQs.map((q, i) => (
            <Question key={i} n={i + 1} {...q} />
          ))}
        </Section>

        <Section n="2" title="Data Analysis — Experience" time="1580 SEC">
          <p className="prompt">Question 4 refers to the following table.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Role</th>
                  <th>Org</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {resume.map(([when, role, org, note]) => (
                  <tr key={role}>
                    <td>{when}</td>
                    <td>
                      <b>{role}</b>
                    </td>
                    <td>{org}</td>
                    <td>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Question n={4} {...mathQ} />
        </Section>

        <Section n="3" title="Skills — Mark all that apply" time="∞">
          <ul className="checks checks-wide">
            {skills.map(([s, on]) => (
              <li key={s} className={on ? 'is-on' : 'is-crossed'}>
                <span className="box" /> {s}
              </li>
            ))}
          </ul>
        </Section>

        <Section n="4" title="Essay (optional) — References" time="OPTIONAL">
          <div className="lined">
            {essay.map(([quote, who]) => (
              <p key={quote}>
                “{quote}” <span className="attrib">— {who}</span>
              </p>
            ))}
          </div>
        </Section>

        <section className="report">
          <p className="tiny">Official-ish score report</p>
          <div className="score">
            <span className="score-big">1580</span>
            <span className="score-of">/ 1600</span>
            <span className="stamp report-stamp">Valedictorian</span>
          </div>
          <dl className="breakdown">
            <div>
              <dt>Reading & Writing</dt>
              <dd>790</dd>
            </div>
            <div>
              <dt>Math</dt>
              <dd>790</dd>
            </div>
            <div>
              <dt>Times mentioned today</dt>
              <dd>14</dd>
            </div>
          </dl>
          <div className="percentile" aria-label="99th percentile">
            {Array.from({ length: 100 }, (_, i) => (
              <span key={i} className={i === 99 ? 'is-her' : undefined} />
            ))}
          </div>
          <p className="percentile-label">
            99th+ percentile <span>← she is here</span>
          </p>
          <button className="regrade" onClick={() => setRegrades((r) => r + 1)}>
            Request regrade
          </button>
          {regrades > 0 && (
            <p className="red-pen">
              Regrade #{regrades}: still 1580.{regrades > 3 && ' Please stop.'}
            </p>
          )}
        </section>

        <footer className="footer">
          Every claim on this form is made up. Except the 1580. And valedictorian.
        </footer>
      </main>

      <PassedNote />

      <div className="stamps" aria-hidden="true">
        {stamps.map((s) => (
          <span
            key={s.id}
            className="stamp"
            style={{ left: s.x, top: s.y, '--rot': `${s.rot}deg` }}
          >
            {s.text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default App
