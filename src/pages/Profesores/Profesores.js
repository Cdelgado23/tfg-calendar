import React from 'react';
import Modal from '../../components/Modal';
import { Button, MyLoader, PageHeader, SpaceBetweenMenu } from '../PagesElements';

import {RepositoryContext} from '../../context/RepositoryContext';
import { FormBody, FormElementGroup, FormGroup, FullBody, Header, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import { spanish } from '../../translations/Spanish';


function listTeachers(teachers, deleteTeacher, deleteCallback){
  return teachers.map(teacher=>  
    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
      <Button background="#e7e9eb" onClick={e=>{e.preventDefault()}} style={{width: "70%", color: "black"}}>{teacher.teacherName}</Button>
      {teacher.checkConcurrency===false? <Button background="#969696" disabled={true} style={{width: "20%", padding: "0"}}>{spanish.concurrent}</Button>: <div style={{width: "20%", padding: "0", margin: "0.5em"}}></div>}
      <Button background="#a83535" onClick={e=>{e.preventDefault();deleteTeacher(teacher, deleteCallback)}} style={{width: "10%"}}>{spanish.delete}</Button>
    </div>
    );
}

function teacherIsValid(teacher){
  return teacher.teacherName.length>5;
}

export default class Profesores extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.state={
      show: false,
      newTeacher: {teacherName: ""},
      teachers:[],
      checkConcurrency: true
    };

    this.setLoading = this.setLoading.bind(this);
    this.showModal = this.showModal.bind(this);
    this.OnChangeTeacherValue = this.OnChangeTeacherValue.bind(this);
    this.getTeachers= this.getTeachers.bind(this);
    this.createTeacher= this.createTeacher.bind(this);

    this.deleteTeacher= this.deleteTeacher.bind(this);
    this.onChangeConcurrency= this.onChangeConcurrency.bind(this);
  }

  setLoading(_loading){
    this.setState({loading: _loading});
  }

  componentDidMount(){
    this.context.setLoadingCallback(this.setLoading);
    this.getTeachers();
  }

  OnChangeTeacherValue(newValue, field){
    var teacher = this.state.newTeacher;
    teacher[field]= newValue;
    this.setState({
      newTeacher: teacher
    });
  }
  onChangeConcurrency(){
    this.setState(preState=>({
      checkConcurrency: !preState.checkConcurrency
        }));
  }

  getTeachers(){
    this.context.getTeachers((teachers)=>{
      this.setState({teachers: teachers})
    });
  }
  createTeacher(teacher){
    teacher["checkConcurrency"]= this.state.checkConcurrency;
    this.context.createTeacher(teacher, this.getTeachers);
    this.setState({
      checkConcurrency: true,
      newTeacher: {teacherName: ""}
    });
  }

  deleteTeacher(teacher){
    this.context.deleteTeacher(teacher, this.getTeachers);
  }

  showModal(){
    this.setState({
      show: !this.state.show
    });
  }

  render(){
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
        <PageHeader>
        </PageHeader>
        <SpaceBetweenMenu style={{marginLeft: "-5%"}}>

            <FullBody>
              <FormGroup>
                <Header>
                  <h2>{spanish.teachers}</h2>
                </Header>
                <FormBody height="70vh" width="60vw" overflowy= "auto" style={{"border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                  {listTeachers(this.state.teachers, this.deleteTeacher, this.getTeachers)}

                  <Button onClick={e=>{e.preventDefault(); this.showModal()}}><b>+</b></Button>
                </FormBody>
              </FormGroup>
            </FullBody>
        </SpaceBetweenMenu>
        <Modal onClose={this.showModal} show={this.state.show}>

          <h2>{spanish.createTeacher}</h2>

          <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
              {spanish.name} 
            </StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="teacherName" value={this.state.newTeacher.teacherName} onChange= {event => {this.OnChangeTeacherValue(event.target.value, "teacherName")}}/>
          </FormElementGroup>

          
          <FormElementGroup style={{flexDirection: "row"}}>
          <StyledInput margin= "0.5vh 0.5vw 0 0"  type="checkbox" checked={this.state.checkConcurrency} value={this.state.checkConcurrency} onChange={event => {this.onChangeConcurrency()}}/>
          <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
                <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    {spanish.checkConcurrency}
                </p> 
          </StyledLabel>
          </FormElementGroup>

          <Button disabled={!teacherIsValid(this.state.newTeacher)}onClick={e=>{this.createTeacher(this.state.newTeacher);}}>{spanish.create}</Button>
        </Modal>
      </div>
      </MyLoader>
    );
  }
}