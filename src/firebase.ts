import { arrayUnion, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage, } from "firebase/messaging";
import { useDispatch } from "react-redux";


const firebaseConfig = {
  apiKey: "AIzaSyDXnxxy6xSJmMJaho3no_ga4C5z5ws1n-Y",
  authDomain: "chatapp-b7a1e.firebaseapp.com",
  projectId: "chatapp-b7a1e",
  storageBucket: "chatapp-b7a1e.appspot.com",
  messagingSenderId: "212311580797",
  appId: "1:212311580797:web:8f7b068e774a697f2cd114"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export const requestPermission = () => {
  console.log("Requesting User Permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");
      getToken(messaging, { vapidKey: `BLdM0J7caCmdp7pV_u169mSfeLikVs7glFzfe3cXGc4qUfLV8yI-XLkJp4x9dEf7Flj2PuomQgX3ohHMw7ERj34` }) // Replace with your VAPID key
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token:", currentToken);
            
            // Store the current token in Firestore
          
            const userDocRef = doc(db, "users", "user-id-here"); // Replace "user-id-here" with the actual user ID
            //const currentTokens = userDocSnapshot.data().fcmToken || [];

            //const updatedTokens = arrayUnion(currentTokens, [currentToken]);
            setDoc(userDocRef, { fcmToken: currentToken }, { merge: true })
              .then(() => {
                console.log("FCM token stored in Firestore.");
              })
              .catch((error) => {
                console.error("Error storing FCM token in Firestore:", error);
              });

          } else {
            console.log("Failed to generate the app registration token.");
          }
        })
        .catch((err) => {
          console.log("An error occurred when requesting to receive the token.", err);
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload, "-------", messaging);
      resolve(payload);
    });
  });

export default app;




