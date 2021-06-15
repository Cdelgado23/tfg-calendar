import React from 'react';
import { Button } from './PagesElements';
import { Redirect } from "react-router-dom";

const Usuario = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <Button style={{padding: "3vh 3vw", cursor: "pointer"}} onClick={()=>{props.logOut()}}>Log out</Button>
      {props.loggedUser?"":
        <Redirect to="/Login" />
      }
    </div>
  );
};

export default Usuario;