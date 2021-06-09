import React from 'react';
import { Button } from '../../pages/PagesElements';
import {FlexForm, NotificationsButtonsContainer, FormButton, FormSubmit, SessionInput} from './SessionFormElements'

function showRooms(rooms, handleChange, defaultRoom){
    const listRooms = rooms.map((room) =>
    <option key={room} value={room} selected={room==defaultRoom? true: false}>{room}</option>
  );
  return (
    <select name="rooms" id="rooms" defaultValue={defaultRoom} onChange={e=>{handleChange(e, "room")}} style={{marginBottom: "0.5em"}}>
        {listRooms}
    </select>
  );
}

const week=["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function showWeekdays(selectedDay, handleChange, checkConcurrency){
    const listDays = Array.from(new Array(7), (x, i) => i+1).map((day) =>
                        <option value={parseInt(day)}>{week[day]}</option>
                );
  return (
    <select name="days" id="days" defaultValue={selectedDay} onChange={e=> {handleChange(e, "day"); checkConcurrency()}} style={{marginBottom: "0.5em"}}>
        {listDays}
    </select>
  );
}

function getTimeBlocksOfSession(session){
    var time = session.startTime.split(":");
    var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
    const row = (((startMinute - 480)/15)>>0) + 1;
    const rowEnd= Math.ceil(((startMinute+session.length -480) /15))+1;

    return Array.from(new Array(rowEnd-row), (x, i) => i+row);
}


export default class SessionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
        this.onChangeField= this.onChangeField.bind(this);
        this.onChangeCheckbox= this.onChangeCheckbox.bind(this);

        console.log("selected: ");
        console.log(this.props.selectedSession);
        if (this.props.selectedSession){
            this.state={
                id: this.props.selectedSession.id,
                subjectName: this.props.selectedSession.subjectName,
                groupName: this.props.selectedSession.groupName,
                startTime: this.props.selectedSession.startTime,
                length: this.props.selectedSession.length,
                day: this.props.selectedSession.day,
                room: this.props.selectedSession.room,
                teacher: this.props.selectedSession.teacher,
                color: this.props.selectedSession.color
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateStateFromSession = this.updateStateFromSession.bind(this);
    }
    updateStateFromSession(session){
        this.setState({
                id: session.id,
                subjectName: session.subjectName,
                groupName: session.groupName,
                startTime: session.startTime,
                length: session.length,
                day: session.day,
                room: session.room,
                teacher: session.teacher,
                color: session.color
            }
        );
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedSession !== this.props.selectedSession) {
          this.updateStateFromSession(this.props.selectedSession);
        }
    }

    handleSubmit(event){
        event.preventDefault();
        var session={
            id: this.state.id,
            subjectName: this.state.subjectName,
            groupName: this.state.groupName,
            length: this.state.length,
            recurrent: this.state.recurrent,
            room: this.state.room,
            teacher: this.state.teacher,
            color: this.state.color,
            day: this.state.day,
            startTime: this.state.startTime
        }
        console.log("update button");
        console.log(session);
        this.props.updateSession(session);
        this.setState({
            id: null
        });
    }

    onChangeField(event, field){
        console.log(event.target.value);
        this.setState({[field]: event.target.value});
    }

    onChangeCheckbox(field){
        this.setState(prevState => ({[field]: !prevState[field]}));
    }


    render(){

        if (this.state.id){

        return (
            <div>
            <FlexForm onSubmit={this.handleSubmit}>
                <label>
                    Subject
                </label>
                <SessionInput disabled type="text" name="subject" value={this.state.subjectName} onChange= {event => {this.onChangeField(event,"subjectName")}}/>
                <label>
                    Group
                </label>
                <SessionInput disabled type="text" name="group" value={this.state.groupName}  onChange= {event => {this.onChangeField(event,"groupName")}}/>
                <label>
                    Color
                </label>
                <SessionInput type="color" name="color" value={this.state.color}  onChange= {event => {this.onChangeField(event,"color")}}/>
                
                <label>
                    Day
                </label>
                {showWeekdays(this.state.day, this.onChangeField, ()=>{this.props.getAvalibleRooms(this.state)})}
                <label>
                    Start Time
                </label>
                <SessionInput type="time" name= "start" min="08:00" max="21:00" value={this.state.startTime} onChange= {event => {this.onChangeField(event,"startTime"); this.props.getAvalibleRooms(this.state)}}></SessionInput>
                
                <label>
                    Duration
                </label>
                <SessionInput type="number" name="length"  value={this.state.length}  onChange= {event => {this.onChangeField(event,"length"); this.props.getAvalibleRooms(this.state)}}/>
                <label>
                    Room
                </label>
                {showRooms(this.props.rooms, this.onChangeField, this.state.room)}
                <label>
                    Teacher
                </label>
                <br/>
                <FormSubmit color = "#2DA283" type="submit" value="Update"/>
            </FlexForm>
            <h4 style={{textAlign: "center"}}>Notificaciones</h4>
            <NotificationsButtonsContainer>
            <FormButton color = "#2DA283">
                ver
            </FormButton>
            <FormButton color = "#2DA283">
                añadir
            </FormButton>
            </NotificationsButtonsContainer>
            </div>
        );
        }else{
            return <div></div>;
        }
    }

}