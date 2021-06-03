import React from 'react'

import {FullBody, Header, FormBody, EmptySpace, FormGroup, StyledInput, RowBody, ColorButton, StyledInputButton, StyledLabel, FormElementGroup} from './SubjectFormElements';

import Subject from '../Subject'

const group1= {
    groupName: "Group N",
    color: "#6cd1b6",
    defaultSessionValues: {
        color: "#ff4451",
        endAt: "2021-W52",
        length: 45,
        recurrencePeriod: 1,
        recurrent: true,
        room: "sin asignar",
        startFrom: "2021-W01",
        teacher: "teacher Z"
    }
};
const group2= {
    groupName: "Group N",
    color: "#F5AB00",
    defaultSessionValues: {
        color: "#ff4451",
        endAt: "2021-W52",
        length: 45,
        recurrencePeriod: 1,
        recurrent: true,
        room: "sin asignar",
        startFrom: "2021-W01",
        teacher: "teacher Z"
    }
};
const group3= {
    groupName: "Group N",
    color: "#4350db",
    defaultSessionValues: {
        color: "#ff4451",
        endAt: "2021-W52",
        length: 45,
        recurrencePeriod: 1,
        recurrent: true,
        room: "sin asignar",
        startFrom: "2021-W01",
        teacher: "teacher Z"
    }
};
const groups= [group1, group2, group3];
const subject ={
    subjectName: "Subject",
    color: "#6cd1b6",
    groups:groups
}

const session1= {
    "recurrent": true,
    "subjectName": "Subject X",
    "recurrencePeriod": 2,
    "type": "session",
    "color": "#ff4451",
    "length": 45,
    "teacher": "teacher Z",
    "groupName": "Lab N",
    "startMinute": 555,
    "endAt": "2021-W52",
    "day": 5,
    "startFrom": "2021-W01",
    "room": "sin asignar",
    "id": "0jWGAwzVgochXylb74sh"
};

const session2= {
    "recurrent": true,
    "subjectName": "Subject X",
    "recurrencePeriod": 2,
    "type": "session",
    "color": "#ff4451",
    "length": 45,
    "teacher": "teacher Z",
    "groupName": "Lab N",
    "startMinute": 555,
    "endAt": "2021-W52",
    "day": 5,
    "startFrom": "2021-W01",
    "room": "sin asignar",
    "id": "0jWGAwzVgochXylb74sh"
};

const _sessions = [session1, session2, session2, session2, session2, session2,session2];

function GroupButtonList(subject, onSelectGroup){
    return subject.groups
    .map((group) =>
    <ColorButton type="button" color = {group.color} padding="1vh" margin="1%" onClick={()=>{onSelectGroup(group)}}>{group.groupName}</ColorButton>
  );
}

function sessionToString(session){
    return <p style={{overflow: "hidden",
                     textOverflow: "ellipsis"}}>
           {session.groupName} | {""+ session.length + " mins"} | {session.room}
    </p>;
  }
function SessionButtonList(sessions, onSelectSession){
    return Array.from(sessions)
    .map((session) =>
    <ColorButton color = {session.color} padding="0.5vh" margin="1%" onClick={(event)=>{event.preventDefault(); onSelectSession(session)}}>{sessionToString(session)}</ColorButton>
    
  );
}

function SubjectFormGroup(subject, onChangeField, onSelectGroup, updateSubject, showModal){
    return (<FormGroup width="25vw" height="74vh">
                <Header>
                    <h2>SUBJECT</h2>
                </Header>
                    <FormBody height="25vh"  style={{"border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Subject Name</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="subject" value={subject.subjectName} onChange= {event => {onChangeField(event,"subjectName", "selectedSubject")}}/>
                        </FormElementGroup>

                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">color</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={subject.color} onChange= {event => {onChangeField(event,"color", "selectedSubject")}}/>
                        </FormElementGroup>

                    <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "auto"}}>
                        <ColorButton color = "#db3f3f" margin="0 1vw" padding="0.5rem 1rem"   width="fit-content">Delete</ColorButton>
                        <ColorButton color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content"
                                             onClick= {event => {event.preventDefault(); updateSubject(subject)}}>Modify</ColorButton>
                    </div>
                    </FormBody>
                    
                    <Header>
                        <h2>GROUPS</h2>
                    </Header>
                    <FormBody height="38.5vh" overflow="scroll" overflowy="scroll" margin="0.5vh 0 0 0" border="1px solid #EFEFEF">
                        {GroupButtonList(subject, onSelectGroup)}
                        <ColorButton color = "#2DA283" padding="1vh" margin="2%" onClick={(e)=> {e.preventDefault(); showModal("group")}}>+</ColorButton>
                    </FormBody>
            </FormGroup>);
}

function GroupFormGroup(group, sessions, onChangeField, onSelectSession, onChangeCheckBox, showModal){
    return (<FormGroup width="40vw" margin="0 0 0 1.5vw">

                <Header>
                    <h2>GROUP</h2>
                </Header>
                <FormBody height="36vh" overflowy="auto" style={{    "border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Group Name</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" disabled type="text" name="subject" value={group.groupName} onChange= {event => {onChangeField(event,"subjectName", "selectedGroup")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Group color</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.color} onChange= {event => {onChangeField(event,"color", "selectedGroup")}}/>
                    </FormElementGroup>
                    
                    <StyledLabel margin= "0 0.5vw 0 0.5vw"> <b>Sessions default values</b></StyledLabel>
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Sssion color</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.defaultSessionValues.color} onChange= {event => {onChangeField(event,"color", "selectedGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Recurrent</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="checkbox" name="recurrent" checked={group.defaultSessionValues.recurrent} value={group.defaultSessionValues.recurrent} onChange={event => {onChangeCheckBox("defaultSessionValues", group.defaultSessionValues, "recurrent")}}/>
                    </FormElementGroup>

                    {group.defaultSessionValues.recurrent===true? 
                    <React.Fragment> 
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Recurrence Period</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="recurrencePeriod" value={group.defaultSessionValues.recurrencePeriod} onChange= {event => {onChangeField(event,"recurrencePeriod", "selectedGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Starts From</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="week" name="startFrom" value={group.defaultSessionValues.startFrom} onChange= {event => {onChangeField(event,"startFrom", "selectedGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Ends At</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="week" name="endAt" value={group.defaultSessionValues.endAt} onChange= {event => {onChangeField(event,"endAt", "selectedGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Execution Date</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="date" name="day" value={group.defaultSessionValues.executionDay} onChange= {event => {onChangeField(event,"executionDate", "selectedGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                    </React.Fragment>
                    }
                    
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Room</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="room" value={group.defaultSessionValues.room} onChange= {event => {onChangeField(event,"subjectName", "selectedGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Teacher</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="room" value={group.defaultSessionValues.teacher} onChange= {event => {onChangeField(event,"subjectName", "selectedGroup", "defaultSessionValues")}}/>
                    </FormElementGroup> 

                    <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "0 0 1vh 0"}}>
                        <ColorButton color = "#db3f3f" margin="0 1vw" padding="0.5rem 1rem"   width="fit-content">Delete</ColorButton>
                        <ColorButton color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content">Modify</ColorButton>
                    </div>
                </FormBody>
                <Header>
                    <h2>SESSIONS</h2>
                </Header>
                <FormBody height="27.5vh" overflowy="auto" margin="0.5vh 0 0 0" style={{    "border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                    {SessionButtonList(sessions, onSelectSession)}
                    <ColorButton color = "#2DA283" padding="1vh" margin="2%" onClick={(e)=> {e.preventDefault(); showModal("session")}}>+</ColorButton>

                </FormBody>

            </FormGroup>);
}




export default class SubjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            subjectName: subject.subjectName,
            color: subject.color,
            groups: subject.groups
        };

    }


    render(){
        return(
            <React.Fragment>
                <FullBody>
                    {this.props.selectedSubject? SubjectFormGroup(this.props.selectedSubject, this.props.onChangeField, this.props.onSelectGroup, this.props.updateSubject, this.props.showModal): ""}
                    {this.props.selectedGroup? GroupFormGroup(this.props.selectedGroup, this.props.sessions, this.props.onChangeField, this.props.onSelectSession, this.props.onChangeCheckBox, this.props.showModal):""}
                </FullBody>
            </React.Fragment>
        )
    }

}