import React from 'react';
import {FlexForm, NotificationsButtonsContainer, NotificationButton} from './SessionFormElements'

function showRooms(rooms){
    const listRooms = rooms.map((room) =>
    <option value={room}>{room}</option>
  );
  return (
    <select name="rooms" id="rooms">
        {listRooms}
    </select>
  );
}


export default class SessionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
        this.updateStateFromSession= this.updateStateFromSession.bind(this);
        this.onChangeField= this.onChangeField.bind(this);
        this.onChangeCheckbox= this.onChangeCheckbox.bind(this);
        if (this.props.selectedSession){
            this.state={
                id: this.props.selectedSession.id,
                subjectName: this.props.selectedSession.subjectName,
                groupName: this.props.selectedSession.groupName,
                startMinute: this.props.selectedSession.startMinute,
                length: this.props.selectedSession.length,
                day: this.props.selectedSession.day,
                recurrent: this.props.selectedSession.recurrent
            }
        }
    }

    updateStateFromSession(session){
        this.setState({
            id: session.id,
            subjectName: session.subjectName,
            groupName: session.groupName,
            startMinute: session.startMinute,
            length: session.length,
            day: session.day,
            recurrent: session.recurrent
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
            <FlexForm>
                <label>
                    Subject
                </label>
                <input type="text" name="subject" value={this.state.subjectName} onChange= {event => {this.onChangeField(event,"subjectName")}}/>
                <label>
                    Group
                </label>
                <input type="text" name="group" value={this.state.groupName}  onChange= {event => {this.onChangeField(event,"groupName")}}/>
                <label>
                    Day
                </label>
                <input type={this.state.recurrent===true? "text":"date"} name="day"  value={this.state.day}  onChange= {event => {this.onChangeField(event,"day")}}/>
                <label>
                    Start Time
                </label>
                <input type="text" name="startTime" value={this.state.startMinute}  onChange= {event => {this.onChangeField(event,"startMinute")}}/>
                <label>
                    Duration
                </label>
                <input type="text" name="length"  value={this.state.length}  onChange= {event => {this.onChangeField(event,"length")}}/>
                <label>
                <input type="checkbox" name="recurrent"  checked={this.state.recurrent} value={this.state.recurrent}  onChange= {event => {this.onChangeCheckbox("recurrent")}}/>
                    Recurrent
                </label>
                <label>
                    Room
                </label>
                {showRooms(this.props.getAvalibleRooms(this.props.selectedSession))}
                <br/>
                <input type="submit" value="Update"/>
            </FlexForm>
            <h4 style={{textAlign: "center"}}>Notificaciones</h4>
            <NotificationsButtonsContainer>
            <NotificationButton>
                ver
            </NotificationButton>
            <NotificationButton>
                añadir
            </NotificationButton>
            </NotificationsButtonsContainer>
            </div>
        );
        }else{
            return <div></div>;
        }
    }

}