import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import Horario from './Horario'
import { spanish } from '../../translations/Spanish';
import Repository from '../../repository/Repository';
import {RepositoryContext} from '../../context/RepositoryContext';

describe('<Asignaturas>', ()=>{
    let mockHandler;
    let component;
    var repository;
    var session;
    var subjects;
    beforeAll(()=>{
        repository = new Repository(()=>{}, ()=>{return true}, "test");
        mockHandler= jest.fn(); 

    
        repository.loadSessionsOfSubjectGroup(" ", " ", (sessions)=>{session=sessions[0]});
        repository.getSubjects((_subjects)=>{subjects=_subjects});
        console.log(subjects);
    })

    beforeEach(()=>{
        mockHandler.mockClear();

        component= render(
            <RepositoryContext.Provider value= {repository}>
                <Horario msg="test msg">

                </Horario>
            </RepositoryContext.Provider>
        );
    });

    test('render', ()=>{
        fireEvent.change(component.getByTestId("titleSelector"), { target: { value: "{\"id\":\"string\",\"titleName\":\"Test Title\",\"semesters\":3}"} });
        component.getByText("test msg");
        component.debug();
    });

    test('drop a session', ()=>{
        fireEvent.drop(component.getByTestId("5-5"), {
            dataTransfer: {
                getData: ()=>{return JSON.stringify(session)}
            }            
          })
    });
    
    test('drop a group', ()=>{
        fireEvent.drop(component.getByTestId("5-5"), {
            dataTransfer: {
                getData: ()=>{return JSON.stringify(subjects[0].groups[0])}
            }            
          })
    });

});