import React from 'react'
import Modal from '../Modal';

import {FullBody, Header, FormBody, FormGroup, StyledInput, ColorButton, StyledLabel, FormElementGroup} from './SubjectFormElements';

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


function GroupButtonList(subject, onSelectGroup){
    return subject.groups
    .map((group) =>
    <ColorButton type="button" color = {group.color} padding="1vh" margin="1%" onClick={()=>{onSelectGroup(group)}}>{group.groupName}</ColorButton>
  );
}

function sessionToString(session){
    return <p style={{overflow: "hidden",
                     textOverflow: "ellipsis"}}>
           {session.groupName} | {""+ session.length + " mins"} | {session.room.name}
    </p>;
  }
function SessionButtonList(sessions, onSelectSession, onDelete){
    return Array.from(sessions)
    .map((session) =>
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <ColorButton color = {session.color} style={{width: "100%"}} padding="0.5vh" margin="1%" onClick={(event)=>{event.preventDefault(); onSelectSession(session)}}>{sessionToString(session)}</ColorButton>
        <ColorButton color = {"#c94242"} padding="0.5vh" margin="1%" onClick={(event)=>{event.preventDefault(); onDelete(session)}}>Delete</ColorButton>
    </div>
    
  );
}

function SubjectFormGroup(subject, onChangeField, onSelectGroup, updateSubject, showModal, showTitles, deleteSubject){
    return (<FormGroup width="25vw" height="74vh">
                <Header>
                    <h2>SUBJECT</h2>
                </Header>
                    <FormBody height="36vh" overflowy= "auto" style={{"border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Subject Name</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="subject" value={subject.subjectName} onChange= {event => {onChangeField(event,"subjectName", "selectedSubject")}}/>
                        </FormElementGroup>

                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">color</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={subject.color} onChange= {event => {onChangeField(event,"color", "selectedSubject")}}/>
                        </FormElementGroup>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Semester</StyledLabel>
                            <select name="semesters" defaultValue={subject.semester} onChange={(e)=>{onChangeField(e,"semester", "selectedSubject"); onChangeField({target:{value: []}}, "titles", "selectedSubject")}}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                            </select>
                        </FormElementGroup>
                        <FormElementGroup>
                            <ColorButton color = "#2DA283" margin= "0 0.5vw 0 0.5vw" padding="0.5rem 1rem" width="fit-content"
                                             onClick= {event => {event.preventDefault(); showTitles()}}>Related titles</ColorButton>                        </FormElementGroup>


                    <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "1vh 0 0.5vh 0"}}>
                        <ColorButton color = "#db3f3f" margin="0 1vw" padding="0.5rem 1rem"   width="fit-content"
                                            onClick={event=>{event.preventDefault(); deleteSubject(subject);}}>Delete</ColorButton>
                        <ColorButton color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content"
                                             onClick= {event => {event.preventDefault(); updateSubject(subject)}}>Modify</ColorButton>
                    </div>
                    </FormBody>
                    
                    <Header>
                        <h2>GROUPS</h2>
                    </Header>
                    <FormBody height="27.5vh" overflow="scroll" overflowy="scroll" margin="0.5vh 0 0 0" border="1px solid #EFEFEF">
                        {GroupButtonList(subject, onSelectGroup)}
                        <ColorButton disabled={subject.groups.length>9} color = "#2DA283" padding="1vh" margin="2%" onClick={(e)=> {e.preventDefault(); showModal("group")}}>+</ColorButton>
                    </FormBody>
            </FormGroup>);
}

function GroupFormGroup(group, sessions, onChangeField, onSelectSession, onChangeCheckBox, showModal, onDeleteSession, onDeleteGroup, subject, checkAvailability){
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
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Session color</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.defaultSessionValues.color} onChange= {event => {onChangeField(event,"color", "selectedGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>

                    <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "0 0 1vh 0"}}>
                        <ColorButton color = "#db3f3f" margin="0 1vw" padding="0.5rem 1rem"   width="fit-content" onClick={(e)=>{e.preventDefault(); onDeleteGroup(subject, group)}}>Delete</ColorButton>
                        <ColorButton color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content">Modify</ColorButton>
                    </div>
                </FormBody>
                <Header>
                    <h2>SESSIONS</h2>
                </Header>
                <FormBody height="27.5vh" overflowy="auto" margin="0.5vh 0 0 0" style={{    "border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                    {SessionButtonList(sessions, onSelectSession, onDeleteSession)}
                    <ColorButton color = "#2DA283" padding="1vh" margin="2%" onClick={(e)=> {e.preventDefault(); showModal("session"); checkAvailability()}}>+</ColorButton>

                </FormBody>

            </FormGroup>);
}

//checkbox -> select title + semester 1
//semester -> title is selected, select semester
function TitleInSelectedTitles(title, inSubject, onChangeCheckBox, semester){
    var selectTitle={titleName: title.titleName, semester: parseInt(title.semester)}

    return(
            <FormElementGroup style={{flexDirection: "row"}}>
                <StyledInput margin= "0.5vh 0.5vw 0 0"  type="checkbox" checked={inSubject} value={inSubject} onChange={event => {onChangeCheckBox(selectTitle, true)}}/>
                <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
                <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    {title.titleName}
                </p> 
                </StyledLabel>
                {inSubject?
                <React.Fragment>
                <p> - Semester: </p>
                <select name="semesters" defaultValue={semester} onChange={(e)=>{onChangeCheckBox({titleName: title.titleName, semester: parseInt(e.target.value)}, false);}}>
                    {Array.from(new Array(title.semesters), (x, i) => i + 1).map((sem) =>
                        (parseInt(sem)%2) === parseInt(semester)%2? <option value={parseInt(sem)}>{sem}</option>: ""
                    )}
                </select>
                </React.Fragment>
                :""
                }
            </FormElementGroup>
    );
}


function selectedTitlesOfSubject(titles, selectedTitles, onChangeCheckBox, semester){
    var selectedTitlesNames = selectedTitles.map( t => t.titleName);
    return (
        <FormBody overflowy="auto">
            <h2>Selected Titles</h2>
            {titles.map(t =>TitleInSelectedTitles(t, selectedTitlesNames.includes(t.titleName),
                                                onChangeCheckBox, 
                                                selectedTitlesNames.includes(t.titleName)? 
                                                selectedTitles[selectedTitlesNames.indexOf(t.titleName)].semester:
                                                0, 
                                                semester))}
        </FormBody>
    );
}



export default class SubjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            subjectName: subject.subjectName,
            color: subject.color,
            groups: subject.groups,
            showTitles: false
        };

        this.showTitles= this.showTitles.bind(this);
    }

    showTitles(modalContent){
        this.setState((prevState) =>(
          {showTitles: !prevState.showTitles,
          modalContent: modalContent}
        ));
      }



    render(){
        return(
            <React.Fragment>
                <FullBody>
                    {this.props.selectedSubject? SubjectFormGroup(this.props.selectedSubject, 
                                                                    this.props.onChangeField,
                                                                    this.props.onSelectGroup, 
                                                                    this.props.updateSubject, 
                                                                    this.props.showModal,
                                                                    this.showTitles,
                                                                    this.props.deleteSubject)
                                                : ""}
                    {this.props.selectedGroup? GroupFormGroup(this.props.selectedGroup, 
                                                            this.props.sessions, 
                                                            this.props.onChangeField, 
                                                            this.props.onSelectSession, 
                                                            this.props.onChangeCheckBox, 
                                                            this.props.showModal,
                                                            this.props.onDeleteSession, 
                                                            this.props.onDeleteGroup, 
                                                            this.props.selectedSubject, 
                                                            this.props.checkAvailability):""}
                </FullBody>
                <Modal width= "70%" onClose={this.showTitles} show={this.state.showTitles}>
                    {this.props.selectedSubject? 
                    selectedTitlesOfSubject(this.props.titles, this.props.selectedSubject.titles, this.props.onSelectTitle, this.props.selectedSubject.semester)
                    :""}
                </Modal>
            </React.Fragment>
        )
    }

}