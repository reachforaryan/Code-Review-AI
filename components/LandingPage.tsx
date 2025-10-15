import React from 'react';
import { Bot, Zap, ShieldCheck, BarChart, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 transform hover:scale-105 hover:bg-gray-800 transition-all duration-300 shadow-lg">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500/20 text-cyan-300 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const FloatingIcon: React.FC<{ icon: React.ReactNode; className: string; style: React.CSSProperties }> = ({ icon, className, style }) => (
    <div className={`absolute text-cyan-500/20 ${className}`} style={style}>
        {icon}
    </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Floating Background Icons */}
      <FloatingIcon icon={<Bot size={60} />} className="animate-float" style={{ top: '15%', left: '10%', animationDelay: '0s' }} />
      <FloatingIcon icon={<Zap size={40} />} className="animate-float" style={{ top: '20%', right: '15%', animationDelay: '2s' }} />
      <FloatingIcon icon={<ShieldCheck size={50} />} className="animate-float" style={{ bottom: '25%', left: '20%', animationDelay: '4s' }} />
      <FloatingIcon icon={<BarChart size={70} />} className="animate-float" style={{ bottom: '15%', right: '10%', animationDelay: '1s' }} />

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-16 w-16 text-cyan-400 mr-4" />
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 animated-gradient-text">
            Code Review Assistant
          </h1>
        </div>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300">
          Revolutionize your workflow. Get instant, AI-powered feedback on your code to improve quality, readability, and performance.
        </p>

        <button
          onClick={onEnter}
          className="mt-10 px-8 py-4 bg-cyan-500 text-white font-bold text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 button-glow-animate"
        >
          <div className="flex items-center">
            <Sparkles className="mr-3 h-6 w-6" />
            Start Analyzing Your Code
          </div>
        </button>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard icon={<Zap size={24} />} title="In-Depth Analysis">
                  Go beyond linting. Get detailed feedback on structure, modularity, and adherence to best practices.
              </FeatureCard>
              <FeatureCard icon={<ShieldCheck size={24} />} title="Bug Detection">
                  Identify potential bugs, logical errors, and unhandled edge cases before they hit production.
              </FeatureCard>
              <FeatureCard icon={<BarChart size={24} />} title="Actionable Suggestions">
                  Receive clear, concrete improvement suggestions with code examples to accelerate your development.
              </FeatureCard>
          </div>
      </div>
    </div>
  );
};
