import React from 'react';
import {TimetableGrid, GridTimeElement, GridElement, GridLines, GridDayElement, WeekDataBlock, WeekPicker} from './TimetableElements';

import {v4 as uuidv4} from 'uuid';


function formatDate(toFormat){
  var month = toFormat.getUTCMonth() + 1; //months from 1-12
  var day = toFormat.getUTCDate();
  var year = toFormat.getUTCFullYear();
  return day + "/" + month + "/" + year;
}


function dragSession(ev, session) {
  ev.dataTransfer.setData("text",JSON.stringify(session));
}

function placeSession(session, config){
    const row = (((session.startMinute - config.timeStart)/config.mins_x_block)>>0) + 1;
    const column = session.day +1;
    

    const rowEnd= Math.ceil(((session.startMinute+session.length -config.timeStart) /config.mins_x_block))+1;
    const size = rowEnd-row;


    const leftoverTop= (session.startMinute - (config.timeStart + ((row-1) * config.mins_x_block)) ) *100 / (config.mins_x_block*size);
    const leftoverBot= (((config.mins_x_block*size)-session.length) * 100 /(config.mins_x_block*size))>>0;

    return(<GridElement key={uuidv4()} draggable="true" onDragStart={event=>dragSession(event, session)} row={row+1} column={column} color= {session.color} size={size} marginTop={leftoverTop} marginBot={leftoverBot}>{session.subjectName} </GridElement>
        );
}


function populateGrid(params) {
    console.log("populating with: ");
    console.log(params.sessions);

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
function populateDaysRow(currentWeek){
    return Array.from(Array(7).keys())
    .map((n) =>
    <GridDayElement row={1} column={n+2}>{days[n+1]}<br/>{formatDate(currentWeek[n])}</GridDayElement>
  );
}



function allowDrop(ev) {
  ev.preventDefault();
}


function drawRowLines(params, dropFunction){

   const divs = (params.divisions+1)*8;
   

    return Array.from(Array(divs).keys())
    .map((n) =>
    <GridLines row={((n/8)>>0) +1} column={n%8 +1} onDrop={event => dropFunction(event, n, params)} onDragOver={event =>allowDrop(event)}></GridLines>
  );
}

function compareSessions(session1, session2){
  return session1.day === session2.day && 
         session1.startMinute === session2.startMinute &&
         session1.length === session2.length &&
         session1.groupName === session2.groupName;
}


function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

function getWeekFromDay(current){
  var week=[];
  current.setDate(current.getDate() +1);

  for (var i = 0; i < 7; i++) {
    week.push(
        new Date(current)
    ); 
    current.setDate(current.getDate() +1);
}
return week;
}

export default class Timetable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {mins_x_block: props.mins_x_block,
                      divisions: props.scheduleSize/props.mins_x_block,
                      timeStart: props.timeStart,
                      sessions: props.sessions,
                      week: getWeekFromDay(getDateOfISOWeek(11,2021))
                      };
        this.drop = this.drop.bind(this);
        this.handleWeekChange= this.handleWeekChange.bind(this);
      }
      

    drop(ev, id, config) {
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("text"));
      console.log("DATA: ");
      console.log(data);
    
      const session={
        origin: "dinamic",
        startMinute: (((id/8)>>0)-1) *config.mins_x_block + config.timeStart,
        length: data.length,
        color: data.color,
        subjectName: data.subjectName,
        groupName: data.groupName,
        recurrent: true, 
        day: id%8
      };

      this.setState({
        sessions: [...this.state.sessions.filter(item => !compareSessions(item, data)), session]
      })

    }



    handleWeekChange(event) {
      var splitted = event.target.value.split("-W");
      console.log("INPUT VAL: " + event.target.value);
      var current = getDateOfISOWeek(splitted[1],splitted[0]);
      
      console.log(current);

    this.setState({
      week: getWeekFromDay(current)
    });
    }

    render() {
      return (
        <div>
        <WeekDataBlock>
          <WeekPicker>
            <input type="week" name="week" id="select-week"required onChange={event => this.handleWeekChange(event)}></input>
          </WeekPicker>
        </WeekDataBlock>
        <TimetableGrid divisions= {this.state.divisions}>
              {drawRowLines(this.state, this.drop)}
              {populateDaysRow(this.state.week)}
              {populateTimeColumn(this.state)}
              {populateGrid(this.state)}
        </TimetableGrid>
        </div>
      );
    }
  }