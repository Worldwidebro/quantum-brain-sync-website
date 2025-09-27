import React, { useState } from 'react';
import { 
  Banknote, ShoppingBag, Globe, GraduationCap, Users, Rocket 
} from 'lucide-react';

type Sector = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  examples: string[];
};

export const Sectors = () => {
  const [activeSector, setActiveSector] = useState<string>('financial');
  
  const sectors: Sector[] = [
    {
      id: 'financial',
      icon: <Banknote className="h-6 w-6" />,
      title: 'Financial Services',
      description: 'AI-powered financial tools for wealth building, credit repair, and automated treasury management.',
      color: 'from-green-400 to-emerald-600',
      examples: [
        'GenixBanks AI Treasurer',
        'Ace Payment Gateway AI',
        'Ace Subscription Billing AI',
        'Ace Credit Repair Automation',
        'Ace Wealth Planner'
      ]
    },
    {
      id: 'ecommerce',
      icon: <ShoppingBag className="h-6 w-6" />,
      title: 'E-commerce & Retail',
      description: 'Automated storefronts, supply chain management, and customer insights to maximize sales.',
      color: 'from-orange-400 to-amber-600',
      examples: [
        'Ace Customer Insights',
        'Ace Product Catalog AI',
        'Ace Inventory Manager',
        'Ace Fulfillment Optimizer',
        'Ace Pricing Intelligence'
      ]
    },
    {
      id: 'technology',
      icon: <Globe className="h-6 w-6" />,
      title: 'Technology & Infrastructure',
      description: 'Build and deploy apps, websites, and AI tools without technical expertise.',
      color: 'from-blue-400 to-indigo-600',
      examples: [
        'Ace Code Generator',
        'Ace Workflow Automation',
        'Ace AI Integration Hub',
        'Ace Documentation Hub',
        'Ace Licensing Hub'
      ]
    },
    {
      id: 'education',
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Education & Training',
      description: 'AI-driven courses, certifications, and learning materials that scale effortlessly.',
      color: 'from-red-400 to-rose-600',
      examples: [
        'Ace Digital Academy Automation',
        'Ace Make/Sintra Certification',
        'Ace Youth Entrepreneurship Curriculum',
        'Ace Real Estate Licensing Prep',
        'Ace Ethics Course AI'
      ]
    },
    {
      id: 'community',
      icon: <Users className="h-6 w-6" />,
      title: 'Community & Social Impact',
      description: 'Build meaningful communities and drive positive change with AI-powered tools.',
      color: 'from-purple-400 to-violet-600',
      examples: [
        'Ace Community Builder',
        'Ace Nonprofit Management',
        'Ace Grant Writing Assistant',
        'Ace Volunteer Coordinator',
        'Ace Impact Measurement'
      ]
    },
    {
      id: 'emerging',
      icon: <Rocket className="h-6 w-6" />,
      title: 'Emerging Innovation',
      description: 'Explore cutting-edge technologies in space, biotech, quantum computing, and Web3.',
      color: 'from-pink-400 to-fuchsia-600',
      examples: [
        'Ace Space Analytics',
        'Ace Gene Editing AI',
        'Ace Brain Computer Interface AI',
        'Ace Metaverse Hub',
        'Ace Energy Grid AI'
      ]
    }
  ];
  
  const activeSectorData = sectors.find(sector => sector.id === activeSector);
  
  return (
    <section id="sectors" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-slate-800/50 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Six Key Sectors, 300+ Businesses</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Each sector operates as a fully autonomous unit with its own AI-driven tools, workflows, and revenue streams.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {sectors.map(sector => (
            <button
              key={sector.id}
              className={`p-4 rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
                activeSector === sector.id 
                  ? `bg-gradient-to-b ${sector.color} shadow-lg` 
                  : 'bg-slate-800/60 hover:bg-slate-800'
              }`}
              onClick={() => setActiveSector(sector.id)}
            >
              <div className={`p-3 rounded-full mb-3 ${
                activeSector === sector.id ? 'bg-white/20' : 'bg-slate-700'
              }`}>
                {sector.icon}
              </div>
              <h3 className="text-sm font-medium">{sector.title}</h3>
            </button>
          ))}
        </div>
        
        {activeSectorData && (
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 md:p-8 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${activeSectorData.color}`}>
                    {activeSectorData.icon}
                  </div>
                  {activeSectorData.title}
                </h3>
                <p className="text-slate-300 mb-6">{activeSectorData.description}</p>
                <button className={`px-5 py-2.5 rounded-lg bg-gradient-to-r ${activeSectorData.color} font-medium text-sm`}>
                  Explore {activeSectorData.title}
                </button>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Example Businesses</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSectorData.examples.map((example, index) => (
                    <li key={index} className="flex items-center gap-2 bg-slate-700/50 p-3 rounded-lg">
                      <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${activeSectorData.color}`}></div>
                      <span className="text-sm">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};