import React from 'react';
import { ArrowRight, Brain, Database, Bot } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-700/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-700/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium text-purple-400">Introducing the Future of AI Business Management</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Run <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">300+ AI-Driven Companies</span> with One Operating System
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            The self-operating AI ecosystem designed to automate and scale your business empire across six key sectors - all orchestrated through a central AI command center.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300 font-medium flex items-center gap-2 w-full sm:w-auto">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-all duration-300 font-medium w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-slate-300">AI-Powered Agents</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-slate-300">Shared Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-slate-300">Agentic Workflows</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};