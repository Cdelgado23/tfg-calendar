import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, FullWidthMenu, SpaceBetweenMenu, Button, CentralMenu} from './PagesElements';
import Timetable from '../components/Timetable'
import Subject from '../components/Subject'

const group1 = {
  name: "group 1",
  color: "#ffef66"
};
const group2 = {
  name: "group 2",
  color: "#ff4451"
};
const groups= [group1, group2];

const subject1={
  name: "subject 1 large text",
  groups: groups,
  color: "#1f67e2"
};
const subject2={
  name: "subject 2 very very very large text",
  groups: groups,
  color: "#db80f7"
};
const subject3={
  name: "subject 3",
  groups: groups,
  color: "#23ea51"
};
const subjects=[subject1, subject2, subject3];

const session1={
  startMinute: 480,
  duration: 60,
  color: "#23ea51",
  subject: "subject X",
  group: "group n",
  recurrent: true, 
  day: 1
}

const session2={
  startMinute: 540,
  duration: 60,
  color: "#f7eb80",
  subject: "subject X",
  group: "group n",
  recurrent: true, 
  day: 1
}


const session3={
  startMinute: 780,
  duration:40,
  color: "#db80f8",
  subject: "subject Testing",
  group: "Fantastic 4s",
  recurrent: true, 
  day: 1
}

const sessions= [session1, session2, session3];


function ListSubjects(params) {
  return  params.map((subject) =>
  <Subject subject={subject}></Subject>
);
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
    <FullWidthMenu>
      ASdasdasdasddddfcx
    </FullWidthMenu>
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