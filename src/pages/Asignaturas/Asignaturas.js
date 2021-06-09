import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, Button, CentralMenu, Footer} from '../PagesElements';
import SessionForm from '../../components/SessionForm';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';
import SubjectForm from '../../components/SubjectForm';
import { ColorButton, EmptySpace, FormBody, FormElementGroup, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import Modal from '../../components/Modal';


const rooms=["Sala 1", "Sala Grande", "Salón de actos"];

function showRooms(rooms, handleChange){
  const listRooms = rooms.map((room) =>
  <option value={room}>{room}</option>
);



return (
  <select name="rooms" id="rooms" onChange={handleChange} style={{margin: "0 0.5vw 0 0.5vw"}}>
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
  <select name="days" id="days" defaultValue={selectedDay} onChange={(event)=>{handleChange(event,"day", "newSession")}} style={{margin: "0 0.5vw 0 0.5vw"}}>
      {listDays}
  </select>
);
}


function createEmptyGroup(){
  return {defaultSessionValues:{color: ""}};
}

function createDefaultSession(group){
  var session = {
    subjectName: group.subjectName,
    groupName: group.groupName,
    color: group.defaultSessionValues.color,
    teacher: group.defaultSessionValues.teacher
  };

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
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Session color</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.defaultSessionValues.color} onChange= {event => {onChangeField(event,"color", "newGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>
                    
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">Room</StyledLabel>
                        {showRooms(rooms)}
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
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Start Time</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="time" name="startTime" value={session.startTime} onChange= {event => {onChangeField(event,"startTime", "newSession")}}/>
        </FormElementGroup>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Day</StyledLabel>
            {showWeekdays(session.day, onChangeField)}
        </FormElementGroup>

        <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">Duration</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="day" value={session.length} onChange= {event => {onChangeField(event,"length", "newSession")}}/>
        </FormElementGroup>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">Room</StyledLabel>
            {showRooms(rooms)}
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


export default class Asignaturas extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.handleSessionClick = this.handleSessionClick.bind(this);
    this.state={
      loading: false,
      sessions: [],
      subjects: [],
      titles: [],
      rooms: [],

      showModal: false,
      modalForm: " ",
      newSubject: {titles:[]},
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

    this.SelectTitleOfSubject= this.SelectTitleOfSubject.bind(this);

    this.getRooms = this.getRooms.bind(this);
    this.setRooms = this.setRooms.bind(this);
    this.getTimeBlocksOfSession = this.getTimeBlocksOfSession.bind(this);
  }

  getRooms(){
    this.context.getRooms((rooms)=> {
      this.setState(
        {rooms: rooms}
      );
    }
  );
  }

  getTimeBlocksOfSession(session){
    var time = session.startTime.split(":");
    var startMinute= parseInt(time[0])*60 + parseInt(time[1]);
    const row = (((startMinute - 480)/15)>>0) + 1;
    const rowEnd= Math.ceil(((startMinute+session.length -480) /15))+1;

    console.log("time " + time + " - startMinute" + startMinute + " - row " + row + "- rowend " + rowEnd);
  
    console.log( Array.from(new Array(rowEnd-row), (x, i) => i+row));
    return Array.from(new Array(rowEnd-row), (x, i) => i+row);
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
      selectedSession: JSON.parse(JSON.stringify(session)),
      rooms: [session.room]
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
    session["semester"]= this.state.selectedSubject.semester;
    this.context.createSession(session, ()=> {
        this.setState((prevState) =>(
          {sessions: [...prevState.sessions, session]}
        ));
      }
    );
  }

  createSubject(subject){
    subject.semester= 1;
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
  setRooms(_rooms){
    this.setState({rooms: _rooms});
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

  SelectTitleOfSubject(title, checkBoxBehaviour){
    var titles= this.state.selectedSubject.titles;
    var titlesNames= titles.map(t=> t.titleName);
    console.log(titles);
    console.log(titlesNames);
    const index = titlesNames.indexOf(title.titleName);
    console.log(title);
    console.log(index);
    if (index > -1) {
      if (checkBoxBehaviour){
        titles.splice(index, 1);
      }else{
        titles[index]= title;
      }
    }else{
      title["semester"]=this.state.selectedSubject.semester;
      titles.push(title);
    }

    var subject = this.state.selectedSubject;
    subject.titles= titles;

    this.setState({
      selectedSubject: subject
    })
  }



  componentDidMount() {
    this.context.setLoadingCallback(this.setLoading);
    
    this.context.loadSubjectsOfTeacher("teacher Z", this.setSubjects);
    this.context.loadSessionsOfTeacher("teacher Z", this.setSessions);
    this.context.loadTitles( (titles)=>{this.setState({titles: titles})});
//    this.context.getRooms((rooms)=>{this.setState({rooms: rooms})});
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
                newSubject={this.state.newSubject}
                selectedGroup={this.state.selectedGroup}
                sessions={this.state.sessions}
                onSelectGroup={this.onSelectGroup} 
                onSelectSession={this.onSelectSession}
                onChangeField={this.onChangeField}
                onChangeCheckBox={this.onChangeCheckBox}
                updateSubject={this.updateSubject}
                titles= {this.state.titles}
                onSelectTitle={this.SelectTitleOfSubject}
                >

              </SubjectForm>
            </CentralMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Sesión</h2>
              </MenuHeader>
              <MenuBody>
                {
                  this.state.selectedSession!=null?
                  <SessionForm getAvalibleRooms = {(session)=>{this.context.getAvailableRooms(this.state.selectedSubject.semester,
                                                                                      session.day, 
                                                                                      this.getTimeBlocksOfSession(session), 
                                                                                      this.setRooms);}} 
                  key ={this.state.selectedSession.id} 
                  id ={this.state.selectedSession.id} 
                  selectedSession={this.state.selectedSession}
                  updateSession = {this.updateSession}
                  rooms = {this.state.rooms}>
                  </SessionForm>:
                  ""
                }

              </MenuBody>
            </LateralMenu>     
          </SpaceBetweenMenu>
          <Footer></Footer>
        </div>
        <Modal width="60%" onClose={this.showModal} show={this.state.showModal}>
          {this.chooseCreateForm(this.state.modalForm, this.state.selectedSubject, this.state.selectedGroup)}
        </Modal>
      </MyLoader>
    );
  };
  
}
