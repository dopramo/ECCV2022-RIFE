import React from 'react';
import VideoInterpolator from './components/VideoInterpolator';

function App() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            RIFE Video Interpolator
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Transform your low frame rate videos into smooth, high-quality footage using 
            state-of-the-art AI frame interpolation technology
          </p>
        </div>
        
        <VideoInterpolator />
        
        <div className="mt-16 text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Upload Video</h3>
                <p className="text-white/70">Upload your low frame rate video file</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI Processing</h3>
                <p className="text-white/70">RIFE AI generates intermediate frames</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Download</h3>
                <p className="text-white/70">Get your smooth, interpolated video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;