import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
// Imported components intentionally removed because they are not used in this file yet.

import { FiHome, FiUpload, FiList, FiSettings } from 'react-icons/fi';
import type { SidebarItem } from '../components/DashboardLayout';

const employeeSidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: <FiHome />, active: true },
  { label: 'Upload Receipt', icon: <FiUpload /> },
  { label: 'My Expenses', icon: <FiList /> },
  { label: 'Settings', icon: <FiSettings /> },
];

const MOCK_EXPENSES = [
  { id: '1', date: '2025-11-01', vendor: 'Coffee Shop', amount: 45, category: 'Food', status: 'approved' },
  { id: '2', date: '2025-10-30', vendor: 'Uber', amount: 28, category: 'Travel', status: 'approved' },
  { id: '3', date: '2025-10-28', vendor: 'Office Depot', amount: 120, category: 'Office', status: 'pending' },
  { id: '4', date: '2025-10-25', vendor: 'Hotel XYZ', amount: 450, category: 'Travel', status: 'flagged' },
  { id: '5', date: '2025-10-22', vendor: 'Restaurant', amount: 85, category: 'Food', status: 'approved' },
];

const MOCK_CATEGORY_DATA = [
  { name: 'Travel', value: 60 },
  { name: 'Office', value: 24 },
  { name: 'Food', value: 16 },
];

const MOCK_TREND_DATA = [
  { month: 'Jul', amount: 500 },
  { month: 'Aug', amount: 650 },
  { month: 'Sep', amount: 550 },
  { month: 'Oct', amount: 700 },
];

export const EmployeeDashboard: React.FC = () => {
  // reference mock data so TypeScript doesn't mark them as unused during build
  void MOCK_EXPENSES;
  void MOCK_CATEGORY_DATA;
  void MOCK_TREND_DATA;
  return (
    <DashboardLayout
      role="Employee"
      user="John Doe"
      sidebarItems={employeeSidebarItems}
    >
      <div className="flex h-screen bg-gray-900">
        {/* Left Side - AI Assistant */}
        <div className="w-1/2 p-6 border-r border-gray-700">
          <div className="bg-gray-800 rounded-lg p-6 h-full flex flex-col">
            {/* AI Header */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-400 text-sm font-medium">Always online and ready to help</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Smart Auditor AI</h2>
              <p className="text-gray-400 text-sm">Online</p>
            </div>

            {/* Greeting */}
            <div className="mb-6">
              <p className="text-white text-lg">
                Hello! I'm Smart Auditor AI, your intelligent expense assistant. I can help you with:
              </p>
              <ul className="text-gray-300 text-sm mt-3 space-y-1">
                <li>• Analyzing expense patterns and trends</li>
                <li>• Explaining flagged transactions</li>
                <li>• Providing insights on spending optimization</li>
                <li>• Answering questions about your financial data</li>
                <li>• Recommending cost-saving opportunities</li>
              </ul>
              <p className="text-white text-lg mt-4">How can I assist you today?</p>
            </div>

            {/* Suggested Questions */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Suggested Questions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm transition-colors">
                  Why was the Global Airlines transaction flagged?
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm transition-colors">
                  What are my top spending categories?
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm transition-colors">
                  How can I improve my expense integrity score?
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm transition-colors">
                  Explain the recent anomalies detected
                </button>
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 text-sm transition-colors">
                  What cost-saving opportunities are available?
                </button>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">AI Capabilities</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium">Trend Analysis</h4>
                  <p className="text-gray-400 text-xs">Identify spending patterns</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium">Anomaly Detection</h4>
                  <p className="text-gray-400 text-xs">Explain flagged transactions</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium">Report Generation</h4>
                  <p className="text-gray-400 text-xs">Custom insights on demand</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <h4 className="text-white text-sm font-medium">Smart Recommendations</h4>
                  <p className="text-gray-400 text-xs">Cost-saving opportunities</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-auto">
              <h3 className="text-white font-medium mb-3">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-white text-lg font-semibold">Response Time</p>
                  <p className="text-gray-400 text-sm">&lt; 2 sec</p>
                </div>
                <div className="text-center">
                  <p className="text-white text-lg font-semibold">Accuracy Rate</p>
                  <p className="text-gray-400 text-sm">94.8%</p>
                </div>
                <div className="text-center">
                  <p className="text-white text-lg font-semibold">Questions Answered</p>
                  <p className="text-gray-400 text-sm">this</p>
                </div>
              </div>
            </div>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Recent Expenses Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">My Recent Expenses</h2>
          <ExpenseTable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ={MOCK_EXPENSES} />
=======
        {/* Right Side - Settings */}
        <div className="w-1/2 p-6">
          <div className="bg-gray-800 rounded-lg p-6 h-full overflow-y-auto">
            <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>

            {/* Profile Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">User Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                  <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select department</option>
                    <option value="engineering">Engineering</option>
                    <option value="finance">Finance</option>
                    <option value="hr">Human Resources</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Organization Settings */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Organization Name</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                  <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Settings */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">AI Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Enable Smart Suggestions</h3>
                    <p className="text-gray-400 text-sm">Receive AI-powered expense insights</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Auto-analyze New Expenses</h3>
                    <p className="text-gray-400 text-sm">Automatically flag suspicious transactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Flagged Expense Alerts</h3>
                    <p className="text-gray-400 text-sm">Get notified of suspicious transactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Weekly Reports</h3>
                    <p className="text-gray-400 text-sm">Receive weekly expense summaries</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Support & Help */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Support & Help</h2>
              <p className="text-gray-400 text-sm mb-4">Need assistance? Contact our support team or check our documentation.</p>
              <div className="space-y-3">
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                  View Documentation
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </DashboardLayout>
  );
};