//------------------------------------------------------------------------------
//
//  localFirebase.js
//  This firebase boilerplate begins with a login interface
//  upon login, you are taken to a page where you may send push notifications
//
//  TODO: Create database references to html elements in here with the following
//  format:
//
//  ex. HTML: <div class = "sample"></div>
//      firebase.html: const sample = document.querySelector('.sample');
//                   var databaseRef = firebase.database().ref().child('text');
//                   databaseRef.on('value', snap => sample.textContent = snap.val());
//
//------------------------------------------------------------------------------
// SECTION 0: Initialize Firebase and add references in this section
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

//------------------------------------------------------------------------------
// SECTION 1: "Synchronize_textContent_with_firebase": add database references here
//------------------------------------------------------------------------------

  const sample = document.querySelector('.sample');
  var databaseRef = firebase.database().ref().child('text'); //.child gives the name of the field (key) you are changing in Firebase
  databaseRef.on('value', snap => sample.innerText = snap.val()); //value is the value that is written to the key above ('text')

//------------------------------------------------------------------------------
// SECTION 2: "Web_auth_with_firebase"
//------------------------------------------------------------------------------

//create references to HTML elements
  const emailInput = document.querySelector('input#email');
  const passwordInput = document.querySelector('input#password');
  const login = document.querySelector('button#login');
  const logout = document.querySelector('button#logout');
  const signup = document.querySelector('button#signup');

//To enable additional ways to sign in, change the settings in the firebase dashboard under authentication
//Login through email and password
  login.addEventListener('click', event => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth(); //auth framework for firebase
    auth.signInWithEmailAndPassword(email, password).catch(event => { //this function catches if there is no known user
      emailInput.value = "";
      passwordInput.value = "";
      emailInput.placeholder = "This user doesn't exist";
    });
  });

//create a user
  signup.addEventListener('click', event => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const auth = firebase.auth(); //auth framework for firebase
    auth.createUserWithEmailAndPassword(email, password).catch(event => { //Update with error messages if signup fails, display failure message
      emailInput.value = "";
      passwordInput.value = "";
      emailInput.placeholder = event.message;
    });
  });

//listen for logout
  logout.addEventListener('click', event => {
    firebase.auth().signOut()
  });

//realtime listener for login, and populates firebaseUser object with user information
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) { //upon login, call the following lines of code
      logout.classList.remove('inactive');
      document.querySelector('.userName').textContent = "Logged in as: " + firebaseUser.email;
      emailInput.value = "";
      passwordInput.value = "";
      emailInput.placeholder = "Email";
      passwordInput.placeholder = "Password";
      document.querySelector('.Web_Auth_with_firebase').classList.add('inactive');
      document.querySelector('.PushNotifications').classList.remove('inactive');
    }
    else { //upon login, call the following lines of code
      logout.classList.add('inactive');
      document.querySelector('.Web_Auth_with_firebase').classList.remove('inactive');
      document.querySelector('.PushNotifications').classList.add('inactive');
      document.querySelector('.userName').textContent = "";
    }
    console.log(firebaseUser); //for debugging purposes
  });

//------------------------------------------------------------------------------
// SECTION 3: "Push Notifications"
//------------------------------------------------------------------------------

  const pushPage = document.querySelector('.PushNotifications');
  pushPage.classList.add('inactive');

  const messaging = firebase.messaging();
  messaging.requestPermission().then(function() {
    console.log('has permission');
    return messaging.getToken();
  }).then(function(token) { //ERROR: doesn't send a token on a static page
    console.log(token); //normally send to server to send message to that token later (FCM API with this token)
  }).catch(function(err) {
    console.log('denied permission with error: ' + err);
  });

  messaging.onMessage(function(payload) {
    console.log("On Message: " + payload);
  });

//If closed, service worker receives the push Notification
//If open, web server receives the push Notification
