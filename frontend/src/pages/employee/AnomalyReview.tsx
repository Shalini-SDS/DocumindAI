import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data
const anomalyTrendData = [
  { month: 'May', count: 8 },
  { month: 'Jun', count: 12 },
  { month: 'Jul', count: 7 },
  { month: 'Aug', count: 10 },
  { month: 'Sep', count: 9 },
  { month: 'Oct', count: 7 },
];

const anomalyReasonData = [
  { name: 'Excessive Amount', value: 35, color: '#EF4444' },
  { name: 'Missing Receipt', value: 25, color: '#F59E0B' },
  { name: 'Unusual Vendor', value: 20, color: '#3B82F6' },
  { name: 'Duplicate', value: 15, color: '#10B981' },
  { name: 'Others', value: 5, color: '#6B7280' },
];

const flaggedTransactions = [
  {
    date: '2025-11-01',
    user: 'Mike Chen',
    vendor: 'Global Airlines',
    amount: 4500,
    reason: 'Unusual receipt - Text detected receipts for $4,500 when it should be $450',
    severity: 'High',
    confidence: 87,
  },
  {
    date: '2025-11-02',
    user: 'Sarah Johnson',
    vendor: 'ABC Tax Service',
    amount: 2500,
    reason: 'Anomaly detected: This was charged to the company. The average for this company is $4 standard deviations',
    severity: 'Medium',
    confidence: 78,
  },
  {
    date: '2025-10-30',
    user: 'Robert Brown',
    vendor: 'Unknown Store #42',
    amount: 180,
    reason: 'Unusual Vendor',
    severity: 'Low',
    confidence: 65,
  },
  {
    date: '2025-10-28',
    user: 'David Wilson',
    vendor: 'Cash Payment',
    amount: 1250,
    reason: 'Missing Receipt',
    severity: 'Medium',
    confidence: 72,
  },
  {
    date: '2025-10-25',
    user: 'Mike Chen',
    vendor: 'Hotel Chain',
    amount: 450,
    reason: 'Duplicate transaction',
    severity: 'Low',
    confidence: 68,
  },
];

const recentFlags = [
  {
    vendor: 'Global Airlines',
    amount: 4500,
    severity: 'High',
    description: 'Unusual receipt - Text detected receipts for $4,500 when it should be $450. Suggested pattern: double billing.',
    confidence: 97,
    color: 'bg-red-500',
  },
  {
    vendor: 'ABC Tax Service',
    amount: 2500,
    severity: 'Medium',
    description: 'Anomaly detected: This was charged to the company. The average for this company is $4 standard deviations from the mean, suggesting irregular pricing.',
    confidence: 84,
    color: 'bg-yellow-500',
  },
  {
    vendor: 'Unknown Store #42',
    amount: 740,
    severity: 'Low',
    description: 'Unusual Vendor: No previous transaction history with this vendor. While not necessarily fraudulent, it requires verification for compliance.',
    confidence: 78,
    color: 'bg-blue-500',
  },
];

export const AnomalyReview: React.FC = () => {
  const [expandedFlag, setExpandedFlag] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Anomaly Detection</h1>
            <p className="text-gray-400">AI-powered fraud and suspicious transaction monitoring</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
            <span className="text-gray-300 text-sm">All Anomalies</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Flagged */}
          <div className="bg-gradient-to-br from-red-950/40 to-red-900/20 border border-red-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-red-300 text-sm font-medium mb-1">Total Flagged</p>
                <p className="text-white text-4xl font-bold">6</p>
                <p className="text-red-400 text-xs mt-1">Past month</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
            </div>
          </div>

          {/* Pending Review */}
          <div className="bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 border border-yellow-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-yellow-300 text-sm font-medium mb-1">Pending Review</p>
                <p className="text-white text-4xl font-bold">4</p>
                <p className="text-yellow-400 text-xs mt-1">Pending review status</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>

          {/* Approved After Review */}
          <div className="bg-gradient-to-br from-green-950/40 to-green-900/20 border border-green-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-green-300 text-sm font-medium mb-1">Approved After Review</p>
                <p className="text-white text-4xl font-bold">12</p>
                <p className="text-green-400 text-xs mt-1">Past quarter</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          {/* AI Accuracy */}
          <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 border border-blue-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-blue-300 text-sm font-medium mb-1">AI Accuracy</p>
                <p className="text-white text-4xl font-bold">94.8%</p>
                <p className="text-blue-400 text-xs mt-1">Detection accuracy</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Anomalies Over Time */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Anomalies Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={anomalyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Anomaly Reason Distribution */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Anomaly Reason Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={anomalyReasonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {anomalyReasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#F3F4F6',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="ml-6 space-y-2">
                {anomalyReasonData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 text-sm">{item.name} {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flagged Transactions Table */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-400" size={20} />
              <h3 className="text-lg font-semibold text-white">Flagged Transactions</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Confidence</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {flaggedTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-300">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{transaction.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{transaction.vendor}</td>
                    <td className="px-6 py-4 text-sm text-right text-white font-semibold">${transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        {transaction.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.severity === 'High' ? 'bg-red-500/20 text-red-300' :
                        transaction.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {transaction.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-300">{transaction.confidence}%</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors">
                          Valid
                        </button>
                        <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Explainability Section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI Explainability - Recent Flags</h3>
          <div className="space-y-4">
            {recentFlags.map((flag, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-800/70 transition-colors"
                  onClick={() => setExpandedFlag(expandedFlag === index ? null : index)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-1 h-12 ${flag.color} rounded-full`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white font-semibold">{flag.vendor}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-white font-bold">${flag.amount.toLocaleString()}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          flag.severity === 'High' ? 'bg-red-500/20 text-red-300' :
                          flag.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {flag.severity}
                        </span>
                      </div>
                      {expandedFlag === index && (
                        <p className="text-gray-400 text-sm mt-2">{flag.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${flag.color}`}
                            style={{ width: `${flag.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm font-semibold">{flag.confidence}%</span>
                      </div>
                    </div>
                    {expandedFlag === index ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};