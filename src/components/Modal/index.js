import React from "react";
import { Button } from "../../pages/PagesElements";
import { ModalBase, ModalContent } from "./ModalElements";



export default class Modal extends React.Component {
  render() {
      if(!this.props.show){
          return null;
      }
      return (
        <ModalBase>
            <ModalContent>
            <div>
                <Button
                onClick={this.props.onClose}
                >
                <b>X</b>
                </Button>
            </div>
            <div>{this.props.children}</div>
            </ModalContent>
        </ModalBase>
      );
  }
}
  