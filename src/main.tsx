import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './main.scss';
import WithFirestore from './components/WithFirestore';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WithFirestore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WithFirestore>
  </React.StrictMode>
);
