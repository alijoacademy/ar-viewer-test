
import React from 'react';

export interface ModelConfig {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  description: string;
}

// Fix invalid module augmentation error by using declare global for custom element support in JSX
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
