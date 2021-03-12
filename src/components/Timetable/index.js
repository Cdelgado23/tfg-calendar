import React from 'react'
import {TimetableGrid, GridTimeElement, GridElement, GridLines} from './TimetableElements';



function placeSession(session, config){
    const row = (((session.startMinute - config.timeStart)/config.mins_x_block)>>0) + 1;
    const column = session.day +1;
    

    const rowEnd= Math.ceil(((session.startMinute+session.duration -config.timeStart) /config.mins_x_block))+1;
    const size = rowEnd-row;


    const leftoverTop= (session.startMinute - (config.timeStart + ((row-1) * config.mins_x_block)) ) *100 / (config.mins_x_block*size);
    const leftoverBot= (((config.mins_x_block*size)-session.duration) * 100 /(config.mins_x_block*size))>>0;

    return(<GridElement row={row+1} column={column} color= {session.color} size={size} marginTop={leftoverTop} marginBot={leftoverBot}>{session.subject} </GridElement>
        );
}


function populateGrid(params) {
    const populated=[];
    params.sessions.forEach(session => {
        populated.push(placeSession(session, params));
    });
    return populated;
}


function populateTimeColumn(params){
    const startHour= (params.timeStart/60)>>0 ;
    const startMinute= params.timeStart%60;
    return Array.from(Array(params.divisions).keys())
    .map((n) =>
    <GridTimeElement row={n+2} column={1}>{""+ (startHour+((n*params.mins_x_block/60) >> 0)) + ":" + (startMinute +(n*params.mins_x_block%60) >> 0)}</GridTimeElement>
  );
}

const days={
    1:"Lunes",
    2:"Martes",
    3:"Miércoles",
    4:"Jueves",
    5:"Viernes",
    6:"Sábado",
    7:"Domingo"
};
function populateDaysRow(){
    return Array.from(Array(7).keys())
    .map((n) =>
    <GridElement row={1} column={n+2}>{days[n+1]}</GridElement>
  );
}

function drawRowLines(params){
    console.log(params);
    return Array.from(Array(params).keys())
    .map((n) =>
    <GridLines row={((n/8)>>0) +1} column={n%8 +1} ></GridLines>
  );
}

export default class Timetable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {mins_x_block: props.mins_x_block,
                      divisions: props.scheduleSize/props.mins_x_block,
                      timeStart: props.timeStart,
                      sessions: props.sessions
                      };
      }
  

    render() {
      return (
          <TimetableGrid divisions= {this.state.divisions}>
              {drawRowLines((this.state.divisions+1)*8)}
              {populateDaysRow()}
              {populateTimeColumn(this.state)}
              {populateGrid(this.state)}
        </TimetableGrid>
      )
    }
  }