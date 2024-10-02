// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyA4YJJ7iTzp6JaDs5T1M1lBAHbKxeFwFfo",
  authDomain: "midvn-notifications-server.firebaseapp.com",
  projectId: "midvn-notifications-server",
  storageBucket: "midvn-notifications-server.appspot.com",
  messagingSenderId: "191658143320",
  appId: "1:191658143320:web:60f9f0fe44f1f59650a42d",
  measurementId: "G-N3GNEV2ZLY",
};
firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message", payload);
});
