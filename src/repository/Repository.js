import prodData from './prodData';
import testData from './testData';



const dataSources={
    "local": testData,
    "dev": prodData,
    "pro": prodData
} 


export default class Repository{

    constructor(loadingCallback, userIsLogged) {
        this.user=null;
        var env = process.env.REACT_APP_ENVIROMENT.trimEnd();
        this.dataSource = new (this.getDataSource(env))(process.env.REACT_APP_BACKEND_BASE_URL, loadingCallback,  userIsLogged);
    }

    setUser(user){
        this.user= user;
    }
    logOut(callback){
        this.dataSource.logOut(callback);
    }
    auth(email, password, callback){
        this.dataSource.auth(email,password,callback);
    }

    getUser(){
        return this.dataSource.getUser();
    }

    getDataSource(env){
        return env in dataSources? dataSources[env]: console.warn("NO DATA SOURCE");
    }

    setLoadingCallback(callback){
        this.dataSource.setLoadingCallback(callback);
    }
    setErrorCallback(callback){
        this.dataSource.setErrorCallback(callback);
    }

    getSubjects(callback){
        this.dataSource.getSubjects(callback);
    }
    getTeachers(callback){
        this.dataSource.getTeachers(callback);
    }
    createTeacher(teacher, callback){
        this.dataSource.createTeacher(teacher, callback);
    }
    deleteTeacher(teacher, callback){
        this.dataSource.deleteTeacher(teacher, callback);
    }
    getAvailableTeachers(semester, day, timeBlocks, callback){
        this.dataSource.getAvailableTeachers(semester, day, timeBlocks, callback);
    }

    getRooms(callback){
        this.dataSource.getRooms(callback);
    }

    createRoom(room, callback){
        this.dataSource.createRoom(room, callback);
    }

    deleteRoom(room, callback){
        this.dataSource.deleteRoom(room, callback);
    }

    getAvailableRooms(semester, day, timeBlocks, callback){
        this.dataSource.getAvailableRooms(semester, day, timeBlocks, callback);
    }

    getSessionOfRoomInDay(room, day, semester, callback){
        this.dataSource.getSessionOfRoomInDay(room, day, semester, callback);
    }

    loadTitles(callBack){
        this.dataSource.loadTitles(callBack);
    }
    loadSubjectsOfTitle(title, callback){
        this.dataSource.loadSubjectsOfTitle(title, callback);
    }
    loadSessionsOfSubjects(subjectNames, callback){
        this.dataSource.loadSessionsOfSubjects(subjectNames, callback);
    }


    loadSessionsOfTeacher(teacher, callback){
        this.dataSource.getSessionsOfTeacher(teacher, callback);
    }

    updateSession(session, callback, semester){
        this.dataSource.updateSession(session, callback, semester);
    }
    createSession(session, callback, semester){
        this.dataSource.createSession(session, callback, semester);
    
    }
    deleteSession(session, callback, semester){
        this.dataSource.deleteSession(session, callback, semester);
    }

    createSubject(subject, callback){
        this.dataSource.createSubject(subject, callback);
    
    }
    deleteSubject(subject, callback){
        this.dataSource.deleteSubject(subject, callback);
    }

    deleteGroup(subject, group, callback){
        this.dataSource.deleteGroup(subject, group, callback);
    }

    loadSubjectsOfTeacher(teacher, callback){
        this.dataSource.getSubjectsOfTeacher(teacher, callback);
    }

    updateSubject(subject, callback, updatedSemester){
        this.dataSource.updateSubject(subject, callback, updatedSemester);
    }

    loadSessionsOfSubjectGroup(subject, group, callback){
        this.dataSource.getSessionsOfSubjectGroup(subject, group, callback);
    }

    updateSubjectName(subject, oldSubjectName, callback){
        this.dataSource.updateSubjectName(subject, oldSubjectName, callback);
    }

    checkDisponibilityForSession(session, semester, callback){
        this.dataSource.checkDisponibilityForSession(session, semester, callback);
    }
    createTitle(title, callback){
        this.dataSource.createTitle(title, callback);
    }
    deleteTitle(title, callback){
        this.dataSource.deleteTitle(title, callback);
    }
}