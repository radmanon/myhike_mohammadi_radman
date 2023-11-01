//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBnYUfqyLku-Yu3n51ACdPARF1Pu1ImvlM",
    authDomain: "comp1800-fb693.firebaseapp.com",
    projectId: "comp1800-fb693",
    storageBucket: "comp1800-fb693.appspot.com",
    messagingSenderId: "1085465055470",
    appId: "1:1085465055470:web:977adf4c1e44d615f523ff"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();