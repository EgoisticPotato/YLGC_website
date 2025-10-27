import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import fonts
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/900.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);