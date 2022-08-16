// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

var firebaseConfig = {
    apiKey: "AIzaSyA1msCV6oobQEgoFstT3DK1IR6xZ3_pxbw",
    authDomain: "ask-freelancer.firebaseapp.com",
    projectId: "ask-freelancer",
    storageBucket: "ask-freelancer.appspot.com",
    messagingSenderId: "791877754371",
    appId: "1:791877754371:web:1181a0ee50e3ab9c48f836",
    measurementId: "G-B6TWMDJDFM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setFcmToken) => {
    return getToken(messaging, { vapidKey: 'BG0hySqUVEF6fgy6nvBKkBJV60SFH6NN2btP3Q7_y1T6YtuUfPFZLyidGe2gNHzBGn5XjUznSxDb8EKKJjTfh18' })
        .then((currentToken) => {
            if (currentToken) {
                setFcmToken = currentToken;
                // console.log(currentToken)
                return currentToken
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setFcmToken = '';
            }
        }).catch(err => {
            console.log('An error occurred while retrieving token. ', err);
        })
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });