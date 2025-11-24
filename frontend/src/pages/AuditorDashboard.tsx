import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { FiHome, FiSearch } from 'react-icons/fi';
import { AlertTriangle, TrendingUp, AlertCircle } from 'lucide-react';
import type { SidebarItem } from '../components/DashboardLayout';

const auditorSidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: <FiHome />, active: false },
  { label: 'Anomaly Review', icon: <FiSearch />, active: true },
];

export const AuditorDashboard: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const insightsRes = await fetch('http://127.0.0.1:5000/api/auditor/ai-insights');
        const insightsData = await insightsRes.json();

        if (insightsData.success) {
          setAiInsights(insightsData.insights || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout
      role="Auditor"
      user="Jane Smith"
      sidebarItems={auditorSidebarItems}
    >
      <div className="min-h-screen bg-[#0a0e1a] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">AI Expense Transparency</h1>
            <p className="text-gray-400 text-sm">Comprehensive analysis of spending patterns and anomalies</p>
          </div>
        </div>

        {/* AI-Generated Insights */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">AI-Generated Insights</h3>
            
            {aiInsights.length > 0 ? (
              aiInsights.map((insight: any, index: number) => {
                const getBgColor = (type: string) => {
                  switch(type) {
                    case 'alert': return 'bg-red-500/10 border-red-500/30';
                    case 'warning': return 'bg-orange-500/10 border-orange-500/30';
                    case 'success': return 'bg-green-500/10 border-green-500/30';
                    case 'info': return 'bg-blue-500/10 border-blue-500/30';
                    case 'summary': return 'bg-purple-500/10 border-purple-500/30';
                    case 'recommendation': return 'bg-yellow-500/10 border-yellow-500/30';
                    default: return 'bg-gray-700/30 border-gray-600/30';
                  }
                };

                const getIconColor = (type: string) => {
                  switch(type) {
                    case 'alert': return 'text-red-400';
                    case 'warning': return 'text-orange-400';
                    case 'success': return 'text-green-400';
                    case 'info': return 'text-blue-400';
                    case 'summary': return 'text-purple-400';
                    case 'recommendation': return 'text-yellow-400';
                    default: return 'text-gray-400';
                  }
                };

                return (
                  <div key={index} className={`border rounded-lg p-4 ${getBgColor(insight.type)}`}>
                    <div className="flex items-start gap-3">
                      {insight.type === 'alert' && <AlertTriangle className={`w-5 h-5 ${getIconColor(insight.type)} mt-0.5 flex-shrink-0`} />}
                      {insight.type === 'warning' && <AlertCircle className={`w-5 h-5 ${getIconColor(insight.type)} mt-0.5 flex-shrink-0`} />}
                      {(insight.type === 'success' || insight.type === 'recommendation') && <TrendingUp className={`w-5 h-5 ${getIconColor(insight.type)} mt-0.5 flex-shrink-0`} />}
                      {insight.type === 'info' && <TrendingUp className={`w-5 h-5 ${getIconColor(insight.type)} mt-0.5 flex-shrink-0`} />}
                      {insight.type === 'summary' && <TrendingUp className={`w-5 h-5 ${getIconColor(insight.type)} mt-0.5 flex-shrink-0`} />}
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                        {insight.details && <p className="text-xs text-gray-400">{insight.details}</p>}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                {/* Spending Pattern */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-1">No Expenses Yet</h4>
                      <p className="text-sm text-gray-300">Upload receipts to see AI-generated insights about your expenses, anomalies, and compliance status.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};