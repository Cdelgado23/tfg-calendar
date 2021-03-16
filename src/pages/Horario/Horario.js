import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, Button, CentralMenu} from '../PagesElements';
import Timetable from '../../components/Timetable'
import Subject from '../../components/Subject'
import SessionForm from '../../components/SessionForm';
import {v4 as uuidv4} from 'uuid';

const group1 = {
  type:"group",
  subjectName:"subject X",
  groupName: "Lab",
  color: "#ffef66",
  length: 60,
  id:"asdasd-aergeryter-112424tfdsasa"
};
const group2 = {
  type:"group",
  subjectName:"subject X",
  groupName: "Teoría GG",
  color: "#ff4451",
  length: 45,
  id:"asdasd-q2341245rwefqwrf24-112424tfdsasa"
};
const groups= [group1, group2];

const subject1={
  subjectName: "subject 1 large text",
  groups: groups,
  color: "#1f67e2"
};
const subject2={
  subjectName: "subject 2 very very very large text",
  groups: groups,
  color: "#db80f7"
};
const subject3={
  subjectName: "subject 3",
  groups: groups,
  color: "#23ea51"
};
const subjects=[subject1, subject2, subject3];

const session1={
  id:uuidv4(),
  startMinute: 480,
  length: 60,
  color: "#23ea51",
  subjectName: "subject X",
  groupName: "group n",
  recurrent: true, 
  day: 1,
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
  day: 1,
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
  day: 1,
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


  constructor(props) {
    super(props);
    this.handleSessionClick = this.handleSessionClick.bind(this);
    this.state={};
  }
  
  handleSessionClick(clickedSession){
    this.setState({ 
      selectedSession: clickedSession});
      console.log(clickedSession);
  }


  render() {
    return (
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
              {ListSubjects(subjects)}
              <Button>
                +
              </Button>
            </MenuBody>
  
          </LateralMenu>
          <CentralMenu>
            <Timetable timeStart={480} scheduleSize={720} mins_x_block={15} sessions= {sessions} handleSessionClick={this.handleSessionClick}>
            </Timetable>
          </CentralMenu>
          <LateralMenu>
            <MenuHeader>
              <h2>Sesión</h2>
            </MenuHeader>
            <MenuBody>
              <SessionForm getAvalibleRooms = {getAvalibleRooms} key ={this.state.selectedSession? this.state.selectedSession.id:"-"} id ={this.state.selectedSession? this.state.selectedSession.id:null} selectedSession={this.state.selectedSession}>
              </SessionForm>

            </MenuBody>
  
          </LateralMenu>     
        </SpaceBetweenMenu>
      </div>
    );
  };
  
}
