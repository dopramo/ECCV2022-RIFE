import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { ProcessingState } from './VideoInterpolator';

interface ProcessingStatusProps {
  processing: ProcessingState;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ processing }) => {
  const getStatusIcon = () => {
    switch (processing.status) {
      case 'processing':
        return <Loader2 className="animate-spin" size={24} />;
      case 'completed':
        return <CheckCircle className="text-green-400" size={24} />;
      case 'error':
        return <AlertCircle className="text-red-400" size={24} />;
      default:
        return <Zap size={24} />;
    }
  };

  const getStatusColor = () => {
    switch (processing.status) {
      case 'processing':
        return 'from-blue-500 to-purple-600';
      case 'completed':
        return 'from-green-500 to-teal-600';
      case 'error':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = () => {
    switch (processing.status) {
      case 'processing':
        return 'Processing Video';
      case 'completed':
        return 'Processing Complete';
      case 'error':
        return 'Processing Error';
      default:
        return 'Ready to Process';
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold text-white">
            {getStatusText()}
          </h3>
        </div>
        <span className="text-white/70 text-sm">
          {processing.progress}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getStatusColor()} transition-all duration-500 ease-out relative`}
            style={{ width: `${processing.progress}%` }}
          >
            {processing.status === 'processing' && (
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Status Message */}
      <p className="text-white/80 text-sm mb-4">
        {processing.message}
      </p>

      {/* Processing Steps Indicator */}
      {processing.status === 'processing' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {[
            { step: 'Load', threshold: 10 },
            { step: 'Analyze', threshold: 25 },
            { step: 'Generate', threshold: 60 },
            { step: 'Encode', threshold: 95 }
          ].map((item, index) => (
            <div
              key={index}
              className={`
                p-2 rounded-lg text-center transition-all duration-300
                ${processing.progress >= item.threshold
                  ? 'bg-blue-500/30 text-blue-200'
                  : 'bg-white/5 text-white/50'
                }
              `}
            >
              {item.step}
            </div>
          ))}
        </div>
      )}

      {/* Estimated Time */}
      {processing.status === 'processing' && (
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Estimated time remaining: {Math.max(1, Math.ceil((100 - processing.progress) / 10))} minutes
          </p>
        </div>
      )}

      {/* Success Message */}
      {processing.status === 'completed' && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
          <p className="text-green-200 text-sm text-center">
            🎉 Your video has been successfully interpolated! The frame rate has been increased while maintaining smooth motion.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;