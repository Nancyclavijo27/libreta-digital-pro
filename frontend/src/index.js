import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

import AuthProvider from "./context/AuthContext";   // 👈 IMPORTANTE

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>     {/* 👈 ENVUELVE TODA LA APP */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();