import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';

export const Success = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    setSessionId(sessionIdParam);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-400" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-slate-300 mb-6">
            Thank you for your purchase. Your AI Copywriting Prompt Pack is ready for download.
          </p>
          
          {sessionId && (
            <p className="text-xs text-slate-400 mb-6">
              Session ID: {sessionId}
            </p>
          )}
          
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download Your Prompts
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-slate-700 hover:bg-slate-600 transition-colors text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};