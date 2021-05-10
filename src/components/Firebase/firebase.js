import app from 'firebase/app';
import 'firebase/auth'; 

const config = {
    apiKey: "AIzaSyDNugTak6keGEauQTA0EeqFeoD-EQC3q0M",
    authDomain: "react-auth-36906.firebaseapp.com",
    projectId: "react-auth-36906",
    storageBucket: "react-auth-36906.appspot.com",
    messagingSenderId: "1023559421228",
    appId: "1:1023559421228:web:3433264b6505958b7a3089",
    measurementId: "G-RSNL5QBTHB"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // *** Auth API ***

    // sign up function (registration) takes email and password parameters
    // for its function signature and uses an official Firebase API endpoint to create a user:
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    // set up the login/sign-in function, which takes email and password parameters
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // firebase knows about the currently authenticated user. so no need to pass any argument   
    doSignOut = () => this.auth.signOut();

    // authentication methods to reset and change a password for an authenticated user:
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}


export default Firebase;



// ======  one project for your development environment and one project for your production environment ========
 
// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
//   };
   
//   const devConfig = {
//     apiKey: process.env.REACT_APP_DEV_API_KEY,
//     authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//     projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
//   };
   
//   const config =
//     process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
   
//   class Firebase {
//     constructor() {
//       app.initializeApp(config);
//     }
//   }