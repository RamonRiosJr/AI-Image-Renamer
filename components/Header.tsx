import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center text-center">
        <div>
          <div className="flex items-center justify-center gap-3">
            <SparklesIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              AI Image Renamer
            </h1>
          </div>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
            Upload your images and let AI generate descriptive, SEO-friendly filenames instantly.
            Perfect for web-ready assets.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
