
import React, { useState, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ModelConfig } from './types';

// Preset models using reliable official assets
const PRESET_MODELS: ModelConfig[] = [
  {
    id: 'box',
    name: 'Simple Box',
    url: 'https://modelviewer.dev/shared-assets/models/Box.glb',
    thumbnail: 'https://images.unsplash.com/photo-1590073844006-3a44b7a70085?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'A fundamental geometric cube for spatial testing.'
  },
  {
    id: 'astronaut',
    name: 'Astronaut',
    url: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'The classic explorer, perfect for human-scale AR testing.'
  },
  {
    id: 'chair',
    name: 'Cosy Chair',
    url: 'https://modelviewer.dev/shared-assets/models/Chair.glb',
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=200&h=200',
    description: 'Modern furniture piece with high-fidelity textures.'
  }
];

const App: React.FC = () => {
  const [currentModel, setCurrentModel] = useState<ModelConfig>(PRESET_MODELS[0]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newModel: ModelConfig = {
        id: `custom-${Date.now()}`,
        name: file.name.split('.')[0],
        url: url,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=200&h=200',
        description: 'User imported 3D model.'
      };
      setCurrentModel(newModel);
      setAiInsight(null);
    }
  };

  const getAiInsight = async () => {
    setIsLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am looking at a 3D model of ${currentModel.name}. Its description is: ${currentModel.description}. Give me a 1-sentence interesting fact or creative suggestion for placing this in AR.`,
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });
      setAiInsight(response.text || "Unable to generate insight.");
    } catch (err) {
      setAiInsight("AI Insights unavailable. Check API key.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
      {/* Sidebar Selection */}
      <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-blue-600 flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z"></path></svg>
            VisionAR
          </h1>
          <p className="text-gray-500 text-sm mt-1">Ready for Augmented Reality</p>
        </div>

        <section className="space-y-4 mb-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Library</h2>
          {PRESET_MODELS.map(model => (
            <button
              key={model.id}
              onClick={() => { setCurrentModel(model); setAiInsight(null); }}
              className={`w-full flex items-center gap-3 p-2 rounded-xl border-2 transition-all ${
                currentModel.id === model.id ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-gray-100'
              }`}
            >
              <img src={model.thumbnail} className="w-12 h-12 rounded-lg object-cover" alt={model.name} />
              <span className="font-medium text-gray-700">{model.name}</span>
            </button>
          ))}
        </section>

        <section className="mt-auto">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Import GLB
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".glb,.gltf" className="hidden" />
        </section>
      </aside>

      {/* Viewer Main */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden relative">
        <div className="flex-1 bg-gray-200 rounded-3xl overflow-hidden shadow-inner relative border border-gray-300">
          <model-viewer
            src={currentModel.url}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            className="w-full h-full"
            alt={`3D Model: ${currentModel.name}`}
          >
            <button slot="ar-button" className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-700 active:scale-95 transition-all">
              Launch AR Experience
            </button>
          </model-viewer>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900">{currentModel.name}</h3>
            <p className="text-gray-500 text-sm">{aiInsight || currentModel.description}</p>
          </div>
          <button 
            onClick={getAiInsight}
            disabled={isLoadingAi}
            className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-200 flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            <svg className={`w-4 h-4 ${isLoadingAi ? 'animate-spin' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
            {isLoadingAi ? 'Consulting AI...' : 'Magic Insight'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
