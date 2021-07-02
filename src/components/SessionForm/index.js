import React from 'react';
import {FlexForm, FormSubmit, SessionInput} from './SessionFormElements'

import {spanish} from '../../translations/Spanish'


function showRooms(rooms, handleChange, defaultRoom, field){

    const listRooms = rooms.map((room) =>
    <option key={room.name} value={JSON.stringify(room)} selected={room.name===defaultRoom.name}>{room.name}</option>
  );
  return (
    <select data-testid={field+"Selector"} name={field+"selector"} id={field} defaultValue={defaultRoom} onChange={e=>{handleChange(e, field)}} style={{marginBottom: "0.5em"}}>
        {listRooms}
    </select>
  );
}

const week=["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function showWeekdays(selectedDay, handleChange){
    const listDays = Array.from(new Array(7), (x, i) => i+1).map((day) =>
                        <option value={parseInt(day)}>{week[day]}</option>
                );
  return (
    <select name="days" id="days" defaultValue={parseInt(selectedDay)} onChange={e=> {handleChange(e, "day")}} style={{marginBottom: "0.5em"}}>
        {listDays}
    </select>
  );
}

export default class SessionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
        this.onChangeField= this.onChangeField.bind(this);
        this.onChangeCheckbox= this.onChangeCheckbox.bind(this);

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
        this.onUnavailability = this.onUnavailability.bind(this);
    }
    onUnavailability(){

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
        if (this.state.id){
            this.props.checkAvailability(this.state);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedSession !== this.props.selectedSession) {
          this.updateStateFromSession(this.props.selectedSession);
          if (this.props.selectedSession.id){
            this.props.checkAvailability(this.state);
          }
        }

        if (prevProps.rooms !== this.props.rooms){
            if (!this.props.rooms.map(t => t.name).includes(this.state.room.name)){
                this.setState({
                    room: {
                        name: "Sin Asignar",
                        checkConcurrency: false
                    }
                });
            }
        }

        if (prevProps.teachers !== this.props.teachers){

            if (!this.props.teachers.map(t => t.name).includes(this.state.teacher.name)){
                this.setState({
                    teacher: {
                        name: "Sin Asignar",
                        checkConcurrency: false
                    }
                });

            }
        }

    }

    componentDidMount(){
        if (this.state.id){
            this.props.checkAvailability(this.state);
        }
    }

    handleSubmit(event){
        event.preventDefault();
        var session={
            id: this.state.id,
            subjectName: this.state.subjectName,
            groupName: this.state.groupName,
            length: this.state.length,
            room: this.state.room,
            teacher: this.state.teacher,
            color: this.state.color,
            day: this.state.day,
            startTime: this.state.startTime
        }

        this.props.updateSession(session);
        this.setState({
            id: null
        });
    }

    onChangeField(event, field){
        if (field==="day"){
            this.setState({day: parseInt(event.target.value)},
            ()=>{this.props.checkAvailability(this.state)});
        }
        else if (["room", "teacher"].includes(field)){
            this.setState({[field]: JSON.parse(event.target.value)});
        }else{
        this.setState({[field]: event.target.value ===""? 0:event.target.value}
            ,()=>{
                if (["length", "startTime"].includes(field)){
                    this.props.checkAvailability(this.state);
                }
            });
        }
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
                    {spanish.subject}
                </label>
                <SessionInput disabled type="text" name="subject" value={this.state.subjectName} onChange= {event => {this.onChangeField(event,"subjectName")}}/>
                <label>
                    {spanish.group}
                </label>
                <SessionInput disabled type="text" name="group" value={this.state.groupName}  onChange= {event => {this.onChangeField(event,"groupName")}}/>
                <label>
                    {spanish.color}
                </label>
                <SessionInput data-testid="colorInput" type="color" name="color" value={this.state.color}  onChange= {event => {this.onChangeField(event,"color")}}/>
                
                <label>
                    {spanish.day}
                </label>
                {showWeekdays(this.state.day, this.onChangeField)}
                <label>
                    {spanish.startTime}
                </label>
                <SessionInput data-testid="startTimeInput" type="time" name= "start" min="08:00" max="21:00" value={this.state.startTime} onChange= {event => {this.onChangeField(event,"startTime");}}></SessionInput>
                
                <label>
                    {spanish.length}
                </label>
                <SessionInput data-testid="lengthInput" type="number" name="length"  value={this.state.length}  onChange= {event => {this.onChangeField(event,"length");}}/>
                <label>
                    {spanish.classRoom}
                </label>
                {showRooms(this.props.rooms, this.onChangeField, this.state.room, "room")}
                <label>
                    {spanish.teacher}
                </label>
                {showRooms(this.props.teachers, this.onChangeField, this.state.teacher, "teacher")}
                <br/>
                <FormSubmit data-testid="submitButton" color = "#2DA283" type="submit" value={spanish.update}/>
            </FlexForm>

            </div>
        );
        }else{
            return null;
        }
    }

}

/*----NOTIFICATIONS FRAGMENT- GOES RIGHT BELOW SUBMIT BUTTON-----
            <h4 style={{textAlign: "center"}}>Notificaciones</h4>
            <NotificationsButtonsContainer>
            <FormButton color = "#2DA283">
                ver
            </FormButton>
            <FormButton color = "#2DA283">
                añadir
            </FormButton>
            </NotificationsButtonsContainer>

            ----------------------------------------
*/


//DONE: CRUD profesores
//DONE: preparar concurrencia profesores
//DONE: session form concurrencia profesores
//DONE: concurrencia desde horario
//DONE: Borrar asignaturas
//DONE: Añadir bloques al check de ocupación (son 52 bloques - 13X4 - no 48 - 12X4)
//DONE: Creación sesiones desde vista de Asignaturas
//DONE: Varias sesiones en un mismo segmento de tiempo
//DONE: Validaciones inputs
//DONE  Casos: S1 > S2 -> S1 se dibuja debajo de S2
//DONE         S1 = S2 -> Comparten celda

//DONE: Add titulaciones
//DONE: Check colisiones al cambiar asignatura de semestre !!!
//NOPE: Desasignar aulas/profesores al borrarlos
//TODO: AUTENTICACIÓN