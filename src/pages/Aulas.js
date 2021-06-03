import React from 'react';
import Modal from '../components/Modal';
import { ColorButton, FormBody, FormElementGroup, StyledInput, StyledLabel } from '../components/SubjectForm/SubjectFormElements';
import { Button } from './PagesElements';




export default class Aulas extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      show: false
    };
    this.showModal = this.showModal.bind(this);
  }


  showModal(){
    this.setState({
      show: !this.state.show
    });
    console.log(this.state.show);
  }

  render(props){
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <h1>Aulas</h1>
  
        <Button onClick={e => {
                this.showModal();
           }}>
          show Modal
        </Button>
        <Modal onClose={this.showModal} show={this.state.show}>


        </Modal>
      </div>
    );
  }
}