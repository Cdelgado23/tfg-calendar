import firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");

export default class prodData{

    constructor(loadingCallback) {
        console.log("init repo");
        var firebaseConfig = {
            apiKey:             process.env.REACT_APP_FIREBASE_API_KEY.trim(),
            authDomain:         process.env.REACT_APP_FIREBASE_AUTH_DOMAIN.trim(),
            projectId:          process.env.REACT_APP_FIREBASE_PROJECT_ID.trim(),
            storageBucket:      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET.trim(),
            messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID.trim(),
            appId:              process.env.REACT_APP_FIREBASE_APP_ID.trim()
          };

        console.log(firebaseConfig)
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
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
    getSessionsOfSubjectGroup(subject, group, callback){
        this.loadingCallback(true);
        this.db.collection("sessions").where("subjectName", "==", subject).where("groupName", "==", group).get().then((querySnapshot) => {
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
            teacher: session.teacher,
            color: session.color
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
            day: parseInt(session.day),
            recurrencePeriod: parseInt(session.recurrencePeriod),
            startFrom: session.startFrom,
            endAt: session.endAt,
            groupName: session.groupName,
            length: parseInt(session.length),
            recurrent: session.recurrent,
            room: session.room,
            startMinute: parseInt(session.length),
            subjectName: session.subjectName,
            teacher: session.teacher,
            color: session.color
            }:
            {
            type: "session",
            executionDate: session.executionDate,
            groupName: session.groupName,
            length: parseInt(session.length),
            recurrent: session.recurrent,
            room: session.room,
            startMinute: parseInt(session.startMinute),
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
            console.log("data");
            console.log(data);
            callback(data);
        });
    }

    updateSubject(subject, callback){
        this.loadingCallback(true);

        this.db.collection("subjects").doc(subject.id).update({
            color: subject.color,
            groups: subject.groups,
            subjectName: subject.subjectName,
            teachers: subject.teachers
          }).then(() => {
            this.loadingCallback(false);
            callback(subject);
            console.log("subject updated");
          });
    }

    updateSubjectName(subject, oldSubjectName, callback){
        this.loadingCallback(true);

        this.db.collection("sessions").where("subjectName", "==", oldSubjectName).get().then((querySnapshot) => {
            
            // Get a new write batch
            var batch = this.db.batch();

            subject.groups.forEach(group => {
                group.subjectName= subject.subjectName;
            });

            // Set the value of subject
            var subjectRef = this.db.collection("subjects").doc(subject.id);
            batch.set(subjectRef, subject);

            console.log("old: " + oldSubjectName);

            querySnapshot.forEach((doc) => {
                var sRef= this.db.collection("sessions").doc(doc.id);
                batch.update(sRef, {"subjectName": subject.subjectName});
                console.log(doc);
            });

            batch.commit().then(() => {
                this.loadingCallback(false);
                callback();
                console.log("Batch completed");
            });
        });

    }


    createSubject(subject, owner, callback){
        console.log("creating");
        subject.owner= owner;
        subject.groups=[];
        subject.teachers=[owner];
        console.log(subject);
        this.db.collection("subjects").add(
            subject
        )
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            callback(subject);
            subject["id"] = docRef.id; 
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}
