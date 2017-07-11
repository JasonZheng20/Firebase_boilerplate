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

//------------------------------------------------------------------------------
// PUSH NOTIFICATION HANDLING
//------------------------------------------------------------------------------

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(message) {
  const title = "Title";
  const options = {
    body: message.data.status
  }
  return self.registration.showNotification(title, options);
});

// TESTING PUSH VIA WEB INSPECTOR / APPLICATION
// self.addEventListener('push', function(event) {
//   console.log('[Service Worker] Push Received.');
//   console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
//
//   const title = 'Push Codelab';
//   const options = {
//     body: 'Yay it works.'
//   };
//
//   event.waitUntil(self.registration.showNotification(title, options));
// });
