import React from 'react';
import { Star } from 'lucide-react';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  imageSrc: string;
};

const Testimonial = ({ quote, author, role, company, rating, imageSrc }: TestimonialProps) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
          />
        ))}
      </div>
      <p className="text-slate-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <img 
          src={imageSrc} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover" 
        />
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-sm text-slate-400">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Ai Boss Holdings has transformed my entrepreneurial journey. I'm now running 5 profitable businesses with just 2 hours of oversight per week.",
      author: "Sarah Johnson",
      role: "Founder",
      company: "Quantum Ventures",
      rating: 5,
      imageSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
    },
    {
      quote: "The automation capabilities are mind-blowing. We've cut operational costs by 73% while scaling our customer base by 3x in just 6 months.",
      author: "Michael Chen",
      role: "CEO",
      company: "NexGen Solutions",
      rating: 5,
      imageSrc: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
    },
    {
      quote: "As a solopreneur, Ai Boss has been a game-changer. I've launched 3 new businesses in different sectors without hiring a single employee.",
      author: "Elena Rodriguez",
      role: "Digital Entrepreneur",
      company: "Elevatix",
      rating: 4,
      imageSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
    }
  ];

  const stats = [
    { value: '12,400+', label: 'Active Users' },
    { value: '300+', label: 'AI-Driven Businesses' },
    { value: '87%', label: 'Operational Cost Reduction' },
    { value: '$150M+', label: 'Annual Revenue Generated' }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Join thousands of entrepreneurs who are scaling their businesses with Ai Boss Holdings OS.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {stat.value}
                </h3>
                <p className="text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};