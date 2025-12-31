
import React, { useRef, useEffect } from 'react';
import { ModelConfig } from '../types';

interface ViewerProps {
  model: ModelConfig;
}

const Viewer: React.FC<ViewerProps> = ({ model }) => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    // Optional: add event listeners for model-viewer specific events
    const viewer = viewerRef.current;
    if (viewer) {
      const onArStatus = (event: any) => {
        console.log('AR status:', event.detail.status);
      };
      viewer.addEventListener('ar-status', onArStatus);
      return () => viewer.removeEventListener('ar-status', onArStatus);
    }
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      <model-viewer
        ref={viewerRef}
        src={model.url}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        poster={model.thumbnail}
        shadow-intensity="1"
        exposure="1"
        auto-rotate
        touch-action="pan-y"
        alt={`A 3D model of ${model.name}`}
        className="w-full h-full"
      >
        <button 
          slot="ar-button" 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-xl transition-all active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
          View in Your Space
        </button>

        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white">
          <h2 className="text-lg font-bold">{model.name}</h2>
          <p className="text-xs text-gray-300">Model ID: {model.id}</p>
        </div>
      </model-viewer>
    </div>
  );
};

export default Viewer;
