
import React, { useState } from 'react';
import { ModelConfig, ChatMessage } from '../types';
import { PRESET_MODELS } from '../constants';
import { geminiService } from '../services/geminiService';

interface SidebarProps {
  currentModel: ModelConfig;
  onSelectModel: (model: ModelConfig) => void;
  onFileUpload: (file: File) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModel, onSelectModel, onFileUpload }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await geminiService.getChatResponse(input, currentModel.name);
    const aiMsg: ChatMessage = { role: 'assistant', content: response };
    
    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full lg:w-96 flex flex-col gap-6 p-6 h-full overflow-y-auto bg-white border-r border-gray-200">
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Preset Models</h3>
        <div className="grid grid-cols-1 gap-3">
          {PRESET_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all border-2 ${
                currentModel.id === model.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-transparent bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <img src={model.thumbnail} alt={model.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="text-left">
                <p className="font-medium text-gray-900">{model.name}</p>
                <p className="text-xs text-gray-500 truncate w-40">{model.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Import Your Own</h3>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
            <p className="text-xs text-gray-400">GLB or GLTF files only</p>
          </div>
          <input type="file" className="hidden" accept=".glb,.gltf" onChange={handleFileChange} />
        </label>
      </section>

      <section className="border-t pt-6 flex-grow flex flex-col">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">AR Assistant</h3>
        <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[300px] pr-2 scrollbar-thin">
          {messages.length === 0 && (
            <p className="text-sm text-gray-400 italic text-center py-4">Ask me anything about AR or these models!</p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-400 px-4 py-2 rounded-2xl text-xs animate-pulse">
                Assistant is thinking...
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the model..."
            className="w-full px-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 p-1 disabled:text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </section>
    </div>
  );
};

export default Sidebar;
