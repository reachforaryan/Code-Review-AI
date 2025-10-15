
import React from 'react';

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text = "Analyzing your code..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      <p className="mt-4 text-lg text-gray-400 font-semibold">{text}</p>
    </div>
  );
};
