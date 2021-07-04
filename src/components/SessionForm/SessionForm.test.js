import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import SessionForm from './index'
import Repository from '../../repository/Repository';
import { spanish } from '../../translations/Spanish';


describe('<SessionForm>', ()=>{
    var component;
    var show = true;
    let testContent;
    let availabilityMockHandler;
    let updateMockHandler; 
    var repository;

    let session = {"id":"string","startTime":"string","length":0,"color":"string","subject":"string","group":"string","room":{"name":"string","checkConcurrency": true},"teacher":{"name":"string","checkConcurrency": true},"day":0,"type":"string"};
    let teachers= [{"id":"string","teacherName":"string","checkConcurrency":true}];
    let rooms= [{"id":"string","roomName":"string","checkConcurrency":true}];

    beforeAll(()=>{
        availabilityMockHandler= jest.fn(); 
        updateMockHandler= jest.fn(); 

    });
    beforeEach(()=>{
        updateMockHandler.mockClear();
        availabilityMockHandler.mockClear();

        component= render(<SessionForm
            key ={session && session.id? session.id:"-"} 
            id ={session && session.id? session.id:null} 
            selectedSession={session}
            updateSession = {updateMockHandler}
            rooms={rooms}
            teachers={teachers}
            checkAvailability={availabilityMockHandler}
        ></SessionForm>)
    });

    test('Form is rendered', ()=>{
        component.getByText(spanish.subject);
        component.getByText(spanish.group);
        component.getByText(spanish.day);
        component.getByText(spanish.startTime);
        component.getByText(spanish.length);
        component.getByText(spanish.classRoom);
        component.getByText(spanish.teacher);

        expect(availabilityMockHandler).toHaveBeenCalledTimes(1);

    });
    test('Select option from drowpdown', ()=>{
        fireEvent.change(component.getByTestId("roomSelector"), {
            target: {value: JSON.stringify({"id":"string","roomName":"string","checkConcurrency":true})}
        });

        fireEvent.change(component.getByTestId("teacherSelector"), {
            target: {value: JSON.stringify({"id":"string","teacherName":"string","checkConcurrency":true})}
        });

        expect(availabilityMockHandler).toHaveBeenCalledTimes(1);
    });
    test('input startTime', ()=>{
        var input = component.getByTestId("startTimeInput");
        fireEvent.change(input, { target: { value: "10:00" } })
        fireEvent.click(component.getByText(spanish.update));
        expect(availabilityMockHandler).toHaveBeenCalledTimes(2);
        expect(updateMockHandler).toHaveBeenCalledTimes(1);
    });

    test('input data', ()=>{
        fireEvent.change(component.getByTestId("sessionSubjectInput"), { target: { value: "smthing" } })
        fireEvent.change(component.getByTestId("sessionGroupInput"), { target: { value: "smthing" } })

        fireEvent.change(component.getByTestId("lengthInput"), { target: { value: 50 } })
        fireEvent.change(component.getByTestId("colorInput"), { target: { value: "#FFFFFF" } })
        fireEvent.change(component.getByTestId("startTimeInput"), { target: { value: "10:00" } })

        fireEvent.change(component.getByTestId("sessionDayInput"), { target: { value: 1 } })
    });

    test('empty session', ()=>{
        component= render(<SessionForm
            key ={session && session.id? session.id:"-"} 
            id ={session && session.id? session.id:null} 
            selectedSession={{}}
            updateSession = {updateMockHandler}
            rooms={rooms}
            teachers={teachers}
            checkAvailability={availabilityMockHandler}
        ></SessionForm>)
        expect(component.container).toBeEmptyDOMElement();
    });


});


