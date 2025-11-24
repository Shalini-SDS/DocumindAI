import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiSun } from 'react-icons/fi'

const featureCards = [
  {
    title: 'Smart Receipt Scanning',
    description: 'AI-powered OCR extracts data from receipts automatically',
    icon: '🧾',
  },
  {
    title: 'Real-time Fraud Detection',
    description: 'Advanced algorithms identify anomalies and suspicious patterns',
    icon: '📊',
  },
  {
    title: 'Automated Verification',
    description: 'Instant validation and categorization of all expenses',
    icon: '✅',
  },
]

const roleTabs = [
  { label: 'Admin', value: 'admin' },
  { label: 'Employee', value: 'employee' },
  { label: 'Auditor', value: 'auditor' },
]

export default function Landing() {
  const [role, setRole] = useState('employee')
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const url = isSignup ? 'http://127.0.0.1:5000/api/auth/signup' : 'http://127.0.0.1:5000/api/auth/login'
      
      const payload = isSignup 
        ? { email, username, password, role }
        : { email, password }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Authentication failed' })
        return
      }

      if (data.success) {
        const userData = JSON.stringify(data.user)
        localStorage.setItem('user', userData)
        setMessage({ type: 'success', text: isSignup ? 'Account created! Redirecting...' : 'Login successful! Redirecting...' })
        
        setTimeout(() => {
          navigate(`/${data.user.role}`)
        }, 1500)
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Connection failed. Make sure the backend is running.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="landing-shell">
      <div className="landing-panel">
        <div className="landing-brand">
          <div className="brand-icon">🛡️</div>
          <div>
            <h1>AI Expense Transparency</h1>
            <p>Ensuring Financial Trust Through AI-Driven Verification</p>
          </div>
        </div>
        <div className="landing-features">
          {featureCards.map((card) => (
            <div className="feature-card" key={card.title}>
              <span>{card.icon}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="landing-divider" />
      <div className="login-panel">
        <div className="login-header">
          <button className="icon-button" type="button">
            <FiSun />
          </button>
        </div>
        <div className="login-card">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignup ? 'Sign up to get started' : 'Sign in to access your dashboard'}</p>
          
          {!isSignup && (
            <div className="role-tabs">
              {roleTabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`role-tab${tab.value === role ? ' active' : ''}`}
                  type="button"
                  onClick={() => setRole(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {isSignup && (
            <div className="role-tabs">
              {roleTabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`role-tab${tab.value === role ? ' active' : ''}`}
                  type="button"
                  onClick={() => setRole(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {message.text && (
            <div style={{
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '8px',
              backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
              color: message.type === 'error' ? '#dc2626' : '#16a34a',
              fontSize: '14px'
            }}>
              {message.text}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignup && (
              <label>
                Username
                <div className="input-field">
                  <FiMail />
                  <input 
                    placeholder="Choose a username" 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </label>
            )}
            <label>
              Email Address
              <div className="input-field">
                <FiMail />
                <input 
                  placeholder="you@example.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
            <label>
              Password
              <div className="input-field">
                <FiLock />
                <input 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>
            
            {!isSignup && (
              <div className="login-row">
                <label className="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
                <button className="link" type="button">
                  Forgot Password?
                </button>
              </div>
            )}
            
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Sign In')}
            </button>
          </form>
          
          <p className="signup-hint">
            {isSignup ? (
              <>Already have an account? <span className="link" onClick={() => { setIsSignup(false); setMessage({ type: '', text: '' }); }}>Sign in</span></>
            ) : (
              <>Don't have an account? <span className="link" onClick={() => { setIsSignup(true); setMessage({ type: '', text: '' }); }}>Sign up</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
