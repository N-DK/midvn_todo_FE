import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { addFirebaseToken } from "../apis/firebaseAPI"
import storage from "./storage"

const firebaseConfig = {
  apiKey: "AIzaSyA4YJJ7iTzp6JaDs5T1M1lBAHbKxeFwFfo",
  authDomain: "midvn-notifications-server.firebaseapp.com",
  projectId: "midvn-notifications-server",
  storageBucket: "midvn-notifications-server.appspot.com",
  messagingSenderId: "191658143320",
  appId: "1:191658143320:web:60f9f0fe44f1f59650a42d",
  measurementId: "G-N3GNEV2ZLY",
}

const vapidKey =
  "BAGaaLkkqXi8rj24oksJsQpQk-8I5BYum_TojNLhceLx929d7g2vQ-jMtmDWSB2iZUB_FL231tuSfCNv0VLI_LY"

const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      // console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err)
    })
}

export const requestFCMToken = async () => {
  return Notification.requestPermission()
    .then(async (permission) => {
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: vapidKey,
        })
        storage.setItem("fcmToken", token)
        await addFirebaseToken(token)

        return token
      } else {
        console.log("Unable to get permission to notify.")
      }
    })
    .catch((err) => {})
}

export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Received message payload:", payload)
    callback(payload) // Gọi callback mỗi khi nhận được thông báo
  })
}
