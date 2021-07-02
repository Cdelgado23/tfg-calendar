import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Navbar from './index';
import { spanish } from '../../translations/Spanish';

import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


describe('<NavBar>', ()=>{
    var component;
    let mockHandler;
    var loggedUser;
    beforeEach(()=>{
        loggedUser= "test";
        mockHandler= jest.fn(); 
        
        component= render(
            <Router id="App">
                <Navbar loggedUser={loggedUser}>
                </Navbar>
        </Router>)
    });
    test('renders all buttons', ()=>{
        component.getAllByText(spanish.titles);
        component.getAllByText(spanish.subjects);
        component.getAllByText(spanish.classrooms);
        component.getAllByText(spanish.teachers);
        component.getAllByText(spanish.schedule);

    });  

    test('Select option from drowpdown', ()=>{
        var select = component.getByTestId("routeSelector");
        fireEvent.change(select, {
            target: {value: "Titulaciones"}
        });
    });
    test('Not logged User', ()=>{
        loggedUser=null;
        component= render(
            <Router id="App">
                <Navbar loggedUser={loggedUser}>

                </Navbar>
            </Router>)
    });
});
