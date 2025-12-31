
import { ModelConfig } from './types';

export const PRESET_MODELS: ModelConfig[] = [
  {
    id: 'cube',
    name: 'Geometric Cube',
    url: 'https://modelviewer.dev/shared-assets/models/box_with_materials.glb',
    thumbnail: 'https://picsum.photos/seed/cube1/200/200',
    description: 'A standard 3D cube with basic material properties, ideal for testing spatial dimensions.'
  },
  {
    id: 'sphere',
    name: 'Abstract Sphere',
    url: 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    thumbnail: 'https://picsum.photos/seed/sphere1/200/200',
    description: 'A detailed spherical model demonstrating complex textures and PBR materials.'
  },
  {
    id: 'cylinder',
    name: 'Industrial Cylinder',
    url: 'https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/ToyCar/glTF-Binary/ToyCar.glb',
    thumbnail: 'https://picsum.photos/seed/car1/200/200',
    description: 'A high-fidelity mechanical model used to demonstrate complex 3D geometry in AR.'
  }
];

export const APP_TITLE = "VisionAR";
