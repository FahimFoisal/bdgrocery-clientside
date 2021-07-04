import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
    const [state, setState] = useState({
        isSignIn : false,
        displayName: '',
        email: '',
        password: ''
      })
      const provider = new firebase.auth.GoogleAuthProvider();
      const signIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
          const {displayName, email, photoURL} = res.user;
          const isSignedIn = {
            isSignIn : true,
            displayName : displayName,
            email: email
          }
          setLoggedInUser(isSignedIn);
          history.replace(from);
          setState(isSignedIn);
          console.log(displayName, email, photoURL)
        })
      }
      const signOut = () => {
        firebase.auth().signOut()
        .then(res => {
          const isSignOut = {
            isSignIn : false,
            displayName: '',
            email: '',
            error: '',
            success: false
          }
          setState(isSignOut);
        })
      }
    return (
        <div className="mt-5 gt-5">

            {
                <div class="text-center"><button class="btn btn-primary" onClick={signIn}><i class="fab fa-google"></i> Continue with Google</button></div>
            }
            
        </div>
    );
};

export default Login;