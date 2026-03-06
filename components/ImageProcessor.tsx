import React, { useState, useCallback } from 'react';
import { ImageFile } from '../types';
import { generateImageName } from '../services/geminiService';
import ImageCard from './ImageCard';
import { UploadIcon } from './icons/UploadIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';
import { BoltIcon } from './icons/BoltIcon';

const ImageProcessor: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newImageFiles: ImageFile[] = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        file,
        previewUrl: URL.createObjectURL(file),
        originalName: file.name,
        newName: '',
        status: 'pending',
      }));

    setImages((prev) => [...prev, ...newImageFiles]);
  };

  const handleProcessImages = useCallback(async () => {
    if (images.every((img) => img.status !== 'pending')) {
      return;
    }
    setIsProcessing(true);

    const processingPromises = images.map((imageFile) => {
      if (imageFile.status === 'pending') {
        setImages((prev) =>
          prev.map((img) => (img.id === imageFile.id ? { ...img, status: 'processing' } : img)),
        );
        return generateImageName(imageFile.file)
          .then((newName) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === imageFile.id ? { ...img, newName, status: 'processed' } : img,
              ),
            );
          })
          .catch((error) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === imageFile.id
                  ? { ...img, status: 'error', errorMessage: error.message }
                  : img,
              ),
            );
          });
      }
      return Promise.resolve();
    });

    await Promise.all(processingPromises);
    setIsProcessing(false);
  }, [images]);

  const handleDownloadAll = () => {
    images.forEach((imageFile) => {
      if (imageFile.status === 'processed' && imageFile.newName) {
        const link = document.createElement('a');
        link.href = imageFile.previewUrl;
        const extension = imageFile.originalName.split('.').pop();
        link.download = `${imageFile.newName}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const updateImageName = (id: string, newName: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, newName } : img)));
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const hasPending = images.some((img) => img.status === 'pending');
  const hasProcessed = images.some((img) => img.status === 'processed');

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="p-4 rounded-lg bg-slate-800 border-2 border-dashed border-slate-600">
        <label
          htmlFor="file-upload"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center p-8 rounded-md cursor-pointer transition-colors ${isDragging ? 'bg-slate-700' : 'bg-slate-800 hover:bg-slate-700/50'}`}
        >
          <UploadIcon className="w-12 h-12 text-slate-500 mb-4" />
          <span className="font-semibold text-lg text-slate-300">Drag & Drop images here</span>
          <span className="text-slate-400">or click to browse</span>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </label>
      </div>

      {images.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sticky top-[73px] z-10 bg-slate-900/80 backdrop-blur-sm py-4 rounded-lg">
            <button
              onClick={handleProcessImages}
              disabled={isProcessing || !hasPending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-cyan-600 rounded-md shadow-lg transition-all hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <BoltIcon className="w-5 h-5" />
              {isProcessing
                ? 'Processing...'
                : `Generate Names (${images.filter((i) => i.status === 'pending').length})`}
            </button>
            <button
              onClick={handleDownloadAll}
              disabled={!hasProcessed}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-purple-600 rounded-md shadow-lg transition-all hover:bg-purple-500 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download All Renamed
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {images.map((imageFile) => (
              <ImageCard
                key={imageFile.id}
                imageFile={imageFile}
                onNameChange={(newName) => updateImageName(imageFile.id, newName)}
                onRemove={() => removeImage(imageFile.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageProcessor;
