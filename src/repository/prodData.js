import {v4 as uuidv4} from 'uuid';
import firebase from 'firebase';

// Required for side-effects
require("firebase/firestore");

 

export default class prodData{

    constructor(db, loadingCallback) {
        this.db = db;
        this.loadingCallback= loadingCallback;
    }

    getSessionsOfTeacher(teacher){
        this.loadingCallback(true);
        this.db.collection("sessions").where("teacher", "==", teacher).get().then((querySnapshot) => {
            this.loadingCallback(false);
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        });
    }
    getSessionsOfSubjectGroup(subject, group){
        this.db.collection("sessions").where("subjectName", "==", subject).where("groupName", "==", group).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        });
    }

    getSessionsOfRoom(room){
        this.loadingCallback(true);

        this.db.collection("sessions").where("room", "==", room).get().then((querySnapshot) => {

            this.loadingCallback(false);
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        });
    }

    writeDataTest(){
        this.db.collection("test").add({
            testid: uuidv4()
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }



}
