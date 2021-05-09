import React from 'react';
 
const FirebaseContext = React.createContext(null);
 
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;

// ====  The createContext() function essentially creates two components.=====

// == 1) FirebaseContext.Provider component
//    which is used to provide a Firebase instance once at the top-level 
//    of your React component tree

// == 2) FirebaseContext.Consumer component
//    which  is used to retrieve the Firebase instance if it is needed 
//    in the React component.