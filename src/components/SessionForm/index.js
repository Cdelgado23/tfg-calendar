import React from 'react';
import {FlexForm, NotificationsButtonsContainer, FormButton, FormSubmit, SessionInput} from './SessionFormElements'

function showRooms(rooms, handleChange){
    const listRooms = rooms.map((room) =>
    <option value={room}>{room}</option>
  );
  return (
    <select name="rooms" id="rooms" onChange={handleChange}>
        {listRooms}
    </select>
  );
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
                startMinute: this.props.selectedSession.startMinute,
                length: this.props.selectedSession.length,
                day: this.props.selectedSession.day,
                executionDate: this.props.selectedSession.executionDate,
                recurrencePeriod: this.props.selectedSession.recurrencePeriod,
                recurrent: this.props.selectedSession.recurrent,
                startFrom: this.props.selectedSession.startFrom,
                endAt: this.props.selectedSession.endAt,
                room: this.props.selectedSession.room,
                teacher: this.props.selectedSession.teacher,
                color: this.props.selectedSession.color
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateStateFromSession = this.updateStateFromSession.bind(this);
    }
    updateStateFromSession(session){
        this.state.setState({
                id: session.id,
                subjectName: session.subjectName,
                groupName: session.groupName,
                startMinute: session.startMinute,
                length: session.length,
                day: session.day,
                executionDate: session.executionDate,
                recurrencePeriod: session.recurrencePeriod,
                recurrent: session.recurrent,
                startFrom: session.startFrom,
                endAt: session.endAt,
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
            startMinute: this.state.startMinute,
            length: this.state.length,
            recurrent: this.state.recurrent,
            room: this.state.room,
            teacher: this.state.teacher,
            color: this.state.color
        }

        if(session.recurrent){
            session["startFrom"] = this.state.startFrom;
            session["endAt"] = this.state.endAt;
            session["day"] =  Number(this.state.day);
            session["recurrencePeriod"] = Number(this.state.recurrencePeriod);
        }else{
            session["executionDate"] = this.state.executionDate;
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
                <input type="checkbox" name="recurrent"  checked={this.state.recurrent} value={this.state.recurrent}  onChange= {event => {this.onChangeCheckbox("recurrent")}}/>
                    Recurrent
                </label>
                
                {this.state.recurrent===true? 
                <React.Fragment> 
                <label>
                    Recurrence Period
                </label>
                <SessionInput type="number" name="day"  value={this.state.recurrencePeriod}  onChange= {event => {this.onChangeField(event,"recurrencePeriod")}}/>
                <label>
                    Day
                </label>
                <SessionInput type="number" name="day"  value={this.state.day}  onChange= {event => {this.onChangeField(event,"day")}}/>
                <label>
                    Start From
                </label>
                <SessionInput type="week" name="startFrom"  value={this.state.startFrom}  onChange= {event => {this.onChangeCheckbox(event,"startFrom")}}/>
                <label>
                    End At
                </label>
                <SessionInput type="week" name="endAt"  value={this.state.endAt}  onChange= {event => {this.onChangeCheckbox(event, "endAt")}}/>
                </React.Fragment>
                :
                <React.Fragment>
                    <label>
                        Execution Date
                    </label>
                    <SessionInput type="date" name="day"  value={this.state.executionDate}  onChange= {event => {this.onChangeField(event,"executionDate")}}/>
                </React.Fragment>
                }


                <label>
                    Start Time
                </label>
                <SessionInput type="text" name="startTime" value={this.state.startMinute}  onChange= {event => {this.onChangeField(event,"startMinute")}}/>
                <label>
                    Duration
                </label>
                <SessionInput type="text" name="length"  value={this.state.length}  onChange= {event => {this.onChangeField(event,"length")}}/>
                <label>
                    Room
                </label>
                {showRooms(this.props.getAvalibleRooms(this.props.selectedSession), this.onChangeField)}
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