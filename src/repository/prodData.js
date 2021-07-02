import firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");


function getTimeBlocksOfSession(session){


    var time = session.startTime.split(":");
    var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
    const row = (((startMinute - 480)/15)>>0) + 1;
    const rowEnd= Math.ceil(((startMinute+parseInt(session.length) -480) /15))+1;

    console.log("time " + time + " - startMinute" + startMinute + " - row " + row + "- rowend " + rowEnd);
  
    return Array.from(new Array(rowEnd-row), (x, i) => i+row);
  }

export default class prodData{

    constructor(_, loadingCallback, userIsLogged) {
        var firebaseConfig = {
            apiKey:             process.env.REACT_APP_FIREBASE_API_KEY.trim(),
            authDomain:         process.env.REACT_APP_FIREBASE_AUTH_DOMAIN.trim(),
            projectId:          process.env.REACT_APP_FIREBASE_PROJECT_ID.trim(),
            storageBucket:      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET.trim(),
            messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID.trim(),
            appId:              process.env.REACT_APP_FIREBASE_APP_ID.trim()
          };

        if (!firebase.apps.length) {
            try {
                firebase.initializeApp(firebaseConfig);
                this.db = firebase.firestore();
                } catch (err) {
                    console.log("captured " + err);
                }
        }
           
        this.loadingCallback= loadingCallback;
        this.errorCallback={};

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userIsLogged(user.email);
            } else {
                userIsLogged(false);
            }
          });

    }

    logOut(callback){
        firebase.auth().signOut().then(() => {
            callback();
        }).catch((error) => {
        });
    }

    auth(email, password, callback){
        this.loadingCallback(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            this.loadingCallback(false);
            // Signed in
            var user = userCredential.user;
            // ...
            callback(user);
        })
        .catch((error) => {
            this.loadingCallback(false);
            var errorCode = error.code;
            var errorMessage = error.message;
            if (this.errorCallback){
                this.errorCallback(errorCode + " - " + errorMessage);
            }
        });
    }
    getUser(){
        return firebase.auth().currentUser;
    }

    setErrorCallback(callback){
        this.errorCallback= callback;
    }
    setLoadingCallback(callback){
        this.loadingCallback= callback;
    }

    getTeachers(callback){
        this.loadingCallback(true);
        this.db.collection("teachers").get().then((querySnapshot) => {
            this.loadingCallback(false);
            var data = [];
            querySnapshot.forEach((doc) => {
                var teacher= doc.data();
                data.push(teacher);
            });
            this.loadingCallback(false);
            callback(data);
        }).catch(err=>{
            this.errorCallback(err);
        });
    }
    createTeacher(teacher, callback){
        this.loadingCallback(true);
        
        
        // Get a new write batch
        var batch = this.db.batch();

        var teacherRef = this.db.collection('teachers').doc(teacher.teacherName);
        batch.set(teacherRef, teacher);

        var teacherOcupancyRef= this.db.collection('teachersOcupancy');
        var ocupancy={};

        var timeBlock;
        if (teacher.checkConcurrency){
            for (timeBlock = 1; timeBlock < 53; timeBlock++) {
                ocupancy[timeBlock]= firebase.firestore.FieldValue.arrayUnion(teacher.teacherName);
            }
        }else{
            ocupancy["concurrents"]= firebase.firestore.FieldValue.arrayUnion(teacher.teacherName);
        }

        var semester;
        for (semester = 1; semester < 3; semester++) {
            var day;
            for (day = 1; day < 8; day++) {
                batch.update(teacherOcupancyRef.doc(semester+"-"+day), ocupancy);
                
            }
        }        
        
        // Commit the batch
        batch.commit().then(() => {
            this.loadingCallback(false);
            callback();
        }).catch(err=>{
            this.errorCallback(err);
        });
    }

    async deleteTeacher(teacher, callback){
        this.loadingCallback(true);
        
        
        // Get a new write batch
        var batch = this.db.batch();

        var teacherRef = this.db.collection('teachers').doc(teacher.teacherName);
        batch.delete(teacherRef);

        var teacherOcupancyRef= this.db.collection('teachersOcupancy');
        var ocupancy={};

        var timeBlock;
        for (timeBlock = 1; timeBlock < 53; timeBlock++) {
            ocupancy[timeBlock]= firebase.firestore.FieldValue.arrayRemove(teacher.teacherName);
        }

        var semester;
        for (semester = 1; semester < 3; semester++) {
            var day;
            for (day = 1; day < 8; day++) {
                batch.update(teacherOcupancyRef.doc(semester+"-"+day), ocupancy);
            }
        }        

        var rawData = await this.db.collection("sessions").where("teacher.name", "==", teacher.teacherName).get();
        rawData=rawData.docs;
        rawData.forEach((doc) => {
            var session= doc.data();
            session["id"]= doc.id;
            session.teacher={name: "Sin Asignar", checkConcurrency: false};
            batch.update(this.db.collection("sessions").doc(session.id), session);
        });
        
        // Commit the batch
        batch.commit().then(() => {
            this.loadingCallback(false);
            callback();
        }).catch(err=>{
            this.errorCallback(err);
        });
    }

    getAvailableTeachers(semester, day, timeBlocks, callback){
        this.loadingCallback(true);
        this.db.collection('teachersOcupancy').doc((parseInt(semester-1)%2 + 1) +"-"+day).get().then((doc) => {
            var teachers;
            var formattedTeachers=[];
            if (timeBlocks.length>0  && timeBlocks.every(tb => tb in doc.data())){
                timeBlocks.forEach(tb=>{
                    if (!teachers){
                        teachers= doc.data()[tb];
                    }else{
                        teachers = teachers.filter(r=>(doc.data()[tb].includes(r)));
                    }
                });
                teachers.forEach(r=>{formattedTeachers.push({name: r, checkConcurrency: true})})
            }

            doc.data()["concurrents"].forEach(r=>{formattedTeachers.push({name: r, checkConcurrency: false})});

            this.loadingCallback(false);
            callback(formattedTeachers);
        }).catch(err=>{
            this.errorCallback(err);
        });
    }

    getRooms(callback){
        this.loadingCallback(true);
        this.db.collection("rooms").get().then((querySnapshot) => {
            this.loadingCallback(false);
            var data = [];
            querySnapshot.forEach((doc) => {
                var room= doc.data();
                data.push(room);
            });
            this.loadingCallback(false);
            callback(data);
        }).catch(err=>{
            this.errorCallback(err);
        });
    }

    getAvailableRooms(semester, day, timeBlocks, callback){
        this.loadingCallback(true);
        this.db.collection('roomsOcupancy').doc((parseInt(semester-1)%2 + 1) +"-"+day).get().then((doc) => {
            var rooms;
            var formattedRooms=[];
            if (timeBlocks.length>0  && timeBlocks.every(tb => tb in doc.data())){
                timeBlocks.forEach(tb=>{
                    if (!rooms){
                        rooms= doc.data()[tb];
                    }else{
                        rooms = rooms.filter(r=>(doc.data()[tb].includes(r)));
                    } 
                });
                rooms.forEach(r=>{formattedRooms.push({name: r, checkConcurrency: true})})
            }
            doc.data()["concurrents"].forEach(r=>{formattedRooms.push({name: r, checkConcurrency: false})});
            this.loadingCallback(false);
            callback(formattedRooms);
        }).catch(err=>{
            this.errorCallback(err);
        });
    }

    createRoom(room, callback){
        this.loadingCallback(true);
        
        
        // Get a new write batch
        var batch = this.db.batch();

        var roomRef = this.db.collection('rooms').doc(room.roomName);
        batch.set(roomRef, room);

        var roomOcupancyRef= this.db.collection('roomsOcupancy');
        var ocupancy={};

        var timeBlock;
        if (room.checkConcurrency){
            for (timeBlock = 1; timeBlock < 53; timeBlock++) {
                ocupancy[timeBlock]= firebase.firestore.FieldValue.arrayUnion(room.roomName);
            }
        }else{
            ocupancy["concurrents"]= firebase.firestore.FieldValue.arrayUnion(room.roomName);
        }

        var semester;
        for (semester = 1; semester < 3; semester++) {
            var day;
            for (day = 1; day < 8; day++) {
                batch.update(roomOcupancyRef.doc(semester+"-"+day), ocupancy);
            }
        }        
        
        // Commit the batch
        batch.commit().then(() => {
            this.loadingCallback(false);
            callback();
        }).catch(err=>{
            this.errorCallback(err);
        });

    }

    async deleteRoom(room, callback){

        this.loadingCallback(true);
        
        
        // Get a new write batch
        var batch = this.db.batch();

        var roomRef = this.db.collection('rooms').doc(room.roomName);
        batch.delete(roomRef);

        var roomOcupancyRef= this.db.collection('roomsOcupancy');
        var ocupancy={};

        var timeBlock;

        if (room.checkConcurrency){
            for (timeBlock = 1; timeBlock < 53; timeBlock++) {
                ocupancy[timeBlock]= firebase.firestore.FieldValue.arrayRemove(room.roomName);
            }
        }else{
            ocupancy["concurrents"]= firebase.firestore.FieldValue.arrayRemove(room.roomName);
        }


        var semester;
        for (semester = 1; semester < 3; semester++) {
            var day;
            for (day = 1; day < 8; day++) {
                batch.update(roomOcupancyRef.doc(semester+"-"+day), ocupancy);
            }
        }  
        
        var rawData = await this.db.collection("sessions").where("room.name", "==", room.roomName).get();
        rawData=rawData.docs;
        rawData.forEach((doc) => {
            var session= doc.data();
            session["id"]= doc.id;
            session.room={name: "Sin Asignar", checkConcurrency: false};
            batch.update(this.db.collection("sessions").doc(session.id), session);
        });
        
        // Commit the batch
        batch.commit().then(() => {
            this.loadingCallback(false);
            callback();
        }).catch(err=>{
            this.errorCallback(err);
        });
    }
    
    loadTitles(callback){
        this.loadingCallback(true);
        this.db.collection("titles").get().then((querySnapshot) => {
            this.loadingCallback(false);
            var data = [];
            querySnapshot.forEach((doc) => {
                var session= doc.data();
                session.id= doc.id;
                data.push(session);
            });
            callback(data);
        })
        .catch(err=>{
            this.errorCallback(err);
        });
    }
    createTitle(title, callback){
        this.db.collection("titles").doc(title.titleName).set({
            titleName: title.titleName,
            semesters: parseInt(title.semesters)
        })
        .then(() => {
            callback();
        })
        .catch(err=>{
            this.errorCallback(err);
        });
    }

    deleteTitle(title, callback){
        this.db.collection("titles").doc(title.id).delete()
        .then(() => {
            callback();
        })
        .catch(err=>{
            this.errorCallback(err);
        });
    }

    loadSubjectsOfTitle(title, callback){


        this.loadingCallback(true);
        this.db.collection("subjects").where("titles", "array-contains", title).get().then((querySnapshot) => {
            this.loadingCallback(false);
            var data = [];
            querySnapshot.forEach((doc) => {
                var session= doc.data();
                session["id"]= doc.id;
                data.push(session);
            });
            callback(data);
        }).catch(err=>{
            this.errorCallback(err);
        });    
    }

    loadSessionsOfSubjects(subjectNames, callback){
        this.loadingCallback(true);
        this.db.collection("sessions").where("subjectName", "in", subjectNames).get().then((querySnapshot) => {
            this.loadingCallback(false);
            var data = [];
            querySnapshot.forEach((doc) => {
                var session= doc.data();
                session["id"]= doc.id;
                data.push(session);
            });
            callback(data);
        }).catch(err=>{
            this.errorCallback(err);
        });
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
        }).catch(err=>{
            this.errorCallback(err);
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
        }).catch(err=>{
            this.errorCallback(err);
        });
    }
    getSessionsOfRoom(room){
        this.loadingCallback(true);

        this.db.collection("sessions").where("room", "==", room).get().then((querySnapshot) => {
            this.loadingCallback(false);


        }).catch(err=>{
            this.errorCallback(err);
        });
    }
    updateSession(session, callback, semester) {
        var loading = this.loadingCallback;
        loading(true);

        this.db.collection('sessions').doc(session.id).get().then((doc) => {

            var batch = this.db.batch();
            var sessionsRef= this.db.collection('sessions');
            var roomOcupancyRef= this.db.collection('roomsOcupancy');
            var teacherOcupancyRef= this.db.collection('teachersOcupancy');

            var oldSession= doc.data();

            var oldOcupancyRoom={};
            var oldOcupancyTeacher={};

            var updateGeneral= session.day !== oldSession.day || session.startTime !== oldSession.startTime;
            var updateRoom = updateGeneral || session.room.name !== oldSession.room.name;
            var updateTeacher = updateGeneral || session.teacher.name !== oldSession.teacher.name;

            var sem = parseInt(semester-1)%2+1;  
            var oldTimeBlocks;
            if (updateRoom && oldSession.room.checkConcurrency){
                oldTimeBlocks= getTimeBlocksOfSession(oldSession);
                oldTimeBlocks.forEach(t=>{
                    oldOcupancyRoom[t]= firebase.firestore.FieldValue.arrayUnion(oldSession.room.name);
                });
                batch.update(roomOcupancyRef.doc(sem+"-"+oldSession.day), oldOcupancyRoom);
            }
            if (updateTeacher && oldSession.teacher.checkConcurrency){
                oldTimeBlocks= getTimeBlocksOfSession(oldSession);
                oldTimeBlocks.forEach(t=>{
                    oldOcupancyTeacher[t]= firebase.firestore.FieldValue.arrayUnion(oldSession.teacher.name);
                });
                batch.update(teacherOcupancyRef.doc(sem+"-"+oldSession.day), oldOcupancyTeacher);
            }

            var ocupancyRoom={};
            var ocupancyTeacher={};
            var timeBlocks;
            if (updateRoom && session.room.checkConcurrency){
                timeBlocks= getTimeBlocksOfSession(session);
                timeBlocks.forEach(t=>{
                    ocupancyRoom[t]= firebase.firestore.FieldValue.arrayRemove(session.room.name);
                });
                batch.update(roomOcupancyRef.doc(sem+"-"+session.day), ocupancyRoom)
            }
            if (updateTeacher && session.teacher.checkConcurrency){
                timeBlocks= getTimeBlocksOfSession(session);
                timeBlocks.forEach(t=>{
                    ocupancyTeacher[t]= firebase.firestore.FieldValue.arrayRemove(session.teacher.name);
                });
                batch.update(teacherOcupancyRef.doc(sem+"-"+session.day), ocupancyTeacher);
            }

            session["length"]= parseInt(session["length"]);
            batch.update(sessionsRef.doc(session.id), session);
  
            batch.commit().then(() => {
                this.loadingCallback(false);
                callback();
            }).catch(err=>{
                this.errorCallback(err);
            });

          //-------------------------
        });

    }

    createSession(session, callback, semester){
        session.type="session";
        this.loadingCallback(true);
        var batch = this.db.batch();
        var roomOcupancyRef= this.db.collection('roomsOcupancy');
        var teacherOcupancyRef= this.db.collection('teachersOcupancy');

        var ocupancyRoom={};
        var ocupancyTeacher={};

        var sem = parseInt(semester-1)%2+1;  
        var oldTimeBlocks;

        if (session.room.checkConcurrency){
            oldTimeBlocks= getTimeBlocksOfSession(session);
            oldTimeBlocks.forEach(t=>{
                ocupancyRoom[t]= firebase.firestore.FieldValue.arrayRemove(session.room.name);
            });
            batch.update(roomOcupancyRef.doc(sem+"-"+session.day), ocupancyRoom);
        }
        if (session.teacher.checkConcurrency){
            oldTimeBlocks= getTimeBlocksOfSession(session);
            oldTimeBlocks.forEach(t=>{
                ocupancyTeacher[t]= firebase.firestore.FieldValue.arrayRemove(session.teacher.name);
            });
            batch.update(teacherOcupancyRef.doc(sem+"-"+session.day), ocupancyTeacher);
        }
        delete session["id"];
        session["length"]= parseInt(session["length"]);
        var sessionRef = this.db.collection('sessions').doc();
        batch.set(sessionRef, session);

        batch.commit().then(() => {
            this.loadingCallback(false);
            callback();
        })
        .catch(err=>{
            this.errorCallback(err);
        });
    }


    deleteSession(session, callback, semester){
        this.loadingCallback(true);
        var batch = this.db.batch();

        this.deleteSessionBatch(session, semester, batch);

        batch.commit().then(() => {
            this.loadingCallback(false);
            callback();
        }).catch(err=>{
            this.errorCallback(err);
        });
    }

    deleteSessionBatch(session, semester, batch){
        var roomOcupancyRef= this.db.collection('roomsOcupancy');
        var teacherOcupancyRef= this.db.collection('teachersOcupancy');

        var ocupancyRoom={};
        var ocupancyTeacher={};

        var sem = parseInt(semester-1)%2+1;  
        var oldTimeBlocks;

        if (session.room.checkConcurrency){
            oldTimeBlocks= getTimeBlocksOfSession(session);
            oldTimeBlocks.forEach(t=>{
                ocupancyRoom[t]= firebase.firestore.FieldValue.arrayUnion(session.room.name);
            });
            batch.update(roomOcupancyRef.doc(sem+"-"+session.day), ocupancyRoom);
        }
        if (session.teacher.checkConcurrency){
            oldTimeBlocks= getTimeBlocksOfSession(session);
            oldTimeBlocks.forEach(t=>{
                ocupancyTeacher[t]= firebase.firestore.FieldValue.arrayUnion(session.teacher.name);
            });
            batch.update(teacherOcupancyRef.doc(sem+"-"+session.day), ocupancyTeacher);
        }

        var sessionRef = this.db.collection('sessions').doc(session.id);
        batch.delete(sessionRef);
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

    async updateSubject(subject, callback, updatedSemester){
        this.loadingCallback(true);
        var batch = this.db.batch();

        try{
            var groups = subject.groups.map(g =>(g.groupName));
            batch.update(this.db.collection("subjects").doc(subject.id), subject);
            if (updatedSemester && groups.length>0){
                var rawData = await this.db.collection("sessions").where("subjectName", "==", subject.subjectName).where("groupName", "in", groups).get();
                rawData=rawData.docs;

                rawData.forEach((doc) => {
                    var session= doc.data();
                    session["id"]= doc.id;
                    session.room={name: "Sin Asignar", checkConcurrency: false};
                    session.teacher={name: "Sin Asignar", checkConcurrency: false};

                    batch.update(this.db.collection("sessions").doc(session.id), session);
                });
            }            
            batch.commit().then(() => {
                this.loadingCallback(false);
                callback();
            }).catch(err=>{
                this.errorCallback(err);
            });   
        }
        catch(err){
        };
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


            querySnapshot.forEach((doc) => {
                var sRef= this.db.collection("sessions").doc(doc.id);
                batch.update(sRef, {"subjectName": subject.subjectName});
            });

            batch.commit().then(() => {
                this.loadingCallback(false);
                callback();
            }).catch(err=>{
                this.errorCallback(err);
            });
        });

    }

    getSubjects(callback){
        this.loadingCallback(false);
        this.db.collection("subjects").get().then((querySnapshot) => {
            this.loadingCallback(false);
            var data = [];
            querySnapshot.forEach((doc) => {
                var group= doc.data();
                group["id"]= doc.id;
                data.push(group);
            });
            callback(data);
        }).catch(err=>{
            console.log("ERROR");
            console.log(err);
            this.errorCallback(err);
        });
    }

    createSubject(subject, callback){
        subject.owner= this.getUser().email;
        subject.groups=[];
        this.db.collection("subjects").doc(subject.subjectName).set(
            subject
        )
        .then(() => {
            callback();
        })
        .catch(err=>{
            console.log("ERROR");
            console.log(err);
            this.errorCallback(err);
        });
    }

    async deleteSubject(subject, callback){
        this.loadingCallback(true);
        var batch = this.db.batch();

        try{
            var groups = subject.groups.map(g =>(g.groupName));
            var sessions =[];
            if (groups.length>0){
                var rawData = await this.db.collection("sessions").where("subjectName", "==", subject.subjectName).where("groupName", "in", groups).get();
                rawData=rawData.docs;
                rawData.forEach((doc) => {
                    var session= doc.data();
                    session["id"]= doc.id;
                    sessions.push(session);
                });
                this.deleteSessionsBatch(subject, sessions, batch);    
            }

            var subjectRef = this.db.collection('subjects').doc(subject.id);
            batch.delete(subjectRef);
            
            batch.commit().then(() => {
                this.loadingCallback(false);
                callback();
            }).catch(err=>{
                this.errorCallback(err);
            });   
        }catch(err){
            console.log("error delete subject: " + err);
        } 
    }

    deleteGroup(subject, group, callback){
        this.loadingCallback(true);
        var batch = this.db.batch();

        subject.groups= subject.groups.filter(g=>(g.groupName!==group.groupName));


        this.db.collection("sessions").where("subjectName", "==", subject.subjectName).where("groupName", "==", group.groupName).get().then((querySnapshot) => {
            var sessions=[];
            querySnapshot.forEach((doc) => {
                var session= doc.data();
                session["id"]= doc.id;
                sessions.push(session);
            });
            this.deleteSessionsBatch(subject, sessions, batch);
            
            batch.update(this.db.collection("subjects").doc(subject.id), subject);

            batch.commit().then(() => {
                this.loadingCallback(false);
                callback();
            }).catch(err=>{
                this.errorCallback(err);
            });    
        });
    }

    deleteSessionsBatch(subject, sessions, batch){
        sessions.forEach(s=>{
            this.deleteSessionBatch(s, subject.semester, batch);
        });
    }

    async checkDisponibilityForSession(session, semester, callback){
        this.loadingCallback(true);

        try {
            var rooms = await this.db.collection('roomsOcupancy').doc((parseInt(semester-1)%2 + 1) +"-"+session.day).get();
            var teachers = await this.db.collection('teachersOcupancy').doc((parseInt(semester-1)%2 + 1) +"-"+session.day).get();

            var timeBlocks= getTimeBlocksOfSession(session);

            var teacherIsAvailable= true;
            var roomIsAvailable= true;

            rooms= rooms.data();
            teachers = teachers.data();

            if (session.teacher.checkConcurrency){
                timeBlocks.forEach(tb =>{
                    teacherIsAvailable = teacherIsAvailable && teachers[tb].includes(session.teacher.name);
                });
            }
            if(session.room.checkConcurrency){
                timeBlocks.forEach(tb =>{
                    roomIsAvailable = roomIsAvailable && rooms[tb].includes(session.room.name);
                });
            }
            var response = {
                teacher: teacherIsAvailable,
                room: roomIsAvailable
            };
            callback(response);
            this.loadingCallback(false);
        }
        catch(err) {
            callback({
                teacher: false,
                room: false
            });
            this.loadingCallback(false);
            console.log('Error getting documents', err)
        }
        
    }



    initDB(){
        var batch = this.db.batch();

        var roomOcupancyRef= this.db.collection('roomsOcupancy');
        var teachersOcupancyRef= this.db.collection('teachersOcupancy');
        var ocupancy={};

        var timeBlock;

        ocupancy["concurrents"]=[];
        for (timeBlock = 1; timeBlock < 53; timeBlock++) {
            ocupancy[timeBlock]= [];
        }


        var semester;
        for (semester = 1; semester < 3; semester++) {
            var day;
            for (day = 1; day < 8; day++) {
                batch.set(roomOcupancyRef.doc(semester+"-"+day), ocupancy);
                batch.set(teachersOcupancyRef.doc(semester+"-"+day), ocupancy);
            }
        } 
        
        batch.commit().then(() => {
        }).catch(err=>{
        });   
    }

}
