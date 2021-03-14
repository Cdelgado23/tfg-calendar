import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, FullWidthMenu, SpaceBetweenMenu, Button, CentralMenu} from './PagesElements';
import Timetable from '../components/Timetable'
import Subject from '../components/Subject'

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
  startMinute: 480,
  length: 60,
  color: "#23ea51",
  subjectName: "subject X",
  groupName: "group n",
  recurrent: true, 
  day: 1
}

const session2={
  startMinute: 540,
  length: 60,
  color: "#f7eb80",
  subjectName: "subject X",
  groupName: "group n",
  recurrent: true, 
  day: 1
}


const session3={
  startMinute: 780,
  duration:40,
  color: "#db80f8",
  subjectName: "subject Testing",
  groupName: "Fantastic 4s",
  recurrent: true, 
  day: 1
}

const sessions= [session1, session2, session3];


function ListSubjects(params) {
  return  params.map((subject) =>
  <Subject subject={subject}></Subject>
);
}


function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  console.log("DROP");
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}


const Horario = () => {
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
          <Timetable timeStart={480} scheduleSize={720} mins_x_block={30} sessions= {sessions}>
          </Timetable>
        </CentralMenu>
        <LateralMenu>
          <MenuHeader>
            <h2>Sesión</h2>
          </MenuHeader>
          <MenuBody>
          <Button>
            Hola
          </Button>
          </MenuBody>

        </LateralMenu>     
      </SpaceBetweenMenu>
    </div>
  );
};

export default Horario;