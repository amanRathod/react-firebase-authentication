import React from 'react';
import ReactDOM from 'react-dom';
 
import './index.css';
 
import App from './components/App';
// import Firebase instance to your entire application
import Firebase, { FirebaseContext } from './components/Firebase';
 
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
  );

//   every component that is interested in using Firebase has access 
//   to the Firebase instance with a FirebaseContext.Consumer component.