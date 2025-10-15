
import React from 'react';
import { Bot } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center">
        <Bot className="h-8 w-8 text-cyan-400 mr-3" />
        <h1 className="text-xl font-bold text-white">Code Review Assistant</h1>
      </div>
    </header>
  );
};
