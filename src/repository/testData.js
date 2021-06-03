

export default class TestData{

    constructor(baseurl, loadingCallback) {
        this.baseurl = baseurl;
        this.loadingCallback= loadingCallback;
      }
    getSessions(){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                return result; 
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


    setLoadingCallback(callback){
        this.loadingCallback= callback;
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
                return result; 
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
    getSessionsOfSubjectGroup(subject, group){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                return result; 
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
    getSessionsOfRoom(room){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                return result; 
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
    updateSession(session, callback) {
        console.log("update");
        console.log(session);

        var loading = this.loadingCallback;
        loading(true);

        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                return result; 
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
    createSession(session, callback){
        console.log("creating");
        console.log(session);
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                return result; 
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

    getSubjectsOfTeacher(teacher, callback){
        this.loadingCallback(true);
        console.log(this.baseurl+"sessions");
        fetch(process.env.REACT_APP_BACKEND_BASE_URL+"sessions")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("success");
                console.log(result);
                this.loadingCallback(false);
                return result; 
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

}
