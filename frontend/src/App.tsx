import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import { AdminDashboard } from './pages/AdminDashboard'
import { EmployeeDashboard } from './pages/EmployeeDashboard'
import { AuditorDashboard } from './pages/AuditorDashboard'
import AIAssistantPage from './pages/AIAssistantPage'
import SettingsPage from './pages/SettingsPage'
import { AnomalyReview } from './pages/employee/AnomalyReview'
import { ExpenseReports } from './pages/employee/ExpenseReports'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/auditor" element={<AuditorDashboard />} />
        
        <Route path="/admin/ai" element={<AIAssistantPage role="Admin" />} />
        <Route path="/auditor/anomaly-review" element={<AuditorDashboard />} />
        <Route path="/auditor/ai" element={<AIAssistantPage role="Auditor" />} />
        <Route path="/employee/anomaly-review" element={<AnomalyReview />} />
        <Route path="/employee/reports" element={<ExpenseReports />} />
        <Route path="/employee/ai" element={<AIAssistantPage role="Employee" />} />

        <Route path="/admin/settings" element={<SettingsPage role="Admin" />} />
        <Route path="/auditor/settings" element={<SettingsPage role="Auditor" />} />
        <Route path="/employee/settings" element={<SettingsPage role="Employee" />} />
      </Routes>
    </Router>
  )
}

export default App
