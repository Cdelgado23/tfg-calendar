
    const subjects= [{"id":"string","subjectName":"Test Subject","color":"string","groups":[{"groupName":"Test Group","subjectName":"string","color":"string","type":"string","defaultSessionValues":{"color":"string","length":0,"room":{"name":"string"},"teacher":{"name":"string"}}}],"titles":[{"semester":1,"titleName":"Test Title"}]}];
    const sessions=[{"id":"asdasc-123124jp-asdadipkw","startTime":"09:30","length":60,"color":"#EFEFEF","subject":"Subject X","group":"Group N","room":{"name":"Big Room"},"teacher":{"name":"Teacher X"},"day":2},{"id":"asdasc-asdasdacaasdadipkw","startTime":"11:30","length":60,"color":"#EFEFEF","subject":"Subject X","group":"Group N","room":{"name":"Big Room"},"teacher":{"name":"Teacher X"},"day":2}];
    const titles= [{"id":"string","titleName":"Test Title","semesters":3}]
    const teachers= [{"id":"string","teacherName":"Test Teacher","checkConcurrency":true}];
    const rooms=[{"id":"string","roomName":"Test Room","checkConcurrency":true}];


export default class Mock{

    constructor(baseurl, loadingCallback) {
        this.baseurl = baseurl;
        this.loadingCallback= loadingCallback;
        this.errorCallback={};
        this.user={email: "TestUser@test.test"};
      }
      
    logOut(callback){
        callback();
    }

    auth(email, password, callback){
        this.user= {email:email};
        callback(this.user);
    }
    getUser(){
        return this.user;
    }

    setErrorCallback(callback){
        this.errorCallback= callback;
    }
    setLoadingCallback(callback){
        this.loadingCallback= callback;
    }

    getTeachers(callback){
        callback(teachers);
    }
    createTeacher(teacher, callback){
        callback();
    }

    async deleteTeacher(teacher, callback){
        callback();
    }

    getAvailableTeachers(semester, day, timeBlocks, callback){

        var formattedTeachers=[];
        teachers.forEach(r=>{formattedTeachers.push({name: r.teacherName, checkConcurrency: r.checkConcurrency})});
        callback(formattedTeachers);
    }

    getRooms(callback){
        callback(rooms);
    }

    getAvailableRooms(semester, day, timeBlocks, callback){
        var formattedRooms=[];
        rooms.forEach(r=>{formattedRooms.push({name: r.roomName, checkConcurrency: r.checkConcurrency})});
        callback(formattedRooms);
    }

    createRoom(room, callback){
        callback();
    }

    async deleteRoom(room, callback){

        callback();
    }
    
    loadTitles(callback){
        callback(titles);
    }
    createTitle(title, callback){
        callback();
    }

    deleteTitle(title, callback){
        callback();
    }

    loadSubjectsOfTitle(title, callback){
        callback();
    }

    loadSessionsOfSubjects(subjectNames, callback){
        callback(sessions);
    }

    getSessionsOfTeacher(teacher, callback){
        callback(sessions);
    }
    getSessionsOfSubjectGroup(subject, group, callback){
        callback(sessions);
    }
    getSessionsOfRoom(room, callback){
        callback(sessions);
    }

    updateSession(session, callback, semester) {
        callback();
    }

    createSession(session, callback, semester){
        callback();
    }


    deleteSession(session, callback, semester){
        callback();
    }


    getSubjectsOfTeacher(teacher, callback){
        callback(subjects);
    }

    async updateSubject(subject, callback, updatedSemester){
        callback();
    }



    updateSubjectName(subject, oldSubjectName, callback){
        callback();
    }

    getSubjects(callback){
        callback(subjects);
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

    async checkDisponibilityForSession(session, semester, callback){
        
        callback({
            teacher: true,
            room: true
        });
        
    }

}
