 // Scripts for firebase and firebase messaging
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// import firebase from "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js";
// import "https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js";  


 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
    apiKey: "AIzaSyBNSN7aVdmPZMk0TOykTVs7_8B2r4HzetI",
    authDomain: "notifytask-ff85e.firebaseapp.com",
    projectId: "notifytask-ff85e",
    storageBucket: "notifytask-ff85e.appspot.com",
    messagingSenderId: "419957352088",
    appId: "1:419957352088:web:6d83e47c8803eff5fa12ed"
 };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

