import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './App.css';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./__mocks__/browser');
    await worker.start();
  }
}

await enableMocking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
