import React from 'react';
import { 
  BrainCircuit, Workflow, Layers, Database, Code, Bot, Shield, DollarSign
} from 'lucide-react';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/80 transition-all duration-300 group">
      <div className="p-3 bg-purple-600/20 rounded-lg inline-block mb-4 group-hover:bg-purple-600/30 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </div>
  );
};

export const Features = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
      title: "IZA OS",
      description: "Centralized orchestration engine for managing 300+ businesses from a single dashboard."
    },
    {
      icon: <Workflow className="h-6 w-6 text-purple-400" />,
      title: "Agentic Workflow Engine",
      description: "Autonomous AI agents that handle day-to-day operations without human intervention."
    },
    {
      icon: <Layers className="h-6 w-6 text-purple-400" />,
      title: "Business Automation Stack",
      description: "Pre-built templates and workflows for launching new businesses in minutes, not months."
    },
    {
      icon: <Database className="h-6 w-6 text-purple-400" />,
      title: "Financial Infrastructure",
      description: "Automated treasury management, payment processing, and subscription billing."
    },
    {
      icon: <Code className="h-6 w-6 text-purple-400" />,
      title: "No-Code Development",
      description: "Build apps, websites, and tools without writing a single line of code."
    },
    {
      icon: <Bot className="h-6 w-6 text-purple-400" />,
      title: "AI-Powered Products",
      description: "Customer insights, legal analysis, voice assistants, and recommendation engines."
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Compliance & Governance",
      description: "Stay compliant across multiple jurisdictions with automated regulatory reporting."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-purple-400" />,
      title: "Revenue & Licensing",
      description: "Multiple revenue streams through SaaS, certifications, and white-label licensing."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Our comprehensive suite of tools and technologies makes building and scaling AI-driven businesses effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};