import React, { useCallback, useState } from 'react';
import { Upload, Film, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  onFileUpload: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/webm'];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid video file (MP4, AVI, MOV, MKV, WebM)');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 100MB');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onFileUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="text-center">
      <div
        className={`
          relative border-3 border-dashed rounded-3xl p-12 transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50/10 upload-area-active' 
            : 'border-white/30 hover:border-white/50 upload-area'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-6">
          <div className="relative">
            <div className={`
              w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-300
              ${isDragOver ? 'bg-blue-500 scale-110' : 'bg-white/20'}
            `}>
              {isDragOver ? (
                <Upload className="w-12 h-12 text-white animate-bounce" />
              ) : (
                <Film className="w-12 h-12 text-white" />
              )}
            </div>
            {isDragOver && (
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-blue-400/20 animate-ping"></div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {isDragOver ? 'Drop your video here' : 'Upload Your Video'}
            </h3>
            <p className="text-white/70 text-lg mb-4">
              Drag and drop your video file or click to browse
            </p>
            <p className="text-white/50 text-sm">
              Supported formats: MP4, AVI, MOV, MKV, WebM (Max: 100MB)
            </p>
          </div>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg">
            <Upload className="mr-2" size={20} />
            Choose File
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-red-200">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}
      
      <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-bold text-white">✓</span>
          </div>
          <h4 className="font-semibold text-white mb-1">High Quality</h4>
          <p className="text-white/70">Advanced AI preserves video quality</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-bold text-white">⚡</span>
          </div>
          <h4 className="font-semibold text-white mb-1">Fast Processing</h4>
          <p className="text-white/70">Optimized for quick results</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-bold text-white">🔒</span>
          </div>
          <h4 className="font-semibold text-white mb-1">Secure</h4>
          <p className="text-white/70">Your videos are processed locally</p>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;