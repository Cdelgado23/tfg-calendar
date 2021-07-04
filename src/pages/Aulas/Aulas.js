import React from 'react';
import Modal from '../../components/Modal';
import { Button, MyLoader, PageHeader, SpaceBetweenMenu } from '../PagesElements';

import {RepositoryContext} from '../../context/RepositoryContext';
import { FormBody, FormElementGroup, FormGroup, FullBody, Header, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import {spanish} from '../../translations/Spanish'

import {ResourceList} from '../../components/Resources/ResourceElements.js'
import {roomToResource, Resource} from '../../components/Resources/Resource.js'


function listRooms(rooms, deleteRoom){
  return rooms.map(room=>  
    <Resource resource= {roomToResource(room, ()=>{deleteRoom(room);})}></Resource>
    );
}

function roomIsValid(room){
  return room.roomName.length>3;
}

function createRoomForm(newRoom, onChangeRoomValue, checkConcurrency, onChangeConcurrency, createRoom){
  return(
    <React.Fragment>
      <h2>{spanish.createRoom}</h2>
      <FormElementGroup>
        <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
          {spanish.name} 
        </StyledLabel>
        <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="roomName" value={newRoom.roomName} onChange= {event => {onChangeRoomValue(event.target.value, "roomName")}}/>
      </FormElementGroup>


      <FormElementGroup style={{flexDirection: "row"}}>
      <StyledInput margin= "0.5vh 0.5vw 0 0"  type="checkbox" checked={checkConcurrency} value={checkConcurrency} onChange={event => {onChangeConcurrency()}}/>
      <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
            <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                {spanish.checkConcurrency}
            </p> 
      </StyledLabel>
      </FormElementGroup>

      <Button disabled={!roomIsValid(newRoom)} onClick={e=>{createRoom(newRoom);}}>{spanish.create}</Button>
    </React.Fragment>
  );
}

export default class Aulas extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.state={
      show: false,
      newRoom:{roomName: ""},
      rooms: [],
      checkConcurrency: true
    };

    this.setLoading = this.setLoading.bind(this);
    this.showModal = this.showModal.bind(this);
    this.OnChangeRoomValue = this.OnChangeRoomValue.bind(this);
    this.getRooms= this.getRooms.bind(this);
    this.createRoom= this.createRoom.bind(this);

    this.deleteRoom= this.deleteRoom.bind(this);
    this.onChangeConcurrency= this.onChangeConcurrency.bind(this);
  }

  setLoading(_loading){
    this.setState({loading: _loading});
  }

  componentDidMount(){
    this.context.setLoadingCallback(this.setLoading);
    this.getRooms();
  }

  OnChangeRoomValue(newValue, field){
    var room = this.state.newRoom;
    room[field]= newValue;
    this.setState({
      newRoom: room
    });
  }
  onChangeConcurrency(){
    this.setState(preState=>({
      checkConcurrency: !preState.checkConcurrency
        }));
  }

  getRooms(){
    this.context.getRooms((rooms)=>{
      this.setState({rooms: rooms})
    });
  }
  createRoom(room){
    room["checkConcurrency"]= this.state.checkConcurrency;
    this.context.createRoom(room, this.getRooms);
    this.setState({
      checkConcurrency: true
    });
  }

  deleteRoom(room){
    this.context.deleteRoom(room, this.getRooms);
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
        
        <FullBody justify="center">
          <FormGroup>
            <Header>
              <h2>{spanish.classrooms}</h2>
            </Header>
            <ResourceList height="70vh" width="60vw" overflowy= "auto">
              {listRooms(this.state.rooms, this.deleteRoom, this.getRooms)}

              <Button onClick={e=>{e.preventDefault(); this.showModal()}}><b>+</b></Button>
            </ResourceList>
          </FormGroup>
        </FullBody>

        <Modal onClose={this.showModal} show={this.state.show}>
          {createRoomForm(this.state.newRoom, this.OnChangeRoomValue, this.state.checkConcurrency, this.onChangeConcurrency, this.createRoom)}
        </Modal>
      </div>
      </MyLoader>
    );
  }
}