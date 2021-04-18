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