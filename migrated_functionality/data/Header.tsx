import React, { useState, useEffect } from 'react';
import { Menu, X, Layers } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold">Ai Boss Holdings OS</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-purple-400 transition-colors">Features</a>
            <a href="#sectors" className="text-sm font-medium hover:text-purple-400 transition-colors">Sectors</a>
            <a href="#dashboard" className="text-sm font-medium hover:text-purple-400 transition-colors">Dashboard</a>
            <a href="#pricing" className="text-sm font-medium hover:text-purple-400 transition-colors">Pricing</a>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Get Started
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 absolute top-full left-0 right-0 p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-sm font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#sectors" 
              className="text-sm font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sectors
            </a>
            <a 
              href="#dashboard" 
              className="text-sm font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors w-full">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};