import {v4 as uuidv4} from 'uuid';
import firebase from 'firebase';
import prodData from './prodData';

// Required for side-effects
require("firebase/firestore");

 


export default class Repository{

    constructor() {
        if (this.db == null){
        console.log("init repo");
        var firebaseConfig = {
            apiKey:             process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain:         process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId:          process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket:      process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
            messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId:              process.env.REACT_APP_FIREBASE_APP_ID
          };

        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        }
        this.dataSource= new prodData(this.db);
    }

    setLoadingCallback(callback){
        this.dataSource.setLoadingCallback(callback);
    }

    loadSessionsOfTeacher(teacher, callback){
        this.dataSource.getSessionsOfTeacher(teacher, callback);
    }

    updateSession(session, callback){
        this.dataSource.updateSession(session, callback);
    }
    createSession(session, callback){
        this.dataSource.createSession(session, callback);
    
    }

    loadSubjectsOfTeacher(teacher, callback){
        this.dataSource.getSubjectsOfTeacher(teacher, callback);
    }

    updateSubject(subject){
    }

}