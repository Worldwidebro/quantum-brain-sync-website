import React, { useState, useEffect } from 'react';
import { Brain, Zap, Shield, DollarSign, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const EnhancedLanding = () => {
  const [ecosystemValue, setEcosystemValue] = useState('$2.84B+');
  const [aiModels, setAiModels] = useState(5);
  const [businessesScraped, setBusinessesScraped] = useState(1250);
  const [workflowsActive, setWorkflowsActive] = useState(3);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setBusinessesScraped(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Boss Holdings
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                IZA OS Ecosystem
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The world's most advanced AI-powered business automation platform. 
              Generate revenue, optimize workflows, and scale your business with cutting-edge AI.
            </p>
            
            {/* Ecosystem Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{ecosystemValue}</div>
                <div className="text-sm text-gray-300">Ecosystem Value</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{aiModels}</div>
                <div className="text-sm text-gray-300">AI Models</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{businessesScraped.toLocaleString()}+</div>
                <div className="text-sm text-gray-300">Businesses Scraped</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">{workflowsActive}</div>
                <div className="text-sm text-gray-300">Active Workflows</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2" />
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200">
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to automate and scale your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <Brain className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">AI Model Orchestration</h3>
              <p className="text-gray-300 mb-4">
                Deploy and manage 5+ AI models including Llama, Qwen, and DeepSeek for optimal performance and cost.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />llama3.1:8b</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />qwen3:32b</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />deepseek-r1:32b</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <Zap className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Workflow Automation</h3>
              <p className="text-gray-300 mb-4">
                Automate business processes with N8N and Activepieces. Create complex workflows in minutes.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Business Scraping</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />AI Orchestration</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Health Monitoring</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <DollarSign className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Revenue Generation</h3>
              <p className="text-gray-300 mb-4">
                Identify and capitalize on business opportunities with AI-powered market analysis.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Google Maps Scraping</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Revenue Analysis</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Opportunity Detection</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <Shield className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Enterprise Security</h3>
              <p className="text-gray-300 mb-4">
                Bank-level security with encryption, RBAC, and compliance features.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />End-to-End Encryption</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Role-Based Access</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />SOC 2 Compliance</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <Users className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Team Collaboration</h3>
              <p className="text-gray-300 mb-4">
                Collaborate with your team using advanced project management and communication tools.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Real-time Collaboration</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Project Management</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Team Analytics</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <TrendingUp className="h-12 w-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Analytics & Insights</h3>
              <p className="text-gray-300 mb-4">
                Get deep insights into your business performance with advanced analytics.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Real-time Metrics</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Predictive Analytics</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-400 mr-2" />Custom Dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using IZA OS to automate, scale, and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Get Started Free
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLanding;
