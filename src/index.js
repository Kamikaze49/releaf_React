import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCG1CsGY6U1jf9m23RmSHyncZ8u1Wd47yM",
    authDomain: "releaf-ba461.firebaseapp.com",
    databaseURL: "https://releaf-ba461.firebaseio.com",
    projectId: "releaf-ba461",
    storageBucket: "releaf-ba461.appspot.com",
    messagingSenderId: "445697150152",
    appId: "1:445697150152:web:15e18217df2955965969fd",
    measurementId: "G-PWX9JGKHSK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const storage = firebase.storage();
  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
