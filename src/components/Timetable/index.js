import React from 'react';
import {TimetableGrid, GridTimeElement, GridElement, GridLines, GridDayElement, WeekDataBlock, WeekPicker, SelectedWeek} from './TimetableElements';



import {v4 as uuidv4} from 'uuid';


function formatDate(toFormat){
  var month = toFormat.getUTCMonth() + 1; //months from 1-12
  var day = toFormat.getUTCDate();
  var year = toFormat.getUTCFullYear();
  return day + "/" + month + "/" + year;
}

function sessionToString(session){
  return <p style={{overflow: "hidden",
                   textOverflow: "ellipsis"}}>
         {session.subjectName}<br/>
         {session.groupName}<br/>
         {""+ session.length + " mins"}
  </p>;
}

function dragSession(ev, session) {
  ev.dataTransfer.setData("text",JSON.stringify(session));
}

function placeSession(session, config, handleSessionClick){
    const row = (((session.startMinute - config.timeStart)/config.mins_x_block)>>0) + 1;
    const column = session.day +1;


    const rowEnd= Math.ceil(((session.startMinute+session.length -config.timeStart) /config.mins_x_block))+1;
    const size = rowEnd-row;


    return(<GridElement key={uuidv4()} draggable="true" onDragStart={event=>dragSession(event, session)} row={row+1} column={column} color= {session.color} size={size}  onClick={() => { handleSessionClick(session) }}>{sessionToString(session)}</GridElement>
        );
}


function populateGrid(params, handleSessionClick) {
    const populated=[];
    params.sessions.forEach(session => {
        populated.push(placeSession(session, params, handleSessionClick));
    });
    return populated;
}

function populateTimeColumn(params){
    const startHour= (params.timeStart/60)>>0 ;
    const hourSize= Math.ceil(60/params.mins_x_block);
    return Array.from(Array(params.divisions/hourSize).keys())
    .map((n) =>
    <GridTimeElement size={hourSize} row={n*hourSize+2} column={1}>{""+ (startHour+ n ) + ":00"}</GridTimeElement>
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
  return session1.id === session2.id;
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

function getWeekNumberFromDay(date){
  
  //find the year of the entered date  
   var oneJan =  new Date(date.getFullYear(), 0, 1);   

   // calculating number of days in given year before the given date   
   var numberOfDays =  Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));   

   // adding 1 since to current date and returns value starting from 0   
   var result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7); 
   return result;
}


export default class Timetable extends React.Component {
    constructor(props) {
        super(props);

        var todayDate= new Date();

        this.state = {mins_x_block: props.mins_x_block,
                      divisions: props.scheduleSize/props.mins_x_block,
                      timeStart: props.timeStart,
                      sessions: props.sessions,
                      selectedWeek: ""+todayDate.getFullYear()+"-W"+getWeekNumberFromDay(todayDate),
                      week: getWeekFromDay(getDateOfISOWeek(getWeekNumberFromDay(todayDate),todayDate.getFullYear()))
                      };
        this.drop = this.drop.bind(this);
        this.handleWeekChange= this.handleWeekChange.bind(this);
        this.getScheduleInformation = this.getScheduleInformation.bind(this);
        
        this.handleSessionClick= this.handleSessionClick.bind(this);
        this.changeWeek = this.changeWeek.bind(this);
      }
    
    handleSessionClick(session) {
      this.props.handleSessionClick(session);
    }

    getScheduleInformation(session, block_id){

      const day = block_id%8;
      const start= (((block_id/8)>>0)-1) *this.state.mins_x_block + this.state.timeStart;


      const end=  start + session.length;

      var daySessions= this.state.sessions.filter(s => (day === s.day && !compareSessions(s, session)));
      console.log(daySessions);
      var conflictSessions= daySessions.filter(s => (s.startMinute > start && s.startMinute <end));

      console.log(conflictSessions);
      var information ={
        schedulable: conflictSessions.length===0,
        startMinute: start
      };
      
      return information;
    }


    drop(ev, id, config) {
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("text"));
          
      const session={
        id: data.id? data.id : uuidv4(),
        origin: "dinamic",
        startMinute: (((id/8)>>0)-1) *config.mins_x_block + config.timeStart,
        length: data.length,
        color: data.color,
        subjectName: data.subjectName,
        groupName: data.groupName,
        recurrent: true, 
        day: id%8
      };

      var schedulableInformation= this.getScheduleInformation(session, id);

      if (schedulableInformation.schedulable===true){
        session.startMinute= schedulableInformation.startMinute;
        this.setState({
          sessions: [...this.state.sessions.filter(item => !compareSessions(item, data)), session]
        });
      }


    }

    handleWeekChange(event) {
      var splitted = event.target.value.split("-W");
      console.log("INPUT VAL: " + event.target.value);
      var current = getDateOfISOWeek(splitted[1],splitted[0]);
      
      console.log(current);

    this.setState({
      selectedWeek:event.target.value,
      week: getWeekFromDay(current)
    });
    }

    changeWeek(changeAmount){
      var splitted = this.state.selectedWeek.split("-W");
      var week = parseInt(splitted[1]) + changeAmount;
      var current = getDateOfISOWeek(week,splitted[0]);
      
      console.log(current);
      this.setState({
        selectedWeek: splitted[0]+"-W"+week,
        week: getWeekFromDay( current)
      });
    }

    render() {
      return (
        <div>
        <WeekDataBlock>
          <SelectedWeek>
          <button onClick= {()=>{this.changeWeek(-1)}}> {"<"} </button>
          <p>{formatDate(this.state.week[0]) + " - " + formatDate(this.state.week[6])}</p>
          <button onClick= {()=>{this.changeWeek(+1)}}> {">"} </button>
          </SelectedWeek>
        </WeekDataBlock>
        <WeekDataBlock>
        <WeekPicker>
            <input type="week" name="week" id="select-week" value={this.state.selectedWeek} required onChange={event => this.handleWeekChange(event)}></input>
        </WeekPicker>

        </WeekDataBlock>


        <TimetableGrid divisions= {this.state.divisions}>
              {drawRowLines(this.state, this.drop)}
              {populateDaysRow(this.state.week)}
              {populateTimeColumn(this.state)}
              {populateGrid(this.state, this.handleSessionClick)}
        </TimetableGrid>
        </div>
      );
    }
  }