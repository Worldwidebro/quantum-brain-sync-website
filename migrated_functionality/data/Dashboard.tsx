import React, { useState, useEffect } from 'react';
import { 
  LineChart, BarChart, PieChart, Activity, TrendingUp, Users, ArrowUpRight, RefreshCw
} from 'lucide-react';
import { izaOSApi, IZA_OS_CONFIG } from '../iza-os-config';

interface EcosystemData {
  ecosystem_value: string;
  total_agents: number;
  automation_level: string;
  total_workflows: number;
  services: {
    api: string;
    n8n: string;
    ollama: string;
    database: string;
    supabase: string;
    stripe: string;
  };
}

interface BusinessData {
  name: string;
  sector: string;
  revenue: string;
  status: string;
  growth: number;
}

export const Dashboard = () => {
  const [ecosystemData, setEcosystemData] = useState<EcosystemData | null>(null);
  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchEcosystemData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch ecosystem status from IZA OS backend
      const ecosystemStatus = await izaOSApi.getEcosystemStatus();
      setEcosystemData(ecosystemStatus);
      
      // Fetch businesses data
      const businessesData = await izaOSApi.getBusinesses();
      setBusinesses(businessesData.businesses || []);
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch ecosystem data:', err);
      setError('Failed to connect to IZA OS backend. Using demo data.');
      
      // Fallback to demo data
      setEcosystemData({
        ecosystem_value: IZA_OS_CONFIG.ecosystem.value,
        total_agents: IZA_OS_CONFIG.ecosystem.totalAgents,
        automation_level: IZA_OS_CONFIG.ecosystem.automationLevel,
        total_workflows: IZA_OS_CONFIG.ecosystem.totalWorkflows,
        services: {
          api: "online",
          n8n: "online",
          ollama: "online",
          database: "online",
          supabase: "connected",
          stripe: "connected"
        }
      });
      
      setBusinesses([
        { name: 'GenixBanks AI Treasurer', sector: 'Financial', revenue: '$245K', status: 'Active', growth: 18.5 },
        { name: 'Ace Code Generator', sector: 'Technology', revenue: '$187K', status: 'Active', growth: 12.7 },
        { name: 'Ace Digital Academy', sector: 'Education', revenue: '$156K', status: 'Active', growth: 9.3 },
        { name: 'Ace Space Analytics', sector: 'Emerging', revenue: '$132K', status: 'Growing', growth: 22.1 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEcosystemData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchEcosystemData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <section id="dashboard" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">IZA OS Command Center</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Live monitoring and management of your AI-driven business empire.
          </p>
        </div>
        
        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-slate-700/50 shadow-xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-700/50">
            <div>
              <h3 className="text-xl font-bold mb-1">IZA OS Ecosystem Dashboard</h3>
              <p className="text-sm text-slate-400">
                Last updated: {formatTime(lastUpdated)}
                {error && <span className="text-yellow-400 ml-2">({error})</span>}
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button 
                onClick={fetchEcosystemData}
                disabled={loading}
                className="px-4 py-2 bg-slate-700/70 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                Launch New Business
              </button>
            </div>
          </div>
          
          {/* Connection Status */}
          {ecosystemData && (
            <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-sm font-medium mb-3">System Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(ecosystemData.services).map(([service, status]) => (
                  <div key={service} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      status === 'online' || status === 'connected' ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-xs text-slate-300 capitalize">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* KPI Card 1 - Revenue */}
            <div className="bg-slate-800/70 rounded-xl p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Revenue</p>
                  <h4 className="text-2xl font-bold">
                    {ecosystemData ? IZA_OS_CONFIG.ecosystem.monthlyRevenue : '$1.72M'}
                  </h4>
                </div>
                <span className="flex items-center text-xs font-medium text-green-400">
                  +12.5% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div className="h-32 flex items-end">
                <div className="w-full flex items-end justify-between space-x-1">
                  {[40, 25, 60, 45, 80, 65, 75, 50, 90, 70, 85, 95].map((height, index) => (
                    <div 
                      key={index} 
                      style={{ height: `${height}%` }}
                      className="w-full bg-gradient-to-t from-purple-600/50 to-purple-400 rounded-sm"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* KPI Card 2 - Active Businesses */}
            <div className="bg-slate-800/70 rounded-xl p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Active Businesses</p>
                  <h4 className="text-2xl font-bold">
                    {ecosystemData ? IZA_OS_CONFIG.ecosystem.activeBusinesses : '312'}
                  </h4>
                </div>
                <span className="flex items-center text-xs font-medium text-green-400">
                  +8.3% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div className="h-32 flex items-center justify-center">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#334155" 
                      strokeWidth="10"
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#a855f7" 
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      strokeDashoffset="50.24"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">80%</span>
                    <span className="text-xs text-slate-400">Profitable</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* KPI Card 3 - AI Agents */}
            <div className="bg-slate-800/70 rounded-xl p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-slate-400 mb-1">AI Agent Activity</p>
                  <h4 className="text-2xl font-bold">
                    {ecosystemData ? `${ecosystemData.total_agents}K` : '27.8K'}
                  </h4>
                </div>
                <span className="flex items-center text-xs font-medium text-green-400">
                  +23.7% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div className="h-32 flex items-end">
                <div className="w-full flex items-end justify-between">
                  {[
                    { label: 'Mon', value: 60 },
                    { label: 'Tue', value: 75 },
                    { label: 'Wed', value: 85 },
                    { label: 'Thu', value: 72 },
                    { label: 'Fri', value: 90 },
                    { label: 'Sat', value: 55 },
                    { label: 'Sun', value: 45 },
                  ].map((day, index) => (
                    <div key={index} className="flex flex-col items-center w-full">
                      <div 
                        style={{ height: `${day.value}%` }}
                        className="w-4 bg-indigo-500 rounded-sm mb-2"
                      ></div>
                      <span className="text-xs text-slate-400">{day.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Business Table */}
            <div className="bg-slate-800/70 rounded-xl p-5 md:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Top Performing Businesses</h4>
                <button className="text-sm text-purple-400">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="text-left text-xs text-slate-400 border-b border-slate-700/50">
                      <th className="pb-3 font-medium">Business</th>
                      <th className="pb-3 font-medium">Sector</th>
                      <th className="pb-3 font-medium">Revenue</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map((business, index) => (
                      <tr key={index} className="border-b border-slate-700/30 text-sm">
                        <td className="py-3 font-medium">{business.name}</td>
                        <td className="py-3 text-slate-300">{business.sector}</td>
                        <td className="py-3 text-slate-300">{business.revenue}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            business.status === 'Active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {business.status}
                          </span>
                        </td>
                        <td className="py-3 text-green-400 flex items-center">
                          +{business.growth}% <ArrowUpRight className="h-3 w-3 ml-1" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-slate-800/70 rounded-xl p-5 md:col-span-4">
              <h4 className="font-medium mb-4">Quick Actions</h4>
              <div className="space-y-3">
                {[
                  { icon: <LineChart className="h-4 w-4" />, label: 'Generate Performance Report' },
                  { icon: <BarChart className="h-4 w-4" />, label: 'Review Financial Projections' },
                  { icon: <PieChart className="h-4 w-4" />, label: 'Optimize Resource Allocation' },
                  { icon: <Activity className="h-4 w-4" />, label: 'Monitor Agent Performance' },
                  { icon: <TrendingUp className="h-4 w-4" />, label: 'Scale High-Performing Business' },
                  { icon: <Users className="h-4 w-4" />, label: 'Add New Team Member' },
                ].map((action, index) => (
                  <button 
                    key={index}
                    className="w-full flex items-center gap-3 bg-slate-700/50 hover:bg-slate-700 transition-colors p-3 rounded-lg text-sm text-left"
                  >
                    <span className="p-1.5 bg-slate-600 rounded-md text-purple-400">
                      {action.icon}
                    </span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
