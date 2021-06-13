import React from 'react';
import {TimetableGrid, GridTimeElement, GridElement, GridContainer, GridDayElement, WeekDataBlock, WeekPicker, SelectedWeek, GridLinesComponent, GridContainerElement} from './TimetableElements';
import {RepositoryContext} from '../../context/RepositoryContext';



import {v4 as uuidv4} from 'uuid';
import { Button } from '../../pages/PagesElements';

function formatDate(d){
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
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

function sessionIsInWeek(session, config){

  if (session.recurrent){
    const sessionWeekData = getYearAndWeekNumberFromInputText(session.startFrom);
    const weekToCheckData = getYearAndWeekNumberFromInputText(config.selectedWeek);
    return sessionWeekData[0]=== weekToCheckData[0] && ((weekToCheckData[1] -sessionWeekData[1])%session.recurrencePeriod)===0;
  }else{
    const sessionDate = new Date(session.executionDate);
    sessionDate.setHours(0,0,0,0);
    var n=1;
    var found=false; 
    config.week.forEach(day =>{
      if (sessionDate.getTime() === day.getTime())
      {
        session.day=n; 

        found= true;
      }
      n++;
    });
  }
  return found;
}


function getTimeBlocksOfSession(session){
  var time = session.startTime.split(":");
  var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
  const row = (((startMinute - 480)/15)>>0) + 1;
  const rowEnd= Math.ceil(((startMinute+parseInt(session.length) -480) /15))+1;


  return Array.from(new Array(rowEnd-row), (x, i) => i+row);
}

function placeSession(session, config, handleSessionClick){

  var time = session.startTime.split(":");
  var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
  const row = (((startMinute - config.timeStart)/config.mins_x_block)>>0) + 1;

  var column=session.day+1;

  const rowEnd= Math.ceil(((startMinute+session.length -config.timeStart) /config.mins_x_block))+1;
  const size = rowEnd-row;


  return(<GridElement key={uuidv4()} draggable="true" onDragStart={event=>dragSession(event, session)} row={row+1} column={column} color= {session.color} size={size}  onClick={() => { handleSessionClick(session) }}>{sessionToString(session)}</GridElement>
      );
}

function PlaceSessionBlock(block, config, handleSessionClick){
  var exampleSession= block[0];
  var time = exampleSession.startTime.split(":");
  var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
  const row = (((startMinute - config.timeStart)/config.mins_x_block)>>0) + 1;

  var column=exampleSession.day+1;

  const rowEnd= Math.ceil(((startMinute+exampleSession.length -config.timeStart) /config.mins_x_block))+1;
  const size = rowEnd-row;

  return(<GridContainer key={uuidv4()}  row={row+1} column={column}  size={size}>
    {
      block.map((session)=>
        <GridContainerElement onClick={() => { handleSessionClick(session) }} color= {session.color} draggable="true" 
                onDragStart={event=>dragSession(event, session)}
                style={{margin: "0", padding: "0"}}>
        {sessionToString(session)}
        </GridContainerElement>
      )
    }
    </GridContainer>
  );
}

//get week number from string formatted like : YYYY-Wnn (2021-W01)
function getYearAndWeekNumberFromInputText(text){
  var splitted = text.split("-W");
  return splitted;
}


function populateGrid(params, sessions, handleSessionClick) {
    const populated=[];
    var sessionsByTimeblocks={};
    sessions.forEach(session => {
        var timeBlocks = getTimeBlocksOfSession(session);
        var key= session.day + "-" + timeBlocks[0] + "-" + timeBlocks[timeBlocks.length-1];
        if (!(key in sessionsByTimeblocks)){
          sessionsByTimeblocks[key]=[];
        }
        sessionsByTimeblocks[key].push(session);

        // populated.push(placeSession(session, params, handleSessionClick));
    });
    for (const [key, value] of Object.entries(sessionsByTimeblocks)) {
      populated.push(PlaceSessionBlock(value, params, handleSessionClick));
    }

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
    <GridDayElement row={1} column={n+2}>{days[n+1]}</GridDayElement>
  );
}


function allowDrop(ev) {
  ev.preventDefault();
}


function drawRowLines(params, dropFunction){

   const divs = (params.divisions+1)*8;
   

    return Array.from(Array(divs).keys())
    .map((n) =>
    <GridLinesComponent row={((n/8)>>0) +1} column={n%8 +1} onDrop={event => dropFunction(event, n, params)} onDragOver={event =>allowDrop(event)}/>
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
  current.setDate(current.getDate());
  for (var i = 0; i < 7; i++) {
    var d = new Date(current);
    d.setHours(0,0,0,0);
    week.push(
        d
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
   var result = Math.ceil(( date.getDay()  + numberOfDays) / 7); 
   return result-1;
}

function getNumberOfWeeksOfYear(y) {
  var d,
      isLeap;

  d = new Date(y, 0, 1);
  isLeap = new Date(y, 1, 29).getMonth() === 1;

  //check for a Jan 1 that's a Thursday or a leap year that has a 
  //Wednesday jan 1. Otherwise it's 52
  return (d.getDay() === 4 || isLeap) && d.getDay() === 3 ? 53 : 52
}

function generateSessionFromDrop(data){

  var session={
    type: "session",
    id: data.id,
    origin: "drag&drop - session",
    length: data.length,
    color: data.color,
    subjectName: data.subjectName,
    groupName: data.groupName,
    room: data.room,
    teacher: data.teacher
  };
  return session;
}

function FormatGroupData(data){
  var defaultData= data.defaultSessionValues;
  defaultData["groupName"]= data.groupName;
  defaultData["subjectName"] = data.subjectName;
  defaultData["type"] = "group";
  return defaultData;
}

export default class Timetable extends React.Component {
  static contextType = RepositoryContext;
    constructor(props) {
        super(props);

        var todayDate= new Date();

        this.state = {mins_x_block: props.mins_x_block,
                      divisions: props.scheduleSize/props.mins_x_block,
                      timeStart: props.timeStart,
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

      var daySessions= this.props.sessions.filter(s => (day === s.day && !compareSessions(s, session)));
      var conflictSessions= daySessions.filter(s => (s.startMinute > start && s.startMinute <end));

      var information ={
        schedulable: conflictSessions.length===0,
        startMinute: start
      };
      
      return information;
    }


    drop(ev, id, config) {
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("text"));
      
      var day= config.week[id%8 -1];
      const date = formatDate(day);
  
      if(data.type === "group"){
        data = FormatGroupData(data);
        data["type"] = "group";
      }

      console.log("DROP");
      console.log(data);
      console.log(id);
      console.log(config);

      var session = generateSessionFromDrop(data);
      var startMinute= (((id/8)>>0)-1) *config.mins_x_block + config.timeStart;

      var hours= Math.floor(startMinute/60);
      var minutes= startMinute%60;

      hours= hours>9? hours: "0"+hours;
      minutes= minutes>9? minutes: "0"+minutes;

      var startTime =  hours+ ":" + minutes;
      
      session["startMinute"] = startMinute;
      session["startTime"] = startTime;
      session["day"]=id%8;

      var schedulableInformation= this.getScheduleInformation(session, id);      

      if (schedulableInformation.schedulable===true){
        session.startMinute= schedulableInformation.startMinute;

        if (data.type ==="session"){  
          this.props.updateSession(session);
        }else if(data.type === "group"){
          this.props.createSession(session);
        }

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
      var year = parseInt(splitted[0]);


      //decrease year
      year = week<1? year-1: year;

      var lastWeek = getNumberOfWeeksOfYear(year);

      week = week<1? lastWeek: week;

      //increase year
      year = week>lastWeek? year+1: year;

      lastWeek = getNumberOfWeeksOfYear(year);

      week = week>lastWeek? 1: week;
      
      
      var current = getDateOfISOWeek(week, year);
      
      console.log(current);
      

      week = week<10? "0"+week : week; 

      console.log(year+"-W"+ week);

      this.setState({
        selectedWeek: year+"-W"+ week,
        week: getWeekFromDay( current)
      });
    }

    render() {
      console.log(this.context.sessions);
      return (
        <div>
        <TimetableGrid divisions= {this.state.divisions}>
              {drawRowLines(this.state, this.drop)}
              {populateDaysRow(this.state.week)}
              {populateTimeColumn(this.state)}
              {populateGrid(this.state, this.props.sessions, this.handleSessionClick)}
        </TimetableGrid>
        </div>
      );
    }
  }