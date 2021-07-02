import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import Horario from './Horario'
import { spanish } from '../../translations/Spanish';
import { BrowserRouter as Router} from 'react-router-dom';
import Repository from '../../repository/Repository';
import {RepositoryContext} from '../../context/RepositoryContext';

describe('<Asignaturas>', ()=>{
    let mockHandler;
    let component;
    var repository;
    beforeAll(()=>{
        repository = new Repository(()=>{}, ()=>{return true}, "test");
        mockHandler= jest.fn(); 
    })

    beforeEach(()=>{
        mockHandler.mockClear();

        component= render(
            <RepositoryContext.Provider value= {repository}>
                <Horario>

                </Horario>
            </RepositoryContext.Provider>
        );
    });

    test('render', ()=>{
        var session;
        repository.loadSessionsOfTeacher("", (sessions)=>{session=sessions[0]});

        fireEvent.change(component.getByTestId("titleSelector"), { target: { value: "{\"id\":\"string\",\"titleName\":\"Test Title\",\"semesters\":3}"} });
        
        fireEvent.drop(component.getByTestId("5-5"), {
            dataTransfer: {
                getData: ()=>{return JSON.stringify(session)}
            }            
          })

        component.debug();
    });

});