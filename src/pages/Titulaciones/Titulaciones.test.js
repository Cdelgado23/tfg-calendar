import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import Titulaciones from './Titulaciones'
import { spanish } from '../../translations/Spanish';
import { BrowserRouter as Router} from 'react-router-dom';
import Repository from '../../repository/Repository';
import {RepositoryContext} from '../../context/RepositoryContext';

describe('<Asignaturas>', ()=>{
    let mockHandler;
    let component;
    beforeAll(()=>{
        mockHandler= jest.fn(); 
    })

    beforeEach(()=>{
        mockHandler.mockClear();

        component= render(
            <RepositoryContext.Provider value= {new Repository(()=>{}, ()=>{return true}, "test")}>
                <Titulaciones>

                </Titulaciones>
            </RepositoryContext.Provider>
        );
    });

    test('render', ()=>{
        component.getByText(spanish.titles);
        component.getByText("Test Title");
        fireEvent.click(component.getByText(spanish.delete));
        fireEvent.click(component.getByText("+"));
    });

});