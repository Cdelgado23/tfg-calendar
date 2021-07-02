import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import SubjectForm from './index'
import { spanish } from '../../translations/Spanish';


describe('<SubjectForm>', ()=>{
    var component;
    var show = true;
    let testContent;
    let availabilityMockHandler;
    let updateMockHandler; 
    let subject= {"id":"string","subjectName":"Test Subject","color":"string","groups":[{"groupName":"Test Group","subjectName":"string","color":"string","type":"string","defaultSessionValues":{"color":"string","length":0,"room":{"name":"string"},"teacher":{"name":"string"}}}],"titles":[{"semester":1,"titleName":"Test Title"}]};
    let group={"groupName":"Test Group","subjectName":"string","color":"string","type":"string","defaultSessionValues":{"color":"string","length":50,"room":{"name":"string"},"teacher":{"name":"string"}}};
    let sessions=[{"id":"asdasc-123124jp-asdadipkw","startTime":"09:30","length":60,"color":"#EFEFEF","subject":"Subject X","group":"Group N","room":{"name":"Big Room"},"teacher":{"name":"Teacher X"},"day":2},{"id":"asdasc-asdasdacaasdadipkw","startTime":"11:30","length":60,"color":"#EFEFEF","subject":"Subject X","group":"Group N","room":{"name":"Big Room"},"teacher":{"name":"Teacher X"},"day":2}];
    let titles= [{"id":"string","titleName":"Test Title","semesters":3}]
    let selectedGroup;
    let selectedSessions;
    
    beforeAll(()=>{
        updateMockHandler= jest.fn(); 
        availabilityMockHandler = jest.fn();
    })

    beforeEach(()=>{
        updateMockHandler.mockClear();
        availabilityMockHandler.mockClear();
    });
    test('Stage 0: not selected subject', ()=>{
        component= render(<SubjectForm 
            showModal = {updateMockHandler}
            newSubject={{}}
            selectedGroup={selectedGroup}
            sessions={selectedSessions}
            onSelectGroup={updateMockHandler} 
            onSelectSession={updateMockHandler}
            onChangeField={updateMockHandler}
            onChangeCheckBox={updateMockHandler}
            updateSubject={updateMockHandler}
            titles= {titles}
            onSelectTitle={updateMockHandler}
            onDeleteSession={updateMockHandler}
            onDeleteGroup = {updateMockHandler}
            deleteSubject= {updateMockHandler}
            checkAvailability={availabilityMockHandler}
            >
    
          </SubjectForm>);
        expect(screen.queryByTestId("titleModalContent")).not.toBeInTheDocument();
    });

    test('Stage 1: SelectedSubject', ()=>{
        component= render(<SubjectForm 
            showModal = {updateMockHandler}
            selectedSubject={subject}
            newSubject={{}}
            selectedGroup={selectedGroup}
            sessions={selectedSessions}
            onSelectGroup={updateMockHandler} 
            onSelectSession={updateMockHandler}
            onChangeField={updateMockHandler}
            onChangeCheckBox={updateMockHandler}
            updateSubject={updateMockHandler}
            titles= {titles}
            onSelectTitle={updateMockHandler}
            onDeleteSession={updateMockHandler}
            onDeleteGroup = {updateMockHandler}
            deleteSubject= {updateMockHandler}
            checkAvailability={availabilityMockHandler}
            >
    
          </SubjectForm>);

        fireEvent.change(component.getByTestId("subjectInput"), { target: { value: "Not real change" } });
        fireEvent.click(component.getByText("Test Group"));
        fireEvent.change(component.getByTestId("colorInput"), { target: { value: "#FFFFFF" } });
        fireEvent.change(component.getByTestId("semesterSelector"), { target: { value: 1 } });
        fireEvent.click(component.getByText(spanish.update));
        fireEvent.click(component.getByText(spanish.delete));
        fireEvent.click(component.getByTestId("addGroupButton"));

        expect(updateMockHandler).toHaveBeenCalledTimes(8);

        fireEvent.click(component.getByText(spanish.RelatedTitles));
    });  
    test('Stage 1.1: Show Titles', ()=>{
        component= render(<SubjectForm 
            showModal = {updateMockHandler}
            selectedSubject={subject}
            newSubject={{}}
            selectedGroup={selectedGroup}
            sessions={selectedSessions}
            onSelectGroup={updateMockHandler} 
            onSelectSession={updateMockHandler}
            onChangeField={updateMockHandler}
            onChangeCheckBox={updateMockHandler}
            updateSubject={updateMockHandler}
            titles= {titles}
            onSelectTitle={updateMockHandler}
            onDeleteSession={updateMockHandler}
            onDeleteGroup = {updateMockHandler}
            deleteSubject= {updateMockHandler}
            checkAvailability={availabilityMockHandler}
            showTitles={true}
            >
    
          </SubjectForm>);

          component.getByText("Test Title");
          fireEvent.click(component.getByTestId("checkbox-Test Title"));
          fireEvent.change(component.getByTestId("semesterSelector-Test Title"), { target: { value: 1 } });

    });  


    test('Stage 2: Selected group', ()=>{
        component= render(<SubjectForm 
            showModal = {updateMockHandler}
            selectedSubject={subject}
            newSubject={{}}
            selectedGroup={group}
            sessions={sessions}
            onSelectGroup={updateMockHandler} 
            onSelectSession={updateMockHandler}
            onChangeField={updateMockHandler}
            onChangeCheckBox={updateMockHandler}
            updateSubject={updateMockHandler}
            titles= {titles}
            onSelectTitle={updateMockHandler}
            onDeleteSession={updateMockHandler}
            onDeleteGroup = {updateMockHandler}
            deleteSubject= {updateMockHandler}
            checkAvailability={availabilityMockHandler}
            >
    
          </SubjectForm>);

        component.getByTestId("subjectInput");
        fireEvent.change(component.getByTestId("groupColorInput"), { target: { value: "#FFFFFF" } });
        fireEvent.change(component.getByTestId("groupSubjectInput"), { target: { value: "Not real change" } });
        fireEvent.change(component.getByTestId("defaultGroupColorInput"), { target: { value: "#FFFFFF" } });
        fireEvent.click(component.getByTestId("groupUpdate"));
        fireEvent.click(component.getByTestId("groupDelete"));

        fireEvent.click(component.getByTestId("session-asdasc-123124jp-asdadipkw"));
        fireEvent.click(component.getByTestId("deleteSession-asdasc-123124jp-asdadipkw"));

    });  
});