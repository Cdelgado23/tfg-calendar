import React from 'react';
import {TimetableGrid, GridTimeElement, GridContainer, GridDayElement, GridLinesComponent, GridContainerElement} from './TimetableElements';
import {RepositoryContext} from '../../context/RepositoryContext';



import {v4 as uuidv4} from 'uuid';


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


function getTimeBlocksOfSession(session){
  var time = session.startTime.split(":");
  var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
  const row = (((startMinute - 480)/15)>>0) + 1;
  const rowEnd= Math.ceil(((startMinute+parseInt(session.length) -480) /15))+1;


  return Array.from(new Array(rowEnd-row), (x, i) => i+row);
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
        <GridContainerElement data-testid={session.id} onClick={() => { handleSessionClick(session) }} color= {session.color} draggable="true" 
                onDragStart={event=>dragSession(event, session)}
                style={{margin: "0", padding: "0"}}>
        {sessionToString(session)}
        </GridContainerElement>
      )
    }
    </GridContainer>
  );
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
      
      populated.push(PlaceSessionBlock(value, params, handleSessionClick, key));
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

function populateDaysRow(){
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
    <GridLinesComponent data-testid={(((n/8)>>0) +1).toString() + "-" + (n%8 +1).toString()} row={((n/8)>>0) +1} column={n%8 +1} onDrop={event => dropFunction(event, n, params)} onDragOver={event =>allowDrop(event)}/>
  );
}

function compareSessions(session1, session2){
  return session1.id === session2.id;
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
        
        this.state = {mins_x_block: props.mins_x_block,
                      divisions: props.scheduleSize/props.mins_x_block,
                      timeStart: props.timeStart,
                      };
        this.drop = this.drop.bind(this);
        this.getScheduleInformation = this.getScheduleInformation.bind(this);
        
        this.handleSessionClick= this.handleSessionClick.bind(this);
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
      
  
      if(data.type === "group"){
        data = FormatGroupData(data);
        data["type"] = "group";
      }

      var session = generateSessionFromDrop(data);
      var startMinute= (((id/8)>>0)-1) *config.mins_x_block + config.timeStart;

      var hours= Math.floor(startMinute/60);
      var minutes= startMinute%60;

      hours= hours>9? hours: "0"+hours;
      minutes= minutes>9? minutes: "0"+minutes;

      var startTime =  hours+ ":" + minutes;
      
      session["startTime"] = startTime;
      session["day"]=id%8;

      var schedulableInformation= this.getScheduleInformation(session, id);      

      if (schedulableInformation.schedulable===true){

        if (data.type ==="session"){  
          this.props.updateSession(session);
        }else if(data.type === "group"){
          this.props.createSession(session);
        }

      }

    }
    render() {
      return (
        <div>
        <TimetableGrid divisions= {this.state.divisions}>
              {drawRowLines(this.state, this.drop)}
              {populateDaysRow()}
              {populateTimeColumn(this.state)}
              {populateGrid(this.state, this.props.sessions, this.handleSessionClick)}
        </TimetableGrid>
        </div>
      );
    }
  }