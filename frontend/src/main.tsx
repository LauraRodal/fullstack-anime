import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx'; // Asegúrate de que la extensión es .tsx si estás usando TypeScript

createRoot(document.getElementById('root')!).render( // El `!` es para decirle a TypeScript que confíe en que el elemento existe
  <StrictMode>
    <App />
  </StrictMode>,
);
