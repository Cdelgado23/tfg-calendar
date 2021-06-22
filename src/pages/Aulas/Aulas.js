import React from 'react';
import Modal from '../../components/Modal';
import { Button, MyLoader, PageHeader, SpaceBetweenMenu } from '../PagesElements';

import {RepositoryContext} from '../../context/RepositoryContext';
import { FormBody, FormElementGroup, FormGroup, FullBody, Header, StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import {spanish} from '../../translations/Spanish'


function listRooms(rooms, deleteRoom, deleteCallback){
  return rooms.map(room=>  
    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
      <Button background="#e7e9eb" onClick={e=>{e.preventDefault()}}style={{width: "70%", color: "black"}}>{room.roomName}</Button>
      {room.checkConcurrency===false? <Button background="#969696" disabled={true} style={{width: "20%", padding: "0"}}>{spanish.concurrent}</Button>: <div style={{width: "20%", padding: "0", margin: "0.5em"}}></div>}
      <Button background="#a83535" onClick={e=>{e.preventDefault();deleteRoom(room, )}} style={{width: "10%"}}>{spanish.delete}</Button>
    </div>
    );
}

function roomIsValid(room){
  return room.roomName.length>3;
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
    console.log(this.state.show);
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
                  <h2>{spanish.classrooms}</h2>
                </Header>
                <FormBody height="70vh" width="60vw" overflowy= "auto" style={{"border": "1px solid #EFEFEF","border-radius": "0 0 10px 10px"}}>
                  {listRooms(this.state.rooms, this.deleteRoom, this.getRooms)}

                  <Button onClick={e=>{e.preventDefault(); this.showModal()}}><b>+</b></Button>
                </FormBody>
              </FormGroup>
            </FullBody>
        </SpaceBetweenMenu>
        <Modal onClose={this.showModal} show={this.state.show}>

          <h2>{spanish.createRoom}</h2>
          <FormElementGroup>
            <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
              {spanish.name} 
            </StyledLabel>
            <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="roomName" value={this.state.newRoom.roomName} onChange= {event => {this.OnChangeRoomValue(event.target.value, "roomName")}}/>
          </FormElementGroup>


          <FormElementGroup style={{flexDirection: "row"}}>
          <StyledInput margin= "0.5vh 0.5vw 0 0"  type="checkbox" checked={this.state.checkConcurrency} value={this.state.checkConcurrency} onChange={event => {this.onChangeConcurrency()}}/>
          <StyledLabel margin= "0 0.5vw 0 0.5vw" style={{maxWidth: "90%"}}>
                <p style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    {spanish.checkConcurrency}
                </p> 
          </StyledLabel>
          </FormElementGroup>

          <Button disabled={!roomIsValid(this.state.newRoom)} onClick={e=>{this.createRoom(this.state.newRoom);}}>{spanish.create}</Button>
        </Modal>
      </div>
      </MyLoader>
    );
  }
}