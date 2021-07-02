import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Asignaturas from './Asignaturas'
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
                <Asignaturas>

                </Asignaturas>
            </RepositoryContext.Provider>
        );
    });

    test('create subject test', ()=>{
        component.findByText("Test Subject");
        fireEvent.click(component.getByText("+"));
        component.findByText(spanish.createSubject);
        fireEvent.change(component.getByTestId("nameInput"), { target: { value: "Not real change" } });
        fireEvent.change(component.getByTestId("colorInput"), { target: { value: "Not real change" } });
    });

    test('update Subject', ()=>{
        var button= component.getByText("Test Subject");
        fireEvent.click(button);
        
        fireEvent.change(component.getByTestId("subjectInput"), { target: { value: "Not real change" } });
        fireEvent.click(component.getByText("Test Group"));
        fireEvent.change(component.getByTestId("colorInput"), { target: { value: "#FFFFFF" } });
        fireEvent.change(component.getByTestId("semesterSelector"), { target: { value: 1 } });
        fireEvent.click(component.getByTestId("addGroupButton"));
        fireEvent.change(component.getByTestId("semesterSelector"), { target: { value: 2 } });

        fireEvent.click(component.getByTestId("deleteSubject"));

        fireEvent.click(button);
        fireEvent.click(component.getByTestId("updateSubject"));

        fireEvent.click(button);
        fireEvent.click(component.getByText(spanish.RelatedTitles));
        fireEvent.click(component.getByTestId("checkbox-Test Title"));
    });

    test('update group', ()=>{
        fireEvent.click(component.getByText("Test Subject"));
        fireEvent.click(component.getByText("Test Group"));

        component.getByTestId("subjectInput");
        fireEvent.change(component.getByTestId("groupColorInput"), { target: { value: "#FFFFFF" } });
        fireEvent.change(component.getByTestId("groupSubjectInput"), { target: { value: "Not real change" } });
        fireEvent.change(component.getByTestId("defaultGroupColorInput"), { target: { value: "#FFFFFF" } });
        fireEvent.click(component.getByTestId("groupUpdate"));

        fireEvent.click(component.getByTestId("session-asdasc-123124jp-asdadipkw"));
        fireEvent.click(component.getByTestId("deleteSession-asdasc-123124jp-asdadipkw"));

        fireEvent.click(component.getByText("Test Subject"));
        fireEvent.click(component.getByText("Test Group"));
        fireEvent.click(component.getByTestId("groupDelete"));

    });
});