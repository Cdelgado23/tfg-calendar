import prodData from './prodData';
import testData from './testData';



 


export default class Repository{

    constructor() {

        var env = process.env.REACT_APP_ENVIROMENT.trimEnd();
        console.log(env.length);
        console.log(env ==="local");
        switch(env){
            case "local":
                this.dataSource = new testData(process.env.REACT_APP_BACKEND_BASE_URL);
                break;
            case "dev":
            case "pro":
                this.dataSource= new prodData();
                break;
            default:
                console.warn("NO DATA SOURCE");
        }

        this.authenticationData={
            teacher:{
                name: "teacher Z"
            }
        };

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

    createSubject(subject, callback){
        this.dataSource.createSubject(subject, this.authenticationData.teacher.name, callback);
    
    }

    loadSubjectsOfTeacher(teacher, callback){
        this.dataSource.getSubjectsOfTeacher(teacher, callback);
    }

    updateSubject(subject, callback){
        this.dataSource.updateSubject(subject, callback);
    }

    loadSessionsOfSubjectGroup(subject, group, callback){
        this.dataSource.getSessionsOfSubjectGroup(subject, group, callback);
    }

    updateSubjectName(subject, oldSubjectName, callback){
        this.dataSource.updateSubjectName(subject, oldSubjectName, callback);
    }
}