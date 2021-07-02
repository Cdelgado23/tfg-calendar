import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, Button, CentralMenu, Footer} from '../PagesElements';
import SessionForm from '../../components/SessionForm';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';
import SubjectForm from '../../components/SubjectForm';
import { ColorButton, EmptySpace, FormBody, FormElementGroup, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import Modal from '../../components/Modal';

import {spanish} from '../../translations/Spanish'

function subjectIsValid(subject){
  return subject.color.length>6 && subject.color!=="#ffffff" && subject.subjectName.length>3; 
}

function groupIsValid(subject, group){
  return group.groupName.length>3 && group.color.length>6 && group.color!=="#ffffff"
  && group.defaultSessionValues.color.length>6 && group.defaultSessionValues.color!=="#ffffff"
  && !subject.groups.map(g =>(g.groupName)).includes(group.groupName);
}
function sessionIsValid(session){
  return session.length>0;
}


function showRooms(rooms, field, handleChange, defaultValue){
  const listRooms = rooms.map((room) =>
  <option key={room.name} value={JSON.stringify(room)}>{room.name}</option>
);
rooms.forEach(r=>{if (r.name === defaultValue.name) defaultValue=r;});

return (
  <select name={field} id={field} value={JSON.stringify(defaultValue)} onChange={e=>{handleChange(e,field, "newSession")}} style={{marginBottom: "0.5em"}}>
      {listRooms}
  </select>
);
}

const week=["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function showWeekdays(selectedDay, handleChange, checkAvailability){
  const listDays = Array.from(new Array(7), (x, i) => i+1).map((day) =>
                      <option  key={week[day]} value={parseInt(day)}>{week[day]}</option>
              );
return (
  <select name="days" id="days" defaultValue={selectedDay} onChange={(event)=>{handleChange(event,"day", "newSession", null, checkAvailability)}} style={{margin: "0 0.5vw 0 0.5vw"}}>
      {listDays}
  </select>
);
}


function createEmptyGroup(){
  return {defaultSessionValues:{color: "#ffffff"},
          color: "#ffffff",
          groupName: ""};
}

function createDefaultSession(group){
  var session = {
    subjectName: group.subjectName,
    groupName: group.groupName,
    color: group.defaultSessionValues.color,
    teacher: group.defaultSessionValues.teacher,
    room: group.defaultSessionValues.room,
    day: 1,
    length: 45,
    startTime: "08:00"
  };

  return session;
}

function createEmptySession(){
  var session = {
    day: 1,
    length: 45,
    startTime: "08:00",
    room: {checkConcurrency: false, name: "Sin Asignar"},
    teacher: {checkConcurrency: false, name: "Sin Asignar"}
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
      <h2>{spanish.createSubject}</h2>
      <FormBody>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.name}</StyledLabel>
            <StyledInput data-testid="nameInput" margin= "0 0.5vw 0 0.5vw"  type="text" name="subject" value={subject.subjectName} onChange= {event => {onChangeField(event,"subjectName", "newSubject")}}/>
        </FormElementGroup>
  
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.color}</StyledLabel>
            <StyledInput data-testid="colorInput" margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={subject.color} onChange= {event => {onChangeField(event,"color", "newSubject")}}/>
        </FormElementGroup>
  
        <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "auto"}}>
            <ColorButton disabled={!subjectIsValid(subject)}color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem"   width="fit-content" onClick={(e)=>{ e.preventDefault(); createSubject(subject); showModal()}}>{spanish.create}</ColorButton>
        </div>
      </FormBody>
    </React.Fragment>
  );
  }

function createGroupForm(selectedSubject, group, onChangeField,onChangeCheckBox, createGroup, showModal){

  
return (
  <React.Fragment>
      <h2>{spanish.createGroup}</h2>
      <FormBody height="36vh" overflowy="auto" style={{    "border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.name}</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="text" name="subject" value={group.groupName} onChange= {event => {onChangeField(event,"groupName", "newGroup")}}/>
                    </FormElementGroup>

                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.color}</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.color} onChange= {event => {onChangeField(event,"color", "newGroup")}}/>
                    </FormElementGroup>
                    
                    <StyledLabel margin= "0 0.5vw 0 0.5vw"> <b>{spanish.sessionDefaultValues}</b></StyledLabel>
                    <FormElementGroup>
                        <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.color}</StyledLabel>
                        <StyledInput margin= "0 0.5vw 0 0.5vw" type="color" name="color" value={group.defaultSessionValues.color} onChange= {event => {onChangeField(event,"color", "newGroup", "defaultSessionValues")}}/>
                    </FormElementGroup>
                    <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "0 0 1vh 0"}}>
                        <ColorButton disabled={!groupIsValid(selectedSubject, group)} color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content" onClick={(e)=>{e.preventDefault(); createGroup(selectedSubject, group); showModal()}}>{spanish.create}</ColorButton>
                    </div>
                </FormBody>
  </React.Fragment>
);
}

function createSessionForm( selectedGroup, session, onChangeField, onChangeCheckBox, createSession, showModal, rooms, teachers, checkAvailability){
  
  return (
    <React.Fragment>
      <FormBody>
        <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.subject}</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  disabled type="text" name="subject" value={selectedGroup.subjectName}/>
        </FormElementGroup>
        
        <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.group}</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  disabled type="text" name="group" value={selectedGroup.groupName} />
        </FormElementGroup>

        <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.color}</StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="color" name="color" value={session.color} onChange= {event => {onChangeField(event,"color", "newSession")}}/>
        </FormElementGroup>

        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.startTime}</StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw" type="time" name="startTime" value={session.startTime} onChange= {event => {onChangeField(event,"startTime", "newSession", null, checkAvailability)}}/>
        </FormElementGroup>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.day}</StyledLabel>
            {showWeekdays(session.day, onChangeField, checkAvailability)}
        </FormElementGroup>

        <FormElementGroup>
                <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.length}</StyledLabel>
                <StyledInput margin= "0 0.5vw 0 0.5vw" type="number" name="length" value={session.length} onChange= {event => {onChangeField(event,"length", "newSession", null, checkAvailability)}}/>
        </FormElementGroup>
        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.classRoom}</StyledLabel>
            {showRooms(rooms, "room", onChangeField, session.room)}
        </FormElementGroup>

        <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw">{spanish.teacher}</StyledLabel>
            {showRooms(teachers, "teacher", onChangeField, session.teacher)}
        </FormElementGroup> 


        <div style ={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "0 0 1vh 0"}}>
          <ColorButton disabled={!sessionIsValid(session)} color = "#2DA283" margin="0 1vw" padding="0.5rem 1rem" width="fit-content" onClick={(e)=>{e.preventDefault();createSession(session); showModal()}}>{spanish.create}</ColorButton>
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
      teachers: [],

      showModal: false,
      showError: true,
      error: "error",
      modalForm: " ",
      newSubject: {titles:[], color: "#ffffff", "subjectName":""},
      newGroup: createEmptyGroup(), 
      newSession: {}
    };
    

    this.setLoading = this.setLoading.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.createSession = this.createSession.bind(this);
    this.deleteSession = this.deleteSession.bind(this);


    this.onSelectSubject  =    this.onSelectSubject.bind(this);
    this.onSelectGroup    =    this.onSelectGroup.bind(this);
    this.onSelectSession  =    this.onSelectSession.bind(this);
    this.onChangeField    =    this.onChangeField.bind(this);
    this.onChangeCheckBox =    this.onChangeCheckBox.bind(this);

    this.setSubjects = this.setSubjects.bind(this);
    this.createSubject = this.createSubject.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.updateSubjectName = this.updateSubjectName.bind(this);
    this.deleteSubject = this.deleteSubject.bind(this);
    
    this.createGroup = this.createGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);

    this.showModal = this.showModal.bind(this);
    this.chooseCreateForm= this.chooseCreateForm.bind(this);

    this.SelectTitleOfSubject= this.SelectTitleOfSubject.bind(this);

    this.getRooms = this.getRooms.bind(this);
    this.setRooms = this.setRooms.bind(this);
    this.getTimeBlocksOfSession = this.getTimeBlocksOfSession.bind(this);

    this.setTeachers= this.setTeachers.bind(this);
    this.checkAvailability= this.checkAvailability.bind(this);

    this.errorCallback= this.errorCallback.bind(this);

  }

  errorCallback(err){
    this.setState({showModal:true,
                showError: true,
                error: err});
  }

  checkAvailability(session)
  { 
    this.context.getAvailableRooms(this.state.selectedSubject.semester,
                                    session.day, 
                                    this.getTimeBlocksOfSession(session), 
                                    this.setRooms);
    this.context.getAvailableTeachers(this.state.selectedSubject.semester,
                                      session.day, 
                                      this.getTimeBlocksOfSession(session), 
                                      this.setTeachers);
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
    const rowEnd= Math.ceil(((startMinute+parseInt(session.length) -480) /15))+1;
  
    return Array.from(new Array(rowEnd-row), (x, i) => i+row);
  }


  chooseCreateForm(form, selectedSubject, selectedGroup){
    switch(form){
      case "subject":
        return createSubjectForm(this.state.newSubject, this.onChangeField, this.createSubject, this.showModal);
      case "group":
        return createGroupForm(selectedSubject, this.state.newGroup, this.onChangeField, this.onChangeCheckBox, this.createGroup, this.showModal);
      case "session":
        return createSessionForm(selectedGroup, this.state.newSession, this.onChangeField, this.onChangeCheckBox, 
                                  this.createSession, this.showModal, this.state.rooms, this.state.teachers, this.checkAvailability);
      default:
        return "";
    }
  }

  showModal(modalForm){
    this.setState((prevState) =>(
      {showModal: !prevState.showModal,
      modalForm: modalForm,
      selectedSession: null,
      showError: false}
    ));
  }

  onChangeField(event, field, object, rootField, checkAvailability){
    var value= event.target.value;


    if (["room", "teacher"].includes(field)){
      value= JSON.parse(value);
    }
    if (field==="length" && !value){
      value=0;
    }
    if (["day", "length"].includes(field)){
      value= parseInt(value);
    }

    var o = this.state[object];
    if (rootField)
    {
      o[rootField][field]= value;
    }
    else{
      o[field]= value;
    }

    this.setState({[object]: o}, ()=>{
      if (checkAvailability){
        checkAvailability(this.state.newSession);
      }
    });
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
      rooms: [session.room],
      teachers: [session.teacher]
    });
  }

  handleSessionClick(clickedSession){
    this.setState({ 
      selectedSession: clickedSession});
  }
  
  setLoading(_loading){
    this.setState({loading: _loading});
  }
  setSessions(_sessions){
    this.setState({sessions: _sessions});
  }
  updateSession(session){
    this.context.updateSession(session, ()=> {
      this.context.loadSessionsOfSubjectGroup(this.state.selectedSubject.subjectName, this.state.selectedGroup.groupName, this.setSessions);
    },
    this.state.selectedSubject.semester
  );
  }
  createSession(session){
    this.context.createSession(session, ()=> {
      this.context.loadSessionsOfSubjectGroup(this.state.selectedSubject.subjectName, this.state.selectedGroup.groupName, this.setSessions);
      }, this.state.selectedSubject.semester
    );
  }

  createSubject(subject){
    subject.semester= 1;
    this.context.createSubject(subject, ()=> {
      this.context.getSubjects(this.setSubjects);
    }
    );
  }
  deleteSubject(subject){
    var callback= ()=> {
      this.context.getSubjects(this.setSubjects);
      this.setState((prevState) =>(
        {
        selectedSubject: null,
        selectedGroup: null,
        selectedSession: null}
      ));
    };
    this.context.deleteSubject(subject,callback);
  }

  createGroup(subject, group){
    group.subjectName = subject.subjectName;
    group.type = "group";
    group.defaultSessionValues.teacher= {name: "Sin Asignar", checkConcurrency: false};
    group.defaultSessionValues.room= {name: "Sin Asignar", checkConcurrency: false};
    group.defaultSessionValues.length= 45;
    subject.groups.push(group);
    this.context.updateSubject(subject, ()=> {
      this.setState((prevState) =>(
        {subjects: [...prevState.subjects.filter(s => s.id!==subject.id), subject],
         newGroup: createEmptyGroup()}
        ));
      }
    );
  }

  deleteGroup(subject, group){

    var callback= ()=> {
      this.context.getSubjects(this.setSubjects);
      this.setState((prevState) =>(
        {
        selectedGroup: null,
        selectedSession: null}
      ));
    };

    this.context.deleteGroup(subject, group, callback );
  }

  setSubjects(_subjects){
    this.setState({subjects: _subjects,
      selectedSubject: null,
      selectedGroup: null,
      selectedSession: null});
  }
  setRooms(_rooms){
    if (this.state.selectedSession){
      const index = _rooms.map(r=>(r.name)).indexOf(this.state.selectedSession.room.name);
      if (index < 0) {
        _rooms=[..._rooms, this.state.selectedSession.room];
      }
    }
    this.setState({rooms: _rooms});
  }
  setTeachers(_teachers){
    if (this.state.selectedSession){
      const index = _teachers.map(r=>(r.name)).indexOf(this.state.selectedSession.teacher.name);
      if (index < 0) {
        _teachers=[..._teachers, this.state.selectedSession.teacher];
      }
    }
    this.setState({teachers: _teachers});
  }

  updateSubject(subject){
    var callback= ()=> {
      this.context.getSubjects(this.setSubjects);
      this.setState((prevState) =>(
        {selectedSubject: null,
        selectedGroup: null,
        selectedSession: null}
      ));
    };

    if (subject.subjectName!==this.state.originalSelectedSubject.subjectName){
      this.updateSubjectName(subject, this.state.originalSelectedSubject.subjectName, callback);
    }else{
      this.context.updateSubject(subject, callback, subject.semester !== this.state.originalSelectedSubject.semester);
    }
  }

  deleteSession(session){
    this.context.deleteSession(session, ()=>{
      this.setState((prevState) =>(
        {sessions: prevState.sessions.filter((s)=>(s.id!==session.id))}
      ));
    },this.state.selectedSubject.semester);
  }

  updateSubjectName(subject, oldSubjectname, callback){
    this.context.updateSubjectName(subject, oldSubjectname, callback);
  }

  SelectTitleOfSubject(title, checkBoxBehaviour){
    var titles= this.state.selectedSubject.titles;
    var titlesNames= titles.map(t=> t.titleName);
    const index = titlesNames.indexOf(title.titleName);
    if (index > -1) {
      if (checkBoxBehaviour){
        titles.splice(index, 1);
      }else{
        titles[index]= title;
      }
    }else{
      title["semester"] = parseInt(this.state.selectedSubject.semester);
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
    this.context.setErrorCallback(this.errorCallback);
    
    this.context.getSubjects(this.setSubjects);
    this.context.loadTitles( (titles)=>{this.setState({titles: titles})});

//    this.context.getRooms((rooms)=>{this.setState({rooms: rooms})});
  }

  render() {
    return (
      <MyLoader
      active={this.state.loading}
      spinner
      text={spanish.loadingMsg}
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
                <h2>{spanish.subjects}</h2>
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
                onDeleteSession={this.deleteSession}
                onDeleteGroup = {this.deleteGroup}
                deleteSubject= {this.deleteSubject}
                checkAvailability={()=>this.checkAvailability(createEmptySession())}
                >

              </SubjectForm>
            </CentralMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>{spanish.session}</h2>
              </MenuHeader>
              <MenuBody>
                {
                  this.state.selectedSession!=null?
                  <SessionForm 
                  key ={this.state.selectedSession.id} 
                  id ={this.state.selectedSession.id} 
                  selectedSession={this.state.selectedSession}
                  updateSession = {this.updateSession}
                  rooms = {this.state.rooms}
                  teachers = {this.state.teachers}
                  checkAvailability={(session)=>{this.context.getAvailableRooms(this.state.selectedSubject.semester,
                                                                                session.day, 
                                                                                this.getTimeBlocksOfSession(session), 
                                                                                this.setRooms);
                                                this.context.getAvailableTeachers(this.state.selectedSubject.semester,
                                                                                session.day, 
                                                                                this.getTimeBlocksOfSession(session), 
                                                                                this.setTeachers);}}>
                  </SessionForm>:
                  ""
                }

              </MenuBody>
            </LateralMenu>     
          </SpaceBetweenMenu>
          <Footer></Footer>
        </div>
        <Modal width="60%" onClose={this.showModal} show={this.state.showModal}>
          {
            this.state.showError? this.state.error: 
            this.chooseCreateForm(this.state.modalForm, this.state.selectedSubject, this.state.selectedGroup)
          }
        </Modal>
      </MyLoader>
    );
  };
  
}
