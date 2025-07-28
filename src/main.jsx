import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App3.jsx'; // Make sure this path is correct, .jsx or .js
import './index.css'; // Vite's default CSS import, can be empty or removed if not used

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);