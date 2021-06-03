// Required for side-effects
require("firebase/firestore");

 

export default class prodData{

    constructor(db, loadingCallback) {
        this.db = db;
        this.loadingCallback= loadingCallback;
    }
    setLoadingCallback(callback){
        this.loadingCallback= callback;
    }

    getSessionsOfTeacher(teacher, callback){
        this.loadingCallback(true);
        this.db.collection("sessions").where("teacher", "==", teacher).get().then((querySnapshot) => {
            this.loadingCallback(false);

            
            var data = [];
            querySnapshot.forEach((doc) => {
                var session= doc.data();
                session["id"]= doc.id;
                data.push(session);
            });
            callback(data);
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
    updateSession(session, callback) {
        console.log("update");
        console.log(session);

        var loading = this.loadingCallback;
        loading(true);

        this.db.collection("sessions").doc(session.id).update({
            day: session.day,
            endAt: session.endAt,
            groupName: session.groupName,
            length: session.length,
            recurrencePeriod: session.recurrencePeriod,
            recurrent: session.recurrent,
            room: session.room,
            startFrom: session.startFrom,
            startMinute: session.startMinute,
            subjectName: session.subjectName,
            teacher: session.teacher
          }).then(function() {
            loading(false);
            callback(session);
            console.log("session updated");
          });
    }
    createSession(session, callback){
        console.log("creating");
        console.log(session);
        this.db.collection("sessions").add(
            session.recurrent? 
            {
            type: "session",
            day: session.day,
            recurrencePeriod: session.recurrencePeriod,
            startFrom: session.startFrom,
            endAt: session.endAt,
            groupName: session.groupName,
            length: session.length,
            recurrent: session.recurrent,
            room: session.room,
            startMinute: session.startMinute,
            subjectName: session.subjectName,
            teacher: session.teacher,
            color: session.color
            }:
            {
            type: "session",
            executionDate: session.executionDate,
            groupName: session.groupName,
            length: session.length,
            recurrent: session.recurrent,
            room: session.room,
            startMinute: session.startMinute,
            subjectName: session.subjectName,
            teacher: session.teacher,
            color: session.color
            }
        )
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            callback(session);
            session["id"] = docRef.id; 
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    getSubjectsOfTeacher(teacher, callback){
        this.loadingCallback(true);
        this.db.collection("subjects").where("teachers", "array-contains", teacher).get().then((querySnapshot) => {
            this.loadingCallback(false);

            
            var data = [];
            querySnapshot.forEach((doc) => {
                var group= doc.data();
                group["id"]= doc.id;
                data.push(group);
            });
            callback(data);
        });
    }

}
