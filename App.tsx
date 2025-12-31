
import React, { useState, useCallback } from 'react';
import { ModelConfig } from './types';
import { PRESET_MODELS, APP_TITLE } from './constants';
import Viewer from './components/Viewer';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [currentModel, setCurrentModel] = useState<ModelConfig>(PRESET_MODELS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelectModel = (model: ModelConfig) => {
    setCurrentModel(model);
  };

  const handleFileUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const customModel: ModelConfig = {
      id: `custom-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ""),
      url: url,
      thumbnail: 'https://picsum.photos/seed/custom/200/200',
      description: 'Your own custom-uploaded 3D model.'
    };
    setCurrentModel(customModel);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1V18.5M7 18l2 1m-2-1l2-1m-2 1V15.5M14 4v2.5M4 14v2.5M17 18v2.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{APP_TITLE}</h1>
        </div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block absolute lg:relative z-40 inset-0 lg:inset-auto`}>
          {/* Overlay for mobile */}
          <div 
            className="lg:hidden absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsSidebarOpen(false)} 
          />
          <div className="relative h-full bg-white w-full sm:w-80 lg:w-96">
            <Sidebar 
              currentModel={currentModel} 
              onSelectModel={handleSelectModel} 
              onFileUpload={handleFileUpload} 
            />
          </div>
        </div>

        {/* Viewer Area */}
        <main className="flex-1 p-4 lg:p-8 flex flex-col gap-4 overflow-y-auto">
          <div className="flex-1 min-h-[400px]">
            <Viewer model={currentModel} />
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentModel.name}</h2>
                <p className="text-gray-600 mt-1 max-w-2xl">{currentModel.description}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">AR Compatible</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">WebGL 2.0</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
