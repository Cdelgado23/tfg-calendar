import {v4 as uuidv4} from 'uuid';
import firebase from 'firebase';

// Required for side-effects
require("firebase/firestore");

 


export default class Repository{

    constructor() {
        if (this.db == null){
        console.log("init repo");
        var firebaseConfig = {
            apiKey: "AIzaSyDuOEZm-US7qOfa8-hb-eqsAfSFBw7NXMc",
            authDomain: "tfg-calendar-310123.firebaseapp.com",
            projectId: "tfg-calendar-310123",
            storageBucket: "tfg-calendar-310123.appspot.com",
            messagingSenderId: "409049602115",
            appId: "1:409049602115:web:445470db2a0c15c8f61cf6"
          };

        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        }
    }
}