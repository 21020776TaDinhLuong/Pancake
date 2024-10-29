import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your application
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Performance measuring
reportWebVitals();
