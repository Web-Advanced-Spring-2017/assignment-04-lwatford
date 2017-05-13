importScripts('https://www.gstatic.com/firebasejs/3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4/firebase-messaging.js');

// importScripts('https://adopt-final.firebaseio.com/firebase-app.js');
// importScripts('https://adopt-final.firebaseio.com//firebase-messaging.js');

  var config = {
    apiKey: "AIzaSyBKlxYTocLRi10SndEE6wQU67Qk2wsxnf4",
    authDomain: "adopt-final.firebaseapp.com",
    databaseURL: "https://adopt-final.firebaseio.com",
    projectId: "adopt-final",
    storageBucket: "adopt-final.appspot.com",
    messagingSenderId: "906707780797"
  };
  firebase.initializeApp(config);

const messaging = firebase.messaging();