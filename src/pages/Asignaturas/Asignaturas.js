import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, Button, CentralMenu, Footer} from '../PagesElements';
import SessionForm from '../../components/SessionForm';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';
import SubjectForm from '../../components/SubjectForm';
import { ColorButton, EmptySpace, FormBody, FormElementGroup, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import Modal from '../../components/Modal';


const rooms=["Sala 1", "Sala Grande", "Salón de actos"];


function getAvalibleRooms(session){
  return rooms;
}

function createEmptyGroup(){
  return {defaultSessionValues:{color: ""}};
}

function createDefaultSession(group){
  var session = {
    subjectName: group.subjectName,
    groupName: group.groupName,
    color: group.defaultSessionValues.color,
    recurrent: group.defaultSessionValues.recurrent,
    teacher: group.defaultSessionValues.teacher
  };
  if (session.recurrent){
    session.recurrencePeriod= group.defaultSessionValues.recurrencePeriod;
    session.startFrom= group.defaultSessionValues.startFrom;
    session.endAt= group.defaultSessionValues.endAt;
  }else{

  }

  return session;
}

function ListSubjects(params, onSelectSubject) {
  return  params.map((subject) =>
  <ColorButton color = {subject.color} padding="1vh" margin="2%" onClick={()=>{onSelectSubject(subject)}}>{subject.subjectName}</ColorButton>
);
}

function createSubjectForm(subject, onChangeField, createSubject, showModal){
  return(
    <React.Fragment>
      <h2>Create Subject</h2>
      <FormBody>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Subject Name</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="subject" value={subject.subjectName} onChange= {event => {onChangeField(event,"subjectName", "newSubject")}}/>
        </FormElementGroup>
  
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">color</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={subject.color} onChange= {event => {onChangeField(event,"color", "newSubject")}}/>
        </FormElementGroup>
  
        <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "auto"}}>
            <ColorButton color = "#db3f3f" margin="0 1vw" padding="0.5rem 1rem"   width="fit-content" onClick={(e)=>{e.preventDefault(); createSubject(subject); showModal()}}>Create</ColorButton>
        </div>
      </FormBody>
    </React.Fragment>
  );
  }

function createGroupForm(selectedSubject, group, onChangeField,onChangeCheckBox, createGroup, showModal){
  console.log("group");
  console.log(group);
return (
  <React.Fragment>
      <h2>Create Group</h2>
      <FormBody height="36vh" overflowy="auto" style={{    "border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Group Name</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="subject" value={group.groupName} onChange= {event => {onChangeField(event,"groupName", "newGroup")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Group color</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.color} onChange= {event => {onChangeField(event,"color", "newGroup")}}/>
                    </FormElementGroup>
                    
                    <StyledLabel margin= "0 0.5vw 0 0.5vw"> <b>Sessions default values</b></StyledLabel>
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Sssion color</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.defaultSessionValues.color} onChange= {event => {onChangeField(event,"color", "newGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Recurrent</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="checkbox" name="recurrent" checked={group.defaultSessionValues.recurrent} value={group.defaultSessionValues.recurrent} onChange={event => {onChangeCheckBox("defaultSessionValues", group.defaultSessionValues, "recurrent")}}/>
                    </FormElementGroup>

                    {group.defaultSessionValues.recurrent===true? 
                    <React.Fragment> 
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Recurrence Period</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="recurrencePeriod" value={group.defaultSessionValues.recurrencePeriod} onChange= {event => {onChangeField(event,"recurrencePeriod", "newGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Starts From</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="week" name="startFrom" value={group.defaultSessionValues.startFrom} onChange= {event => {onChangeField(event,"startFrom", "newGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Ends At</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="week" name="endAt" value={group.defaultSessionValues.endAt} onChange= {event => {onChangeField(event,"endAt", "newGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                        
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <FormElementGroup>
                            <StyledLabel margin= "0 0.5vw 0 0.5vw">Execution Date</StyledLabel>
                            <StyledInput margin= "0 0.5vw 0 0.5vw" type="date" name="day" value={group.defaultSessionValues.executionDay} onChange= {event => {onChangeField(event,"executionDate", "newGroup", "defaultSessionValues")}}/>
                        </FormElementGroup>
                    </React.Fragment>
                    }
                    
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Room</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="room" value={group.defaultSessionValues.room} onChange= {event => {onChangeField(event,"room", "newGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Teacher</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="room" value={group.defaultSessionValues.teacher} onChange= {event => {onChangeField(event,"teacher", "newGroup", "defaultSessionValues")}}/>
                    </FormElementGroup> 

                    <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "0 0 1vh 0"}}>
                        <ColorButton color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content" onClick={(e)=>{e.preventDefault(); createGroup(selectedSubject, group); showModal()}}>Create</ColorButton>
                    </div>
                </FormBody>
  </React.Fragment>
);
}

function createSessionForm( selectedGroup, session, onChangeField, onChangeCheckBox, createSession, showModal){
  
  return (
    <React.Fragment>
      <FormBody>
        <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw">Subject Name</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  disabled type="text" name="subject" value={selectedGroup.subjectName}/>
        </FormElementGroup>
        
        <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw">Group Name</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  disabled type="text" name="group" value={selectedGroup.groupName} />
        </FormElementGroup>

        <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw">color</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="color" name="color" value={session.color} onChange= {event => {onChangeField(event,"color", "newSession")}}/>
        </FormElementGroup>

        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Recurrent</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw"  type="checkbox" name="recurrent" checked={session.recurrent} value={session.recurrent} onChange={event => {onChangeCheckBox("newSession", session, "recurrent")}}/>
        </FormElementGroup>

        {session.recurrent===true? 
        <React.Fragment> 
            <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">Recurrence Period</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="recurrencePeriod" value={session.recurrencePeriod} onChange= {event => {onChangeField(event,"recurrencePeriod", "newSession")}}/>
            </FormElementGroup>
            <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">Starts From</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="week" name="startFrom" value={session.startFrom} onChange= {event => {onChangeField(event,"startFrom", "newSession")}}/>
            </FormElementGroup>
            <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">Ends At</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="week" name="endAt" value={session.endAt} onChange= {event => {onChangeField(event,"endAt", "newSession")}}/>
            </FormElementGroup>
        </React.Fragment>
        :
        <React.Fragment>
            <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">Execution Date</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="date" name="day" value={session.executionDay} onChange= {event => {onChangeField(event,"executionDate", "newSession")}}/>
            </FormElementGroup>
        </React.Fragment>
        }
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">start Time</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="day" value={session.startMinute} onChange= {event => {onChangeField(event,"startMinute", "newSession")}}/>
        </FormElementGroup>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Day</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="endAt" value={session.day} onChange= {event => {onChangeField(event,"day", "newSession")}}/>
        </FormElementGroup>
        <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">Duration</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="day" value={session.length} onChange= {event => {onChangeField(event,"length", "newSession")}}/>
        </FormElementGroup>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Room</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="room" value={session.room} onChange= {event => {onChangeField(event,"room", "newSession")}}/>
        </FormElementGroup>

        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Teacher</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="room" value={session.teacher} onChange= {event => {onChangeField(event,"teacher", "newSession")}}/>
        </FormElementGroup> 


        <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "0 0 1vh 0"}}>
          <ColorButton color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content" onClick={(e)=>{e.preventDefault();createSession(session); showModal()}}>Create</ColorButton>
        </div>
      </FormBody>
    </React.Fragment>
  );
}


export default class Horario extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.handleSessionClick = this.handleSessionClick.bind(this);
    this.state={
      loading: false,
      sessions: [],
      subjects: [],

      showModal: false,
      modalForm: " ",
      newSubject: {},
      newGroup: createEmptyGroup(), 
      newSession: {}
    };

    this.setLoading = this.setLoading.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.createSession = this.createSession.bind(this);


    this.onSelectSubject  =    this.onSelectSubject.bind(this);
    this.onSelectGroup    =    this.onSelectGroup.bind(this);
    this.onSelectSession  =    this.onSelectSession.bind(this);
    this.onChangeField    =    this.onChangeField.bind(this);
    this.onChangeCheckBox =    this.onChangeCheckBox.bind(this);

    this.setSubjects = this.setSubjects.bind(this);
    this.createSubject = this.createSubject.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.updateSubjectName = this.updateSubjectName.bind(this);
    
    this.createGroup = this.createGroup.bind(this);

    this.showModal = this.showModal.bind(this);
    this.chooseCreateForm= this.chooseCreateForm.bind(this);
  }

  chooseCreateForm(form,selectedSubject, selectedGroup){
    switch(form){
      case "subject":
        return createSubjectForm(this.state.newSubject, this.onChangeField, this.createSubject, this.showModal);
      case "group":
        return createGroupForm(selectedSubject, this.state.newGroup, this.onChangeField, this.onChangeCheckBox, this.createGroup, this.showModal);
      case "session":
        return createSessionForm(selectedGroup, this.state.newSession, this.onChangeField, this.onChangeCheckBox, this.createSession, this.showModal);
      default:
        return "";
    }
  }
  
  showModal(modalForm){
    this.setState((prevState) =>(
      {showModal: !prevState.showModal,
      modalForm: modalForm}
    ));
  }

  onChangeField(event, field, object, rootField){
    console.log(event.target.value);

    var o = this.state[object];
    if (rootField)
    {
      o[rootField][field]= event.target.value;
    }
    else{
      o[field]= event.target.value;
    }

    this.setState({[object]: o});

    console.log("state");
    console.log(this.state);
  }

  onChangeCheckBox(field, object, fieldOfObject){
    if (fieldOfObject){
      object[fieldOfObject] = !object[fieldOfObject];
      this.setState({[field]: object});  
    }else{
      this.setState(prevState=>({[field]: !prevState[field]}));  
    }

  }

  
  onSelectSubject(subject){
    this.setState({
      selectedSubject: JSON.parse(JSON.stringify(subject)),
      originalSelectedSubject: subject,
      newGroup: createEmptyGroup(),
      selectedGroup: null,
      selectedSession: null
    });
  }

  
  onSelectGroup(group){
    console.log(group);
    this.setState({
      selectedGroup: JSON.parse(JSON.stringify(group)),
      selectedSession: null,
      newSession: createDefaultSession(group)
    });
    this.context.loadSessionsOfSubjectGroup(group.subjectName, group.groupName, this.setSessions);
  }

  onSelectSession(session){
    this.setState({
      selectedSession: JSON.parse(JSON.stringify(session))
    });
  }

  handleSessionClick(clickedSession){
    this.setState({ 
      selectedSession: clickedSession});
      console.log(clickedSession);
  }
  
  setLoading(_loading){
    this.setState({loading: _loading});
  }
  setSessions(_sessions){
    console.log("sessions");
    console.log(_sessions);
    this.setState({sessions: _sessions});
  }
  updateSession(session){
    this.context.updateSession(session, ()=> {
      this.setState((prevState) =>(
        {sessions: [...prevState.sessions.filter(s => s.id!==session.id), session]}
      ));
    }
  );
  }
  createSession(session){
    this.context.createSession(session, ()=> {
        this.setState((prevState) =>(
          {sessions: [...prevState.sessions, session]}
        ));
      }
    );
  }

  createSubject(subject){
    this.context.createSubject(subject, ()=> {
      this.setState((prevState) =>(
        {subjects: [...prevState.subjects, subject]}
        ));
      }
    );
  }

  createGroup(subject, group){
    group.subjectName = subject.subjectName;
    group.type = "group";
    subject.groups.push(group);
    this.context.updateSubject(subject, ()=> {
      this.setState((prevState) =>(
        {subjects: [...prevState.subjects.filter(s => s.id!==subject.id), subject]}
        ));
      }
    );
  }

  setSubjects(_subjects){
    this.setState({subjects: _subjects});
  }


  updateSubject(subject){
    console.log("update subject");
    var callback= ()=> {
      this.setState((prevState) =>(
        {subjects: [...prevState.subjects.filter(s => s.id!==subject.id), subject],
        selectedSubject: null,
        selectedGroup: null,
        selectedSession: null}
      ));
    };

    if (subject.subjectName!==this.state.originalSelectedSubject.subjectName){
      this.updateSubjectName(subject, this.state.originalSelectedSubject.subjectName, callback);
    }else{
      this.context.updateSubject(subject, callback);
    }
  }

  updateSubjectName(subject, oldSubjectname, callback){
    this.context.updateSubjectName(subject, oldSubjectname, callback);
  }

  componentDidMount() {
    this.context.setLoadingCallback(this.setLoading);
    
    this.context.loadSubjectsOfTeacher("teacher Z", this.setSubjects);
    this.context.loadSessionsOfTeacher("teacher Z", this.setSessions);
  }

  render() {
    return (
      <MyLoader
      active={this.state.loading}
      spinner
      text='Loading your content...'
      >
      <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      >                
      <EmptySpace/>

          <SpaceBetweenMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Asignaturas</h2>
              </MenuHeader>
              <MenuBody>
                {ListSubjects(this.state.subjects, this.onSelectSubject)}
                <Button onClick={()=> {this.showModal("subject")}}>
                  +
                </Button>
              </MenuBody>
            </LateralMenu>
            <CentralMenu>
              <SubjectForm 
                showModal = {this.showModal}
                selectedSubject={this.state.selectedSubject}
                selectedGroup={this.state.selectedGroup}
                sessions={this.state.sessions}
                onSelectGroup={this.onSelectGroup} 
                onSelectSession={this.onSelectSession}
                onChangeField={this.onChangeField}
                onChangeCheckBox={this.onChangeCheckBox}
                updateSubject={this.updateSubject}>

              </SubjectForm>
            </CentralMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Sesión</h2>
              </MenuHeader>
              <MenuBody>
                {
                  this.state.selectedSession!=null?
                  <SessionForm getAvalibleRooms = {getAvalibleRooms} 
                  key ={this.state.selectedSession.id} 
                  id ={this.state.selectedSession.id} 
                  selectedSession={this.state.selectedSession}
                  updateSession = {this.updateSession}>
                  </SessionForm>:
                  ""
                }

              </MenuBody>
            </LateralMenu>     
          </SpaceBetweenMenu>
          <Footer></Footer>
        </div>
        <Modal onClose={this.showModal} show={this.state.showModal}>
          {this.chooseCreateForm(this.state.modalForm, this.state.selectedSubject, this.state.selectedGroup)}
        </Modal>
      </MyLoader>
    );
  };
  
}
