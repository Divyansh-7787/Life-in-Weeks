import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  CircleHelp,
  Clock3,
  Download,
  Flower2,
  Menu,
  MoreHorizontal,
  Plus,
  Settings2,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'

const WEEKS_IN_LIFE = 4680
const STORAGE_KEY = 'life-in-weeks-profile'

const starterMemories = {
  0: { title: 'Welcome to the world', note: 'The beginning of a very good story.', color: 'coral' },
  1014: { title: 'A small turning point', note: 'A week worth remembering.', color: 'gold' },
  1415: { title: 'First big adventure', note: 'A little braver than before.', color: 'lilac' },
  1820: { title: 'A fresh chapter', note: 'New places, new people, new perspective.', color: 'blue' },
}

const defaultProfile = {
  name: 'Alex',
  birthdate: '1998-08-14',
  lifespan: 90,
  memories: starterMemories,
  connected: ['openai'],
  cadence: 'Weekly',
}

const aiOptions = [
  { id: 'openai', name: 'OpenAI', detail: 'GPT-4o', mark: '✺', tone: 'openai' },
  { id: 'claude', name: 'Claude', detail: 'Anthropic', mark: '✦', tone: 'claude' },
  { id: 'gemini', name: 'Gemini', detail: 'Google', mark: '✧', tone: 'gemini' },
]

const pad = (number) => String(number).padStart(2, '0')

function toDateInput(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function getWeeksLived(birthdate) {
  const born = new Date(`${birthdate}T00:00:00`)
  const days = Math.max(0, Math.floor((Date.now() - born.getTime()) / 86400000))
  return Math.floor(days / 7)
}

function weekDate(birthdate, week) {
  const date = new Date(`${birthdate}T00:00:00`)
  date.setDate(date.getDate() + week * 7)
  return date
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

function App() {
  const [profile, setProfile] = useState(() => {
    try {
      return { ...defaultProfile, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
    } catch {
      return defaultProfile
    }
  })
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [setupOpen, setSetupOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [toast, setToast] = useState('')

  const livedWeeks = getWeeksLived(profile.birthdate)
  const totalWeeks = profile.lifespan * 52
  const displayedWeeks = Math.min(WEEKS_IN_LIFE, totalWeeks)
  const selectedMemory = selectedWeek !== null ? profile.memories[selectedWeek] : null

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const age = useMemo(() => Math.floor(livedWeeks / 52), [livedWeeks])
  const lifePercentage = Math.min(100, Math.round((livedWeeks / displayedWeeks) * 100))
  const memoryCount = Object.keys(profile.memories).length

  function selectWeek(week) {
    setSelectedWeek(week)
    setDrawerOpen(true)
  }

  function saveMemory(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.trim()
    if (!title || selectedWeek === null) return
    setProfile((current) => ({
      ...current,
      memories: {
        ...current.memories,
        [selectedWeek]: { title, note: data.get('note')?.trim() || 'A week worth keeping.', color: data.get('color') || 'coral' },
      },
    }))
    setToast('Memory saved to your timeline')
    setDrawerOpen(false)
  }

  function deleteMemory() {
    if (selectedWeek === null) return
    setProfile((current) => {
      const memories = { ...current.memories }
      delete memories[selectedWeek]
      return { ...current, memories }
    })
    setToast('Memory removed')
    setDrawerOpen(false)
  }

  function updateProfile(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setProfile((current) => ({
      ...current,
      name: data.get('name')?.trim() || 'Alex',
      birthdate: data.get('birthdate') || current.birthdate,
      lifespan: Number(data.get('lifespan')) || current.lifespan,
    }))
    setSetupOpen(false)
    setSettingsOpen(false)
    setToast('Your life grid is updated')
  }

  function toggleConnection(id) {
    setProfile((current) => ({
      ...current,
      connected: current.connected.includes(id)
        ? current.connected.filter((model) => model !== id)
        : [...current.connected, id],
    }))
  }

  function exportLife() {
    const file = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my-life-in-weeks.json'
    link.click()
    URL.revokeObjectURL(url)
    setToast('Your life data has been exported')
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Life in Weeks home">
          <span className="brand-mark"><Flower2 size={20} strokeWidth={2.4} /></span>
          <span>Life in Weeks</span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a className="active" href="#your-life">Your life</a>
          <a href="#memories">Memories</a>
          <a href="#planning">Plans</a>
          <a href="#settings" onClick={() => setSettingsOpen(true)}>Settings</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Help"><CircleHelp size={19} /></button>
          <button className="avatar" onClick={() => setSettingsOpen(true)} aria-label="Open profile settings">{profile.name.charAt(0).toUpperCase()}</button>
          <button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div>
          <p className="eyebrow"><span /> YOUR LIFE, IN WEEKS</p>
          <h1>Make the weeks <em>count.</em></h1>
          <p className="hero-copy">One small square for every week of your life. Fill the ones you’ve lived with stories worth holding onto.</p>
        </div>
        <button className="outline-button" onClick={() => setSetupOpen(true)}><Settings2 size={17} /> Edit life settings</button>
      </section>

      <section className="stats-strip" aria-label="Life statistics">
        <div><span className="stat-number">{age}</span><span className="stat-label">years lived</span></div>
        <div><span className="stat-number">{livedWeeks.toLocaleString()}</span><span className="stat-label">weeks lived</span></div>
        <div><span className="stat-number">{Math.max(0, displayedWeeks - livedWeeks).toLocaleString()}</span><span className="stat-label">weeks ahead <em>if you reach {profile.lifespan}</em></span></div>
        <div><span className="stat-number">{memoryCount}</span><span className="stat-label">memories saved</span></div>
      </section>

      <section className="life-area" id="your-life">
        <div className="life-heading">
          <div>
            <h2>{profile.name}’s life in weeks</h2>
            <p>Born {formatDate(new Date(`${profile.birthdate}T00:00:00`))} · <strong>{lifePercentage}%</strong> of your grid is written</p>
          </div>
          <div className="legend" aria-label="Grid legend">
            <span><i className="legend-dot lived" /> Lived</span>
            <span><i className="legend-dot future" /> To come</span>
            <span><i className="legend-dot memory" /> Memory</span>
          </div>
        </div>
        <div className="year-row" aria-hidden="true"><span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span></div>
        <div className="life-grid" role="grid" aria-label="Weeks in your life">
          {Array.from({ length: displayedWeeks }, (_, week) => {
            const memory = profile.memories[week]
            const isCurrent = week === livedWeeks
            const status = memory ? `memory ${memory.color}` : week < livedWeeks ? 'lived' : 'future'
            return <button
              key={week}
              role="gridcell"
              className={`week-cell ${status} ${isCurrent ? 'current' : ''}`}
              onClick={() => selectWeek(week)}
              aria-label={`Week ${week + 1}${memory ? `: ${memory.title}` : ''}`}
              title={memory ? `${memory.title} · ${formatDate(weekDate(profile.birthdate, week))}` : `Week ${week + 1}`}
            />
          })}
        </div>
        <div className="life-footer">
          <span><Sparkles size={16} /> Click any week to add a memory</span>
          <span>1 square = 1 week</span>
        </div>
      </section>

      <section className="below-grid" id="planning">
        <article className="prompt-card">
          <div className="prompt-visual"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><BrainCircuit size={29} /></div>
          <div>
            <p className="eyebrow"><span /> LOOKING FORWARD</p>
            <h2>Let your future weeks be intentional.</h2>
            <p>Connect an AI planner to turn what matters to you into gentle, achievable next steps.</p>
            <button className="dark-button" onClick={() => document.getElementById('ai-connections')?.scrollIntoView({ behavior: 'smooth' })}>Set up your plan <ArrowRight size={17} /></button>
          </div>
        </article>

        <aside className="next-week-card">
          <div className="card-title"><span><CalendarDays size={17} /> THIS WEEK</span><button aria-label="More options"><MoreHorizontal size={20} /></button></div>
          <h3>Week {livedWeeks + 1}</h3>
          <p>{formatDate(weekDate(profile.birthdate, livedWeeks))} – {formatDate(weekDate(profile.birthdate, livedWeeks + 1))}</p>
          <div className="suggestion"><Sparkles size={16} /><span>Make one small plan for your future self.</span></div>
          <button className="text-button" onClick={() => selectWeek(livedWeeks)}><Plus size={16} /> Add this week’s intention</button>
        </aside>
      </section>

      <section className="connections-section" id="ai-connections">
        <div className="section-intro"><p className="eyebrow"><span /> YOUR PLANNING COMPANIONS</p><h2>Connect the tools you already love.</h2><p>Your memories stay in your browser. Connections are ready when you are.</p></div>
        <div className="connection-grid">
          {aiOptions.map((option) => {
            const connected = profile.connected.includes(option.id)
            return <article className="connection-card" key={option.id}>
              <div className={`ai-logo ${option.tone}`}>{option.mark}</div>
              <div><h3>{option.name}</h3><p>{option.detail}</p></div>
              <button className={connected ? 'connected-button' : 'connect-button'} onClick={() => toggleConnection(option.id)}>{connected ? <><Check size={14} /> Connected</> : 'Connect'}</button>
            </article>
          })}
        </div>
        <div className="cadence-row"><div><Clock3 size={18} /><span><strong>Planning rhythm</strong><small>Choose how often you’d like a gentle nudge.</small></span></div><div className="segmented">{['Daily', 'Weekly', 'Monthly'].map((item) => <button key={item} className={profile.cadence === item ? 'selected' : ''} onClick={() => setProfile((current) => ({ ...current, cadence: item }))}>{item}</button>)}</div></div>
      </section>

      <footer><span>Life is made of weeks. Make yours meaningful.</span><span>Private by design · Saved locally</span></footer>

      {drawerOpen && selectedWeek !== null && <div className="modal-backdrop" onMouseDown={() => setDrawerOpen(false)}><aside className="memory-drawer" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={() => setDrawerOpen(false)} aria-label="Close memory panel"><X size={20} /></button>
        <div className="drawer-week"><span>WEEK {selectedWeek + 1}</span><h2>{formatDate(weekDate(profile.birthdate, selectedWeek))}</h2><p>{selectedWeek < livedWeeks ? 'A week you have lived.' : 'A week waiting to be written.'}</p></div>
        <form onSubmit={saveMemory} className="memory-form">
          <label>Memory title<input name="title" autoFocus defaultValue={selectedMemory?.title || ''} placeholder="What happened?" /></label>
          <label>Tell the story<textarea name="note" rows="5" defaultValue={selectedMemory?.note || ''} placeholder="A moment, a feeling, a first…" /></label>
          <label>Marker color<select name="color" defaultValue={selectedMemory?.color || 'coral'}><option value="coral">Coral</option><option value="gold">Golden</option><option value="lilac">Lilac</option><option value="blue">Blue</option></select></label>
          <div className="form-actions"><button type="submit" className="dark-button">Save memory</button>{selectedMemory && <button type="button" className="delete-button" onClick={deleteMemory}>Remove</button>}</div>
        </form>
      </aside></div>}

      {(setupOpen || settingsOpen) && <div className="modal-backdrop" onMouseDown={() => { setSetupOpen(false); setSettingsOpen(false) }}><section className="settings-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={() => { setSetupOpen(false); setSettingsOpen(false) }} aria-label="Close settings"><X size={20} /></button>
        <p className="eyebrow"><span /> YOUR TIMELINE</p><h2>Set up your life grid</h2><p className="modal-copy">A few details are all we need to map out your weeks.</p>
        <form onSubmit={updateProfile} className="settings-form"><label>Your name<input name="name" defaultValue={profile.name} /></label><label>Birth date<input name="birthdate" type="date" max={toDateInput(new Date())} defaultValue={profile.birthdate} /></label><label>Life expectancy<input name="lifespan" type="number" min="50" max="120" defaultValue={profile.lifespan} /></label><button className="dark-button" type="submit">Update my grid <ArrowRight size={17} /></button></form>
        <button className="export-button" onClick={exportLife}><Download size={16} /> Export my data</button>
      </section></div>}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </main>
  )
}

export default App
