import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, CentralMenu, Footer, PageHeader} from '../PagesElements';
import Timetable from '../../components/Timetable'
import Subject from '../../components/Subject'
import SessionForm from '../../components/SessionForm';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';
import { EmptySpace, Header } from '../../components/SubjectForm/SubjectFormElements';



const rooms=["Sala 1", "Sala Grande", "Salón de actos"];




function ListSubjects(params) {
  return  params.map((subject) =>
  <Subject subject={subject}></Subject>
);
}

function TitlesDropdown(titles, onChange){
  return(  
  <React.Fragment>

    <select name="titles" id="titles" onChange={(e)=>{onChange(e.target.value);}}>
      <option value={null}>Select a title</option>
      {
          titles.map((title) =>
          <option value={JSON.stringify(title)}>{title.titleName}</option>
          )
      }
    </select>
  </React.Fragment>
  );

}


function SemesterDropdown(semesters, onChange, defaultValue){
  return(  
  <React.Fragment>

    <select name="semesters" id="semesters" defaultValue={parseInt(defaultValue)} onChange={(e)=>{onChange(e.target.value);}}>
      <option value={0}>Select a semester</option>
      {
          Array.from(new Array(semesters), (x, i) => i + 1).map((sem) =>
          <option value={parseInt(sem)}>{sem}</option>
          )
      }
    </select>
  </React.Fragment>
  );

}

function chooseColor(type){
  switch(type){
    case "error":
      return "#bf1e1e";
    case "warning":
      return "#ccb406";
    case "success":
      return "#2ca062";
    default:
      return "#000000";
  }
}

export default class Horario extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.handleSessionClick = this.handleSessionClick.bind(this);
    this.state={
      loading: false,
      sessions: [],
      subjects: [],
      titles:[],
      rooms:[],
      teachers:[],
      selectedSession:{},
      footerMsg: {type: "success", msgs: [], header: ""},
      selectedSemester: 0
    
    };
    this.setFooterMsg= this.setFooterMsg.bind(this);

    this.setLoading = this.setLoading.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.createSession = this.createSession.bind(this);

    this.updateDroppedSession = this.updateDroppedSession.bind(this);

    this.setSubjects = this.setSubjects.bind(this);

    this.setTitles = this.setTitles.bind(this);
    this.selectTitle = this.selectTitle.bind(this);
    this.selectSemester = this.selectSemester.bind(this);

    this.getRooms = this.getRooms.bind(this);
    this.setRooms= this.setRooms.bind(this);

    this.setTeachers= this.setTeachers.bind(this);
    this.getTimeBlocksOfSession= this.getTimeBlocksOfSession.bind(this);
  }
  
  handleSessionClick(clickedSession){
    this.setState({ 
      selectedSession: clickedSession,
      rooms: [clickedSession.room],
      teachers: [clickedSession.teacher]});
      console.log(clickedSession);
  }
  
  setLoading(_loading){
    this.setState({loading: _loading});
  }
  setSessions(_sessions){
    this.setState({sessions: _sessions,
                   selectedSession: null});
  }
  
  async updateDroppedSession(session){
    this.context.checkDisponibilityForSession(session, this.state.selectedSemester, (availability)=>{
      
      var unavailableResource={name: "Sin Asignar", checkConcurrency: false};
      var footerMsg= {
        header: "Sesión de " + session.subjectName + " - " + session.groupName,
        msgs:[],
        type: "success"
      }

      console.log(availability);

      if(!availability.teacher || !availability.room){
        footerMsg.header = footerMsg.header + " actualizada con colisiones.";
        footerMsg.type= "warning";

        if (!availability.room){
          footerMsg.msgs.push("Aula: " + session.room.name + " -> " + unavailableResource.name + ".");
          session.room = unavailableResource;
        }
        if(!availability.teacher){
          footerMsg.msgs.push("Profesor: " + session.teacher.name + " -> " + unavailableResource.name + ".");
          session.teacher= unavailableResource;
        }
      }else{
        footerMsg.header = footerMsg.header + " actualizada sin colisiones";
      }
      this.updateSession(session, this.setFooterMsg(footerMsg));
    });
  }
  updateSession(session, callback){
    this.context.updateSession(session, ()=> {
      if (callback){
        callback();
      }
      this.context.loadSessionsOfSubjects(this.state.subjects.map(s=> s.subjectName), this.setSessions);
    }, this.state.selectedSemester
  );
  }
  createSession(session){
    this.context.createSession(session, ()=> {
      if (this.state.subjects.length>0){
        var subjectNames= this.state.subjects.map((subject)=> subject.subjectName);
        this.context.loadSessionsOfSubjects(subjectNames, this.setSessions);
      }
      }
    );
  }

  setSubjects(_subjects){
    this.setState({subjects: _subjects});

    var subjectNames= _subjects.map((subject)=> subject.subjectName);
    
    if (_subjects.length>0){
      this.context.loadSessionsOfSubjects(subjectNames, this.setSessions);
    }
    
  }

  setTitles(_titles){
    this.setState({titles: _titles});
  }
  selectTitle(_title){
    try {
      console.log("title " + _title)
      var parsed = JSON.parse(_title);

      this.setState(
        {selectedTitle: parsed,
          subjects: [],
          sessions: [],
          selectedSession:{}
        });
  
      var search= {titleName: parsed.titleName, semester: parseInt(this.state.selectedSemester)};

      console.log(search);
      this.context.loadSubjectsOfTitle(search, this.setSubjects);
    } catch(e) {
      this.setState(
        {selectedTitle: null,
          selectedSemester: 0,
          subjects: [],
          sessions: [],
          selectedSession:{}
        });
    }
  }

  selectSemester(semester){
    this.setState(
      {
        selectedSemester: semester,
        subjects: [],
        sessions: [],
        selectedSession:{}
      });

      var search= {titleName: this.state.selectedTitle.titleName, semester: parseInt(semester)};
      console.log(search);
      this.context.loadSubjectsOfTitle(search, this.setSubjects);
  }


  getRooms(){
    this.context.getRooms((rooms)=>{
      this.setState({
        rooms: rooms
      });
    })
  }
  setFooterMsg(msg){
    this.setState({
      footerMsg: msg
    });
  }
  setRooms(_rooms){
    if (this.state.selectedSession){
      const index = _rooms.map(r=>(r.name)).indexOf(this.state.selectedSession.room.name);
      if (index < 0) {
        _rooms=[..._rooms, this.state.selectedSession.room];
      }
    }
    this.setState({rooms: _rooms});
  }
  setTeachers(_teachers){
    if (this.state.selectedSession){
      const index = _teachers.map(r=>(r.name)).indexOf(this.state.selectedSession.teacher.name);
      if (index < 0) {
        _teachers=[..._teachers, this.state.selectedSession.teacher];
      }
    }
    this.setState({teachers: _teachers});
  }
  getTimeBlocksOfSession(session){
    console.log("getTimeBlocks");
    console.log(session);

    var time = session.startTime.split(":");
    var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
    const row = (((startMinute - 480)/15)>>0) + 1;
    const rowEnd= Math.ceil(((startMinute+ parseInt(session.length) -480) /15))+1;

  
    console.log( Array.from(new Array(rowEnd-row), (x, i) => i+row));
    return Array.from(new Array(rowEnd-row), (x, i) => i+row);
  }


  componentDidMount() {
    this.context.setLoadingCallback(this.setLoading);

    this.context.loadTitles(this.setTitles);

  }

  render() {
    return (
      <MyLoader
      active={this.state.loading}
      spinner
      text='Loading your content...'
      >
      <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      >
        <PageHeader>
          {TitlesDropdown(this.state.titles, this.selectTitle)}
          {this.state.selectedTitle? SemesterDropdown(this.state.selectedTitle.semesters, this.selectSemester, this.state.selectedSemester): ""}
        </PageHeader>
          <SpaceBetweenMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Asignaturas</h2>
              </MenuHeader>
              <MenuBody>
                {ListSubjects(this.state.subjects)}
              </MenuBody>
            </LateralMenu>
            <CentralMenu>
              <Timetable timeStart={480} scheduleSize={780} mins_x_block={15} 
                          sessions= {this.state.sessions} setSessions= {this.setSessions} 
                          handleSessionClick={this.handleSessionClick}
                          updateSession={this.updateDroppedSession}
                          createSession = {this.createSession}>
              </Timetable>
            </CentralMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Sesión</h2>
              </MenuHeader>
              <MenuBody>
                <SessionForm 
                              key ={this.state.selectedSession? this.state.selectedSession.id:"-"} 
                              id ={this.state.selectedSession? this.state.selectedSession.id:null} 
                              selectedSession={this.state.selectedSession}
                              updateSession = {this.updateSession}
                              rooms={this.state.rooms}
                              teachers={this.state.teachers}
                              checkAvailability={(session)=>{this.context.getAvailableRooms(this.state.selectedSemester,
                                                                                            session.day, 
                                                                                            this.getTimeBlocksOfSession(session), 
                                                                                            this.setRooms);
                                                          this.context.getAvailableTeachers(this.state.selectedSemester,
                                                                                            session.day, 
                                                                                            this.getTimeBlocksOfSession(session), 
                                                                                            this.setTeachers);}}>
                </SessionForm>
              </MenuBody>
            </LateralMenu>     
          </SpaceBetweenMenu>
          <Footer style={{color: chooseColor(this.state.footerMsg.type)}}> 
          <b>{this.state.footerMsg.header}</b>
          {
            this.state.footerMsg.msgs.map(msg=>
              <p>{msg}</p>
            )
          }
          </Footer>
        </div>
      </MyLoader>
    );
  };
  
}
