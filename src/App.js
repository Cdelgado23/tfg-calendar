import React from 'react';
import './App.css';

import { useHistory } from "react-router-dom";

import AppWrapper from './AppWrapper';

function App() {
  let history = useHistory();
  let env =  process.env.REACT_APP_ENVIROMENT.trimEnd();
  return (
    <AppWrapper hist={history} env={env}></AppWrapper>
  );
}

export default App;