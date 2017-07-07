importScripts('https://www.gstatic.com/firebasejs/4.1.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.3/firebase-messaging.js');

//------------------------------------------------------------------------------
// INITIALIZE FIREBASE AS WE DID IN LOCALFIREBASE.JS
//------------------------------------------------------------------------------

var config = {
  apiKey: "AIzaSyDaDtZUYNTTSek85OzmwbrGwV2_ufnZ3kw",
  authDomain: "fir-boilerplate-d125e.firebaseapp.com",
  databaseURL: "https://fir-boilerplate-d125e.firebaseio.com",
  projectId: "fir-boilerplate-d125e",
  storageBucket: "",
  messagingSenderId: "846642053775"
};
firebase.initializeApp(config);
