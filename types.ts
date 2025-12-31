
import React from 'react';

export interface ModelConfig {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Augment the global JSX namespace to include the custom 'model-viewer' element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        poster?: string;
        'shadow-intensity'?: string;
        exposure?: string;
        'auto-rotate'?: boolean;
        'touch-action'?: string;
        alt?: string;
        className?: string;
      };
    }
  }
}
