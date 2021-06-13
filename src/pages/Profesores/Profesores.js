import React from 'react';
import Modal from '../../components/Modal';
import { Button, CentralMenu, MyLoader, PageHeader, SpaceBetweenMenu } from '../PagesElements';

import {RepositoryContext} from '../../context/RepositoryContext';
import { FormBody, FormElementGroup, FormGroup, FullBody, Header, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';


function listTeachers(teachers, deleteTeacher, deleteCallback){
  return teachers.map(teacher=>  
    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
      <Button onClick={e=>{e.preventDefault()}}>{teacher.teacherName}</Button>
      {teacher.checkConcurrency==false? <Button background="#969696" disabled={true}>concurrent</Button>: ""}
      <Button background="#a83535" onClick={e=>{e.preventDefault();deleteTeacher(teacher, deleteCallback)}}>Delete</Button>
    </div>
    );
}


export default class Profesores extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.state={
      show: false,
      newTeacher: {},
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
      newTeacher: {}
    });
  }

  deleteTeacher(teacher){
    this.context.deleteTeacher(teacher, this.getTeachers);
  }

  showModal(){
    this.setState({
      show: !this.state.show
    });
    console.log(this.state.show);
  }

  render(){
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
        <PageHeader>
        </PageHeader>
        <SpaceBetweenMenu>

            <FullBody>
              <FormGroup>
                <Header>
                  <h2>Profesores</h2>
                </Header>
                <FormBody height="70vh" width="30vw" overflowy= "auto" style={{"border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                  {listTeachers(this.state.teachers, this.deleteTeacher, this.getTeachers)}

                  <Button onClick={e=>{e.preventDefault(); this.showModal()}}><b>+</b></Button>
                </FormBody>
              </FormGroup>
            </FullBody>
        </SpaceBetweenMenu>
        <Modal onClose={this.showModal} show={this.state.show}>

          <h2>Create teacher</h2>
          <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="teacherName" value={this.state.newTeacher.teacherName} onChange= {event => {this.OnChangeTeacherValue(event.target.value, "teacherName")}}/>
          
          <FormElementGroup style={{flexDirection: "row"}}>
          <StyledInput margin= "0.5vh 0.5vw 0 0"  type="checkbox" checked={this.state.checkConcurrency} value={this.state.checkConcurrency} onChange={event => {this.onChangeConcurrency()}}/>
          <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
                <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    Check concurrency
                </p> 
          </StyledLabel>
          </FormElementGroup>

          <Button onClick={e=>{this.createTeacher(this.state.newTeacher);}}>Create</Button>
        </Modal>
      </div>
      </MyLoader>
    );
  }
}