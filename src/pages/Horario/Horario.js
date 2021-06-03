import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, CentralMenu, Footer} from '../PagesElements';
import Timetable from '../../components/Timetable'
import Subject from '../../components/Subject'
import SessionForm from '../../components/SessionForm';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';



const rooms=["Sala 1", "Sala Grande", "Salón de actos"];

function getRooms(session){
  return rooms; 
}


/*
function getAvalibleRooms(session){
  var daySessions = this.sessions.filter (s => s.day===session.day);

  var start = session.startMinute;
  var end= session.startMinute + session.length;

  var conflictSessions= daySessions.filter(s => (s.startMinute > start && s.startMinute <end));
  var conflictRooms= new Set(conflictSessions.map(s => s.room));


  return rooms.filter(r=> !conflictRooms.has(r));
}
*/


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
                <SessionForm getAvalibleRooms = {getRooms} 
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
