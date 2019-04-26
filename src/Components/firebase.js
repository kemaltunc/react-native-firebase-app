import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAIOAAOCaUGiOedgSrxKzg1oy0vBn5CcaY",
    authDomain: "poetry-14d66.firebaseapp.com",
    databaseURL: "https://poetry-14d66.firebaseio.com",
    projectId: "poetry-14d66",
    storageBucket: "poetry-14d66.appspot.com",
    messagingSenderId: "95714782249"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;

