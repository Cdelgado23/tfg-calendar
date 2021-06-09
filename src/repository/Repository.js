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

    updateSession(session, callback){

        var time = session.startTime.split(":");
        var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
        const rowStart = (((startMinute - 480)/15)>>0) + 1;      
        const rowEnd= Math.ceil(((startMinute+session.length - 480) /15))+1;

        session.timeBlocks= Array.from({length: rowEnd-rowStart}, (_, i) => i + rowStart)
        console.log(rowStart);
        console.log(rowEnd);
        console.log(session.timeBlocks);

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