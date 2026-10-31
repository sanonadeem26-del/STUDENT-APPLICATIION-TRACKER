import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Switch from './switch.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Switch />
  </StrictMode>
);
