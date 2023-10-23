

importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDXnxxy6xSJmMJaho3no_ga4C5z5ws1n-Y",
    authDomain: "chatapp-b7a1e.firebaseapp.com",
    projectId: "chatapp-b7a1e",
    storageBucket: "chatapp-b7a1e.appspot.com",
    messagingSenderId: "212311580797",
    appId: "1:212311580797:web:8f7b068e774a697f2cd114"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});