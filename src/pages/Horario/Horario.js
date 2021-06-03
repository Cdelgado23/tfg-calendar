import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, Button, CentralMenu, Footer} from '../PagesElements';
import Timetable from '../../components/Timetable'
import Subject from '../../components/Subject'
import SessionForm from '../../components/SessionForm';
import {v4 as uuidv4} from 'uuid';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';


const session1={
  id:uuidv4(),
  startMinute: 480,
  length: 60,
  color: "#23ea51",
  subjectName: "subject X",
  groupName: "group n",
  recurrent: true, 
  recurrencePeriod: 1,
  day: 1,
  startFrom: "2021-W01",
  room:"Sala 1"
}
const session2={
  id:uuidv4(),
  startMinute: 540,
  length: 60,
  color: "#f7eb80",
  subjectName: "subject X",
  groupName: "group n",
  recurrent: true,
  recurrencePeriod: 2,
  day: 1,
  startFrom: "2021-W01",
  room:"Sala Grande"
}
const session3={
  id:uuidv4(),
  startMinute: 780,
  length:40,
  color: "#db80f8",
  subjectName: "subject Testing asdasd asdas dasd ",
  groupName: "Fantastic 4s",
  recurrent: false, 
  executionDate: "2021-04-02",
  room:"Sala 1"
}


const sessions= [session1, session2, session3];


const rooms=["Sala 1", "Sala Grande", "Salón de actos"];


function getAvalibleRooms(session){
  var daySessions = sessions.filter (s => s.day===session.day);

  var start = session.startMinute;
  var end= session.startMinute + session.length;

  var conflictSessions= daySessions.filter(s => (s.startMinute > start && s.startMinute <end));
  var conflictRooms= new Set(conflictSessions.map(s => s.room));


  return rooms.filter(r=> !conflictRooms.has(r));
}


function ListSubjects(params) {
  return  params.map((subject) =>
  <Subject subject={subject}></Subject>
);
}



export default class Horario extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.handleSessionClick = this.handleSessionClick.bind(this);
    this.state={
      loading: false,
      sessions: [],
      subjects: []
    
    };

    this.setLoading = this.setLoading.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.createSession = this.createSession.bind(this);

    this.setSubjects = this.setSubjects.bind(this);

  }
  
  handleSessionClick(clickedSession){
    this.setState({ 
      selectedSession: clickedSession});
      console.log(clickedSession);
  }
  
  setLoading(_loading){
    this.setState({loading: _loading});
  }
  setSessions(_sessions){
    this.setState({sessions: _sessions});
  }
  updateSession(session){
    this.context.updateSession(session, ()=> {
      this.setState((prevState) =>(
        {sessions: [...prevState.sessions.filter(s => s.id!==session.id), session]}
      ));
    }
  );
  }
  createSession(session){
    this.context.createSession(session, ()=> {
        this.setState((prevState) =>(
          {sessions: [...prevState.sessions, session]}
        ));
      }
    );
  }

  setSubjects(_subjects){
    this.setState({subjects: _subjects});
  }

  componentDidMount() {
    this.context.setLoadingCallback(this.setLoading);
    
    this.context.loadSubjectsOfTeacher("teacher Z", this.setSubjects);
    this.context.loadSessionsOfTeacher("teacher Z", this.setSessions);
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
          <SpaceBetweenMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Asignaturas</h2>
              </MenuHeader>
              <MenuBody>
                {ListSubjects(this.state.subjects)}
                <Button>
                  +
                </Button>
              </MenuBody>
            </LateralMenu>
            <CentralMenu>
              <Timetable timeStart={480} scheduleSize={720} mins_x_block={15} 
                          sessions= {this.state.sessions} setSessions= {this.setSessions} 
                          handleSessionClick={this.handleSessionClick}
                          updateSession={this.updateSession}
                          createSession = {this.createSession}>
              </Timetable>
            </CentralMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Sesión</h2>
              </MenuHeader>
              <MenuBody>
                <SessionForm getAvalibleRooms = {getAvalibleRooms} 
                              key ={this.state.selectedSession? this.state.selectedSession.id:"-"} 
                              id ={this.state.selectedSession? this.state.selectedSession.id:null} 
                              selectedSession={this.state.selectedSession}
                              updateSession = {this.updateSession}>
                </SessionForm>
              </MenuBody>
            </LateralMenu>     
          </SpaceBetweenMenu>
          <Footer></Footer>
        </div>
      </MyLoader>
    );
  };
  
}
