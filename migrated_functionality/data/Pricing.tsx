import React, { useState } from 'react';
import { Check, HelpCircle, X, Zap } from 'lucide-react';
import { stripeProducts } from '../stripe-config';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type PricingFeature = {
  name: string;
  startup: boolean;
  business: boolean;
  enterprise: boolean;
  tooltip?: string;
};

type PlanType = 'monthly' | 'annual';

export const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<PlanType>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePurchase = async (productIndex: number) => {
    const product = stripeProducts[productIndex];
    if (!product) return;

    setIsLoading(product.priceId);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
          mode: product.mode,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const features: PricingFeature[] = [
    { name: 'AI Business Templates', startup: true, business: true, enterprise: true },
    { name: 'Basic Agentic Workflows', startup: true, business: true, enterprise: true },
    { name: 'Command Center Access', startup: true, business: true, enterprise: true },
    { name: 'No-Code AI Builder', startup: false, business: true, enterprise: true, tooltip: 'Build custom AI applications without coding' },
    { name: 'Multi-Business Management', startup: false, business: true, enterprise: true },
    { name: 'White-Label Licensing', startup: false, business: true, enterprise: true },
    { name: 'Custom AI Agent Creation', startup: false, business: false, enterprise: true, tooltip: 'Create and train custom AI agents for your specific needs' },
    { name: 'Enterprise Compliance Tools', startup: false, business: false, enterprise: true },
    { name: 'Dedicated AI Support Team', startup: false, business: false, enterprise: true },
  ];

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'We offer a 14-day free trial on our Business plan so you can experience the full capabilities of Ai Boss Holdings OS.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin and Ethereum.'
    },
    {
      question: 'Do you offer refunds?',
      answer: "We offer a 30-day money-back guarantee if you are not satisfied with our service."
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Pricing for Every Stage</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Choose the perfect plan to help you build, manage, and scale your AI-driven business empire.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-800/70 backdrop-blur-sm rounded-full p-1 inline-flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'annual' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Annual <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Startup Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-2">Startup</h3>
            <p className="text-slate-300 text-sm mb-6">Perfect for solo entrepreneurs and small teams.</p>
            
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">
                  {billingPeriod === 'monthly' ? '$97' : '$77'}
                </span>
                <span className="text-slate-400 mb-1">/ month</span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-slate-400 mt-1">Billed annually (${billingPeriod === 'annual' ? '924' : '1,164'}/year)</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  {feature.startup ? (
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex items-center gap-1">
                    <span className={feature.startup ? 'text-slate-200' : 'text-slate-400'}>
                      {feature.name}
                    </span>
                    {feature.tooltip && (
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 text-slate-500 cursor-help" />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-900 rounded-md text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {feature.tooltip}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handlePurchase(0)}
              disabled={isLoading === stripeProducts[0].priceId}
              className="mt-auto bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-medium py-3 px-4 rounded-lg w-full"
            >
              {isLoading === stripeProducts[0].priceId ? 'Processing...' : 'Start with Startup'}
            </button>
          </div>
          
          {/* Business Plan */}
          <div className="bg-gradient-to-b from-slate-800/70 to-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg shadow-purple-500/10 relative flex flex-col h-full transform hover:-translate-y-1">
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" /> MOST POPULAR
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2">Business</h3>
            <p className="text-slate-300 text-sm mb-6">Ideal for growing businesses and teams.</p>
            
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">
                  {billingPeriod === 'monthly' ? '$197' : '$157'}
                </span>
                <span className="text-slate-400 mb-1">/ month</span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-slate-400 mt-1">Billed annually (${billingPeriod === 'annual' ? '1,884' : '2,364'}/year)</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  {feature.business ? (
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex items-center gap-1">
                    <span className={feature.business ? 'text-slate-200' : 'text-slate-400'}>
                      {feature.name}
                    </span>
                    {feature.tooltip && (
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 text-slate-500 cursor-help" />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-900 rounded-md text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {feature.tooltip}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handlePurchase(0)}
              disabled={isLoading === stripeProducts[0].priceId}
              className="mt-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-medium py-3 px-4 rounded-lg w-full shadow-lg shadow-purple-500/20"
            >
              {isLoading === stripeProducts[0].priceId ? 'Processing...' : 'Start with Business'}
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-2">Enterprise</h3>
            <p className="text-slate-300 text-sm mb-6">For organizations with advanced needs.</p>
            
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">
                  {billingPeriod === 'monthly' ? '$297' : '$237'}
                </span>
                <span className="text-slate-400 mb-1">/ month</span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-slate-400 mt-1">Billed annually (${billingPeriod === 'annual' ? '2,844' : '3,564'}/year)</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  {feature.enterprise ? (
                    <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex items-center gap-1">
                    <span className={feature.enterprise ? 'text-slate-200' : 'text-slate-400'}>
                      {feature.name}
                    </span>
                    {feature.tooltip && (
                      <div className="group relative">
                        <HelpCircle className="h-4 w-4 text-slate-500 cursor-help" />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-900 rounded-md text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {feature.tooltip}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handlePurchase(0)}
              disabled={isLoading === stripeProducts[0].priceId}
              className="mt-auto bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-medium py-3 px-4 rounded-lg w-full"
            >
              {isLoading === stripeProducts[0].priceId ? 'Processing...' : 'Start with Enterprise'}
            </button>
          </div>
        </div>
        
        {/* Enterprise Banner */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 md:p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Need a Custom Solution?</h3>
              <p className="text-slate-300">
                Contact us for tailored enterprise pricing and dedicated support.
              </p>
            </div>
            <button className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 transition-colors rounded-lg font-medium whitespace-nowrap">
              Contact Sales
            </button>
          </div>
        </div>
        
        {/* AI Copywriting Prompt Pack */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 md:p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Featured Product</h3>
            <div className="max-w-md mx-auto bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-xl font-bold mb-2">{stripeProducts[0].name}</h4>
              <p className="text-slate-300 text-sm mb-4">{stripeProducts[0].description}</p>
              <div className="text-3xl font-bold mb-4">${(stripeProducts[0].price / 100).toFixed(2)}</div>
              <button 
                onClick={() => handlePurchase(0)}
                disabled={isLoading === stripeProducts[0].priceId}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-purple-500/20"
              >
                {isLoading === stripeProducts[0].priceId ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-lg font-medium mb-2">{faq.question}</h4>
                <p className="text-slate-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};