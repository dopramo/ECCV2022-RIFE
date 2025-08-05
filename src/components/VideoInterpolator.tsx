import React, { useState, useRef } from 'react';
import { Upload, Play, Download, Settings, Zap, Clock, Film } from 'lucide-react';
import VideoUpload from './VideoUpload';
import VideoPreview from './VideoPreview';
import ProcessingStatus from './ProcessingStatus';
import InterpolationSettings from './InterpolationSettings';

export interface InterpolationConfig {
  multiplier: number;
  targetFps: number | null;
  scale: number;
  model: string;
}

export interface ProcessingState {
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
  outputUrl?: string;
}

const VideoInterpolator: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [processing, setProcessing] = useState<ProcessingState>({
    status: 'idle',
    progress: 0,
    message: ''
  });
  const [config, setConfig] = useState<InterpolationConfig>({
    multiplier: 2,
    targetFps: null,
    scale: 1.0,
    model: 'RIFE_HD'
  });
  const [showSettings, setShowSettings] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setProcessing({ status: 'idle', progress: 0, message: '' });
  };

  const simulateProcessing = async () => {
    setProcessing({ status: 'processing', progress: 0, message: 'Initializing RIFE model...' });
    
    // Simulate processing steps
    const steps = [
      { progress: 10, message: 'Loading video frames...' },
      { progress: 25, message: 'Analyzing motion vectors...' },
      { progress: 40, message: 'Generating intermediate frames...' },
      { progress: 60, message: 'Applying temporal smoothing...' },
      { progress: 80, message: 'Encoding output video...' },
      { progress: 95, message: 'Finalizing...' },
      { progress: 100, message: 'Processing complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessing(prev => ({ 
        ...prev, 
        progress: step.progress, 
        message: step.message 
      }));
    }

    // Simulate output (in real implementation, this would be the processed video)
    setProcessing(prev => ({ 
      ...prev, 
      status: 'completed',
      outputUrl: videoUrl // In reality, this would be the interpolated video URL
    }));
  };

  const handleStartProcessing = () => {
    if (!uploadedFile) return;
    simulateProcessing();
  };

  const handleDownload = () => {
    if (processing.outputUrl) {
      const link = document.createElement('a');
      link.href = processing.outputUrl;
      link.download = `interpolated_${uploadedFile?.name || 'video.mp4'}`;
      link.click();
    }
  };

  const resetAll = () => {
    setUploadedFile(null);
    setVideoUrl('');
    setProcessing({ status: 'idle', progress: 0, message: '' });
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-effect rounded-3xl p-8 shadow-2xl">
        {!uploadedFile ? (
          <VideoUpload onFileUpload={handleFileUpload} />
        ) : (
          <div className="space-y-8">
            {/* Video Preview Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Film className="mr-2" size={24} />
                  Original Video
                </h3>
                <VideoPreview videoUrl={videoUrl} />
              </div>
              
              {processing.status === 'completed' && processing.outputUrl && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Zap className="mr-2" size={24} />
                    Interpolated Video
                  </h3>
                  <VideoPreview videoUrl={processing.outputUrl} />
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Settings className="mr-2" size={20} />
                  Interpolation Settings
                </h3>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {showSettings ? 'Hide' : 'Show'} Settings
                </button>
              </div>
              
              {showSettings && (
                <InterpolationSettings config={config} onChange={setConfig} />
              )}
            </div>

            {/* Processing Status */}
            {processing.status !== 'idle' && (
              <ProcessingStatus processing={processing} />
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              {processing.status === 'idle' && (
                <button
                  onClick={handleStartProcessing}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                >
                  <Play className="mr-2" size={20} />
                  Start Interpolation
                </button>
              )}
              
              {processing.status === 'completed' && (
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                >
                  <Download className="mr-2" size={20} />
                  Download Result
                </button>
              )}
              
              <button
                onClick={resetAll}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
              >
                <Upload className="mr-2" size={20} />
                Upload New Video
              </button>
            </div>

            {/* Video Info */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">Video Information</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">File Name:</span>
                  <span className="text-white">{uploadedFile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">File Size:</span>
                  <span className="text-white">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Interpolation:</span>
                  <span className="text-white">{config.multiplier}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Model:</span>
                  <span className="text-white">{config.model}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInterpolator;