
import React from 'react';
import { ImageFile } from '../types';
import Loader from './Loader';
import { XCircleIcon } from './icons/XCircleIcon';

interface ImageCardProps {
  imageFile: ImageFile;
  onNameChange: (newName: string) => void;
  onRemove: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageFile, onNameChange, onRemove }) => {
  const { previewUrl, originalName, newName, status, errorMessage } = imageFile;

  return (
    <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:scale-105 group">
      <button onClick={onRemove} className="absolute top-2 right-2 z-10 p-1 bg-slate-900/50 rounded-full text-slate-300 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100">
        <XCircleIcon className="w-5 h-5" />
      </button>
      <div className="relative aspect-square">
        <img src={previewUrl} alt={originalName} className="w-full h-full object-cover" />
        {status === 'processing' && (
          <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
            <Loader />
          </div>
        )}
        {status === 'error' && (
             <div className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center p-2 text-center">
                <p className="text-sm font-semibold text-red-200">Error</p>
                <p className="text-xs text-red-300">{errorMessage}</p>
             </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-3">
            <label className="text-xs font-bold text-slate-400 block mb-1">Original Name</label>
            <p className="text-sm text-slate-300 truncate" title={originalName}>{originalName}</p>
        </div>
        <div>
            <label htmlFor={`newName-${imageFile.id}`} className="text-xs font-bold text-slate-400 block mb-1">
                New SEO Name
            </label>
            <input
                id={`newName-${imageFile.id}`}
                type="text"
                value={newName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="AI will generate a name..."
                className="w-full bg-slate-700 text-cyan-300 p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-sm transition-colors"
                disabled={status === 'processing'}
            />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
