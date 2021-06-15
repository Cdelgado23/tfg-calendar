import React from 'react';
import Modal from '../../components/Modal';
import { Button, CentralMenu, MyLoader, PageHeader, SpaceBetweenMenu } from '../PagesElements';

import {RepositoryContext} from '../../context/RepositoryContext';
import { FormBody, FormElementGroup, FormGroup, FullBody, Header, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';


function listTitles(titles, deleteTitle, deleteCallback){
  return titles.map(title=>
    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
      <Button onClick={e=>{e.preventDefault()}}>{title.titleName}</Button>
      <Button background="#969696" disabled={true}>Semesters: {title.semesters}</Button>
      <Button background="#a83535" onClick={e=>{e.preventDefault();deleteTitle(title, deleteCallback)}}>Delete</Button>
    </div>
    );
}

function titleIsValid(title){
  return title.titleName.length>3 && title.semesters >0 && title.semesters<9;
}

export default class Profesores extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.state={
      show: false,
      titles:[],
      newTitle:{titleName:"",semesters:0},
    };

    this.setLoading = this.setLoading.bind(this);
    this.showModal = this.showModal.bind(this);
    this.OnChangeTitleValue = this.OnChangeTitleValue.bind(this);

    this.getTitles= this.getTitles.bind(this);
    this.createTitle= this.createTitle.bind(this);
    this.deleteTitle= this.deleteTitle.bind(this);
  }
  getTitles(){
      this.context.loadTitles((titles)=>this.setState({titles:titles}));
  }
  setLoading(_loading){
    this.setState({loading: _loading});
  }

  componentDidMount(){
    this.context.setLoadingCallback(this.setLoading);
    this.getTitles();
  }
  OnChangeTitleValue(newValue, field){
      var title= this.state.newTitle;
      title[field]=newValue;
      this.setState({newTitle: title});
  }

  createTitle(title){
    this.context.createTitle(title, ()=>{this.getTitles(); this.showModal()});
  } 
  deleteTitle(title){
    this.context.deleteTitle(title, ()=>{this.getTitles()});
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
                  <h2>Titulaciones</h2>
                </Header>
                <FormBody height="70vh" width="70vw" overflowy= "auto" style={{"border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                  {listTitles(this.state.titles, this.deleteTitle, this.getTitles)}

                  <Button onClick={e=>{e.preventDefault(); this.showModal()}}><b>+</b></Button>
                </FormBody>
              </FormGroup>
            </FullBody>
        </SpaceBetweenMenu>
        <Modal onClose={this.showModal} show={this.state.show}>

          <h2>Create Title</h2>
          
          <FormElementGroup style={{}}>
          <StyledLabel margin= "1 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
            Title name
          </StyledLabel>
          <StyledInput   type="text" name="titleName" value={this.state.newTitle.titleName} onChange= {event => {this.OnChangeTitleValue(event.target.value, "titleName")}}/>
          
          <StyledLabel margin= "1 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
            Semesters
          </StyledLabel>
          <StyledInput  type="number" name="semesters" value={this.state.newTitle.semesters} onChange= {event => {this.OnChangeTitleValue(event.target.value, "semesters")}}>

          </StyledInput>
          </FormElementGroup>

          <Button disabled= {!titleIsValid(this.state.newTitle)} onClick={e=>{this.createTitle(this.state.newTitle);}}>Create</Button>
        </Modal>
      </div>
      </MyLoader>
    );
  }
}