import React from 'react';
import { InterpolationConfig } from './VideoInterpolator';
import { Settings, Zap, Monitor, Cpu } from 'lucide-react';

interface InterpolationSettingsProps {
  config: InterpolationConfig;
  onChange: (config: InterpolationConfig) => void;
}

const InterpolationSettings: React.FC<InterpolationSettingsProps> = ({ config, onChange }) => {
  const handleMultiplierChange = (multiplier: number) => {
    onChange({ ...config, multiplier, targetFps: null });
  };

  const handleTargetFpsChange = (targetFps: number | null) => {
    onChange({ ...config, targetFps, multiplier: targetFps ? 0 : config.multiplier });
  };

  const handleScaleChange = (scale: number) => {
    onChange({ ...config, scale });
  };

  const handleModelChange = (model: string) => {
    onChange({ ...config, model });
  };

  return (
    <div className="space-y-6">
      {/* Interpolation Method */}
      <div>
        <label className="block text-white font-medium mb-3 flex items-center">
          <Zap className="mr-2" size={18} />
          Interpolation Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleTargetFpsChange(null)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${!config.targetFps
                ? 'border-blue-400 bg-blue-500/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }
            `}
          >
            <div className="font-semibold mb-1">Frame Multiplier</div>
            <div className="text-sm opacity-80">Multiply existing frames</div>
          </button>
          <button
            onClick={() => handleTargetFpsChange(60)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${config.targetFps
                ? 'border-blue-400 bg-blue-500/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }
            `}
          >
            <div className="font-semibold mb-1">Target FPS</div>
            <div className="text-sm opacity-80">Set specific frame rate</div>
          </button>
        </div>
      </div>

      {/* Frame Multiplier Settings */}
      {!config.targetFps && (
        <div>
          <label className="block text-white font-medium mb-3">
            Frame Multiplier: {config.multiplier}x
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 4, 8, 16].map((multiplier) => (
              <button
                key={multiplier}
                onClick={() => handleMultiplierChange(multiplier)}
                className={`
                  py-2 px-4 rounded-lg transition-all duration-300 font-medium
                  ${config.multiplier === multiplier
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }
                `}
              >
                {multiplier}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Target FPS Settings */}
      {config.targetFps && (
        <div>
          <label className="block text-white font-medium mb-3">
            Target FPS: {config.targetFps}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[30, 60, 120, 240].map((fps) => (
              <button
                key={fps}
                onClick={() => handleTargetFpsChange(fps)}
                className={`
                  py-2 px-4 rounded-lg transition-all duration-300 font-medium
                  ${config.targetFps === fps
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }
                `}
              >
                {fps}fps
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Processing Scale */}
      <div>
        <label className="block text-white font-medium mb-3 flex items-center">
          <Monitor className="mr-2" size={18} />
          Processing Scale: {config.scale}x
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[0.5, 1.0, 2.0, 4.0].map((scale) => (
            <button
              key={scale}
              onClick={() => handleScaleChange(scale)}
              className={`
                py-2 px-4 rounded-lg transition-all duration-300 font-medium
                ${config.scale === scale
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
                }
              `}
            >
              {scale}x
            </button>
          ))}
        </div>
        <p className="text-white/60 text-sm mt-2">
          Lower scale for 4K videos, higher scale for better quality on smaller videos
        </p>
      </div>

      {/* Model Selection */}
      <div>
        <label className="block text-white font-medium mb-3 flex items-center">
          <Cpu className="mr-2" size={18} />
          RIFE Model
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 'RIFE_HD', name: 'RIFE HD', desc: 'High quality, slower processing' },
            { id: 'RIFE_HDv2', name: 'RIFE HD v2', desc: 'Improved quality and speed' },
            { id: 'RIFE_HDv3', name: 'RIFE HD v3', desc: 'Latest model, best results' },
            { id: 'RIFE_m', name: 'RIFE Mobile', desc: 'Faster processing, good quality' }
          ].map((model) => (
            <button
              key={model.id}
              onClick={() => handleModelChange(model.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${config.model === model.id
                  ? 'border-green-400 bg-green-500/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
                }
              `}
            >
              <div className="font-semibold mb-1">{model.name}</div>
              <div className="text-sm opacity-80">{model.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Options Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <h4 className="text-blue-200 font-semibold mb-2 flex items-center">
          <Settings className="mr-2" size={16} />
          Processing Tips
        </h4>
        <ul className="text-blue-200/80 text-sm space-y-1">
          <li>• Use 0.5x scale for 4K videos to reduce processing time</li>
          <li>• Higher multipliers create smoother motion but take longer</li>
          <li>• RIFE HD v3 provides the best quality for most videos</li>
          <li>• Target FPS mode is better for matching specific output requirements</li>
        </ul>
      </div>
    </div>
  );
};

export default InterpolationSettings;