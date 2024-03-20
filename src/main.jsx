import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import MainComponent from './components/MainComponent.jsx';
import { getMessaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNSN7aVdmPZMk0TOykTVs7_8B2r4HzetI",
  authDomain: "notifytask-ff85e.firebaseapp.com",
  projectId: "notifytask-ff85e",
  storageBucket: "notifytask-ff85e.appspot.com",
  messagingSenderId: "419957352088",
  appId: "1:419957352088:web:6d83e47c8803eff5fa12ed"
};

const messaging = getMessaging(initializeApp(firebaseConfig));

onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
   // Show notification
   if (Notification.permission === "granted") {
    // If notification permission is granted, show the notification
    const { title, body } = payload.notification;
    new Notification(title, { body });
} else {
    // If notification permission is not granted, request permission from the user
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            const { title, body } = payload.notification;
            new Notification(title, { body });
        } else {
            console.log("Notification permission denied.");
        }
    });
}

});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>,
)
