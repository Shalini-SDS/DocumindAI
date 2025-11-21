import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Download, Filter, ChevronDown, AlertTriangle, Info, CheckCircle, Lightbulb } from 'lucide-react';

// Mock data
const expenseTrendData = [
  { month: 'Jan', flagged: 8500, total: 28000 },
  { month: 'Feb', flagged: 9200, total: 30000 },
  { month: 'Mar', flagged: 9800, total: 32000 },
  { month: 'Apr', flagged: 10500, total: 35000 },
  { month: 'May', flagged: 11000, total: 37000 },
  { month: 'Jun', flagged: 12000, total: 40000 },
  { month: 'Jul', flagged: 11500, total: 42000 },
  { month: 'Aug', flagged: 13000, total: 45000 },
  { month: 'Sep', flagged: 13500, total: 48000 },
  { month: 'Oct', flagged: 14000, total: 50000 },
];

const categorySpendingData = [
  { category: 'Food', amount: 12500 },
  { category: 'Office', amount: 8200 },
  { category: 'IT', amount: 15600 },
  { category: 'Misc', amount: 10400 },
];

const fraudDetectionData = [
  { department: 'Department A', count: 8 },
  { department: 'Department B', count: 6 },
  { department: 'Department C', count: 12 },
  { department: 'Department D', count: 5 },
];

const insights = [
  {
    type: 'pattern',
    icon: Info,
    title: 'Spending Pattern',
    description: 'Travel expenses have increased by 22% compared to last quarter. This aligns with the Q4 conference season. Spending remains consistent with budget allocations.',
    color: 'bg-blue-500',
    bgColor: 'from-blue-950/40 to-blue-900/20',
    borderColor: 'border-blue-800/50',
  },
  {
    type: 'alert',
    icon: AlertTriangle,
    title: 'Anomaly Alert',
    description: '7 duplicate transactions detected in October Q3. 4 flagged these for manual review. Average resolution time for similar cases is 1.5 days.',
    color: 'bg-yellow-500',
    bgColor: 'from-yellow-950/40 to-yellow-900/20',
    borderColor: 'border-yellow-800/50',
  },
  {
    type: 'compliance',
    icon: CheckCircle,
    title: 'Compliance Status',
    description: '98% of expenses are in full compliance. Policy compliance has improved by 6% from last month. Employee training on expense policy shows positive results.',
    color: 'bg-green-500',
    bgColor: 'from-green-950/40 to-green-900/20',
    borderColor: 'border-green-800/50',
  },
  {
    type: 'recommendation',
    icon: Lightbulb,
    title: 'Recommendation',
    description: 'Consider implementing automated vendor verification for amounts over $1,000 to reduce manual review time by an estimated 40%.',
    color: 'bg-purple-500',
    bgColor: 'from-purple-950/40 to-purple-900/20',
    borderColor: 'border-purple-800/50',
  },
];

export const ExpenseReports: React.FC = () => {
  const [dateRange] = useState('Last 6 Months');
  const [department] = useState('All Departments');
  const [category] = useState('All Categories');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Expense Reports and Insights</h1>
            <p className="text-gray-400">Comprehensive analysis of spending patterns and anomalies</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
            <Download size={18} />
            Download Report (PDF)
          </button>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-gray-400" />
              <label className="text-sm text-gray-400">Date Range</label>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-white text-sm">{dateRange}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-gray-400" />
              <label className="text-sm text-gray-400">Department</label>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-white text-sm">{department}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-gray-400" />
              <label className="text-sm text-gray-400">Category</label>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-white text-sm">{category}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Expense Trend Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Expense Trend Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={expenseTrendData}>
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
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="flagged" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Flagged Amount"
                dot={{ fill: '#EF4444', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Total Expenses"
                dot={{ fill: '#3B82F6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category-Wise Spending */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Category-Wise Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categorySpendingData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <YAxis dataKey="category" type="category" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6',
                  }}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fraud Detection Statistics */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Fraud Detection Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudDetectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="department" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6',
                  }}
                />
                <Bar dataKey="count" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Analyzed */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Analyzed</p>
            <p className="text-white text-3xl font-bold mb-1">172</p>
            <p className="text-gray-500 text-xs">Expenses processed</p>
          </div>

          {/* Clean Rate */}
          <div className="bg-gradient-to-br from-green-950/40 to-green-900/20 border border-green-800/50 rounded-xl p-6">
            <p className="text-green-300 text-sm mb-2">Clean Rate</p>
            <p className="text-white text-3xl font-bold mb-1">97.7%</p>
            <p className="text-green-400 text-xs">Compliance rate</p>
          </div>

          {/* Flagged Amount */}
          <div className="bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 border border-yellow-800/50 rounded-xl p-6">
            <p className="text-yellow-300 text-sm mb-2">Flagged Amount</p>
            <p className="text-white text-3xl font-bold mb-1">$11.2K</p>
            <p className="text-yellow-400 text-xs">Under review</p>
          </div>

          {/* Avg Report Time */}
          <div className="bg-gradient-to-br from-red-950/40 to-red-900/20 border border-red-800/50 rounded-xl p-6">
            <p className="text-red-300 text-sm mb-2">Avg Report Time</p>
            <p className="text-white text-3xl font-bold mb-1">2.3</p>
            <p className="text-red-400 text-xs">Days to resolve</p>
          </div>
        </div>

        {/* AI-Generated Insights */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI-Generated Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${insight.bgColor} border ${insight.borderColor} rounded-lg p-5`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${insight.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">{insight.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};