import React from 'react';
import './App.css';

import { useHistory } from "react-router-dom";

import AppWrapper from './AppWrapper';

function App() {
  let history = useHistory();
  
  return (
    <AppWrapper hist={history}></AppWrapper>
  );
}

export default App;