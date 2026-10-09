import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Experience.css'

const experience = [
  {
    role: 'Android Developer',
    company: 'Penn Labs',
    type: null,
    dates: 'Jan 2026 - Present · 10 mos',
    location: null,
    link: 'https://pennlabs.org/products/penn-mobile',
    description: null,
    skills: ['Kotlin', 'Android Studio'],
  },
  {
    role: 'Software Engineer',
    company: 'Flight Health',
    type: 'Internship',
    dates: 'May 2026 - Aug 2026 · 4 mos',
    location: 'New York, New York, United States',
    description: 'AI Voice Agent',
    skills: ['Twilio', 'Livekit'],
  },
  {
    role: 'Software Engineer',
    company: 'Aquara.ai',
    type: 'Part-time',
    dates: 'May 2026 - Aug 2026 · 4 mos',
    location: 'Remote',
    description: 'Wharton M&A startup',
    skills: [],
  },
  {
    role: 'Data Science Researcher',
    company: 'Vanderbilt University Medical Center',
    type: 'Internship',
    dates: 'Jun 2024 - Jul 2024 · 2 mos',
    location: 'Nashville, Tennessee, United States · Hybrid',
    description: 'Modeled survival analysis for plant protein intake.',
    skills: ['SAS'],
  },
  {
    role: 'Research Assistant',
    company: 'UTHealth Houston',
    type: 'Internship',
    dates: 'Aug 2023 · 1 mo',
    location: 'Houston, Texas, United States',
    description: 'Developed ETL pipelines for biological datasets.',
    skills: ['R', 'Python'],
  },
]

const education = [
  {
    school: 'University of Pennsylvania',
    degree:
      'Bachelor of Science in Engineering - BSE, Computer Science (Concentration: AI); Engineering Entrepreneurship Minor',
    activities:
      'Penn Labs, Hack4Impact, Society of Women Engineers (Community Development Committee), Club Tennis',
  },
  {
    school: 'The Awty International School',
    degree: 'International Baccalaureate Diploma, Valedictorian',
    activities: 'Varsity Tennis, 1580 SAT',
    skills: ['Java', 'Spanish'],
  },
]

const certifications = [
  {
    name: 'Wharton Undergraduate Data Analytics Club',
    issuer: 'Wharton Undergraduate Data Analytics Club',
    issued: 'Dec 2025',
    credentialId: 'e0c813ff-9633-49c7-9769-4a27ee791c39',
  },
  {
    name: 'Data Structures and Algorithms',
    issuer: 'Microsoft',
    issued: 'Aug 2025',
  },
]

function SkillTags({ skills }) {
  if (!skills || skills.length === 0) return null
  return (
    <div className="skills">
      {skills.map((skill) => (
        <span className="skill" key={skill}>
          {skill}
        </span>
      ))}
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Cassie is better than sam lao</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="yippeee!!">
        We love cassie!
      </p>

      <section className="resume-section">
        <h2>Experience</h2>
        {experience.map((job) => (
          <article className="resume-item" key={`${job.company}-${job.role}`}>
            <h3>{job.role}</h3>
            <p className="meta">
              {job.company}
              {job.type && ` · ${job.type}`}
            </p>
            <p className="meta">{job.dates}</p>
            {job.location && <p className="meta">{job.location}</p>}
            {job.link && (
              <p className="meta">
                <a href={job.link} target="_blank" rel="noreferrer">
                  {job.link}
                </a>
              </p>
            )}
            {job.description && <p>{job.description}</p>}
            <SkillTags skills={job.skills} />
          </article>
        ))}
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        {education.map((ed) => (
          <article className="resume-item" key={ed.school}>
            <h3>{ed.school}</h3>
            <p>{ed.degree}</p>
            <p className="meta">Activities and societies: {ed.activities}</p>
            <SkillTags skills={ed.skills} />
          </article>
        ))}
      </section>

      <section className="resume-section">
        <h2>Licenses &amp; Certifications</h2>
        {certifications.map((cert) => (
          <article className="resume-item" key={cert.name}>
            <h3>{cert.name}</h3>
            <p className="meta">{cert.issuer}</p>
            <p className="meta">Issued {cert.issued}</p>
            {cert.credentialId && (
              <p className="meta">Credential ID {cert.credentialId}</p>
            )}
          </article>
        ))}
      </section>
    </>
  )
}

export default App
