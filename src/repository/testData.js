

export default class TestData{

    constructor(baseurl, loadingCallback, userIsLogged) {
        this.baseurl = baseurl;
        this.loadingCallback= loadingCallback;
        this.errorCallback={};
        this.user=null;
        this.userIsLogged= userIsLogged;
      }
      
    logOut(callback){
        this.user=null;
        callback();
    }
    auth(email, password, callback){
        this.user={email:email};
        console.log(this.user);
        this.userIsLogged(this.user.email);
    }

    getUser(){
        return this.user;
    }

    setErrorCallback(callback){
        this.errorCallback= callback;
    }
    getSessionById(id, callback){
        this.loadingCallback(true);
        console.log("http://20.86.179.242:4010/session/1");
        fetch('http://example.com/movies.json')
        .then(response => response.json())
        .then(data => console.log(data));
        /*
        fetch("http://20.86.179.242:4010/session/1")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log("error");
                console.log(error);
                this.loadingCallback(false);
                callback(null);
            }
        )
        */
    }

    getRooms(callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"rooms");
        fetch(this.baseurl+"rooms")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }
    getTeachers(callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"teachers");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"teachers")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }

    setLoadingCallback(callback){
        this.loadingCallback= callback;
    }


    getSubjectsOfTeacher(teacher, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"subjects");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"subjects")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return [];
            }
        )
    }

    createTeacher(teacher, callback){
        callback();
    }

    async deleteTeacher(teacher, callback){
        callback();
    }

    getAvailableTeachers(semester, day, timeBlocks, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"teachers");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"teachers")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                var format =[];
                result.map(t=>{format.push({name: t.teacherName, checkConcurrency: t.checkConcurrency})});
                this.loadingCallback(false);
                callback(format); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }


    getAvailableRooms(semester, day, timeBlocks, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"rooms");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"rooms")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                var format =[];
                result.map(t=>{format.push({name: t.roomName, checkConcurrency: t.checkConcurrency})});
                this.loadingCallback(false);
                callback(format); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }

    createRoom(room, callback){
        callback();
    }

    async deleteRoom(room, callback){
        callback();
    }
    
    loadTitles(callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"titles");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"titles")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return [];
            }
        )    
    }
    createTitle(title, callback){
        callback();
    }

    deleteTitle(title, callback){
        callback();
    }

    loadSubjectsOfTitle(title, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"subjects");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"subjects")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }

    loadSessionsOfSubjects(subjectNames, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }

    getSessionsOfTeacher(teacher, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }
    getSessionsOfSubjectGroup(subject, group, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )   
     }
    getSessionsOfRoom(room, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result); 
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )    }

    updateSession(session, callback, semester) {
        callback();
    }

    createSession(session, callback, semester){
        callback();
    }


    deleteSession(session, callback, semester){
        callback();
    }

    async updateSubject(subject, callback, updatedSemester){
        callback();
    }



    updateSubjectName(subject, oldSubjectName, callback){
        callback();
    }

    getSubjects(callback){

        this.loadingCallback(true);
        console.log(this.baseurl+"subjects");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"subjects")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                callback(result);
            
            },

            (error) => {
                console.log(error);
                this.loadingCallback(false);
                return null;
            }
        )
    }

    createSubject(subject, callback){
        callback();
    }

    async deleteSubject(subject, callback){
        callback();
    }

    deleteGroup(subject, group, callback){
        callback();
    }

    checkDisponibilityForSession(session, semester, callback){
        
        callback({
            teacher: true,
            room: true
        });
        
    }

}
