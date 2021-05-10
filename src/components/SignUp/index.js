import React, { Component } from 'react';


import { Link,  withRouter  } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,     //  there is an error state to capture an error object in case of the sign up request to the Firebase API fails
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />

    {/* the SignUpForm has access to the Firebase instance via the higher-order component. */}
    {/* <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer> */}

  </div>
);

class SignUpFormBase extends Component {
  
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne) //If the request resolves successfully, you can set the local state of the component to its initial state to empty the input fields. 
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        // history =>  it allows us to redirect a user to another page by pushing a route to it.
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
      this.setState({ error }); //you will run into the catch block and set the error object in the local state.
    });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up</button>


        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// instead of using the Firebase Context directly in the SignUpPage,
//  which doesn't need to know about the Firebase instance, use the higher-order component to wrap your SignUpForm.
const SignUpForm =  withRouter(withFirebase(SignUpFormBase));
// to redirect a user to another page programmatically, React Router node package
// offers a higher-order component to make the router properties accessible in the props of a component. 
//  Any component that goes in the withRouter() higher-order component gains access to all the properties of the router,


export default SignUpPage;
 
export { SignUpForm, SignUpLink };

