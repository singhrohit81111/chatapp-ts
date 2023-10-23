import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { Provider } from 'react-redux';
import store from './services/redux/store.tsx'

// if ('serviceWorker' in navigator) {
//   // Register the service worker
//   navigator.serviceWorker
//     .register('/firebase-messaging-sw.js') // Replace with the correct path to your service worker
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

