import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Timetable from './index'


describe('<Timetable>', ()=>{
    var component;
    var show = true;
    let testContent;
    let mockHandler; 
    let sessions=[{"id":"asdasc-123124jp-asdadipkw","startTime":"09:30","length":60,"color":"#EFEFEF","subject":"Subject X","group":"Group N","room":{"name":"Big Room"},"teacher":{"name":"Teacher X"},"day":2},{"id":"asdasc-asdasdacaasdadipkw","startTime":"11:30","length":60,"color":"#EFEFEF","subject":"Subject X","group":"Group N","room":{"name":"Big Room"},"teacher":{"name":"Teacher X"},"day":2}];
    let group={"groupName":"Test Group","subjectName":"string","color":"string","type":"group","defaultSessionValues":{"color":"string","length":50,"room":{"name":"string"},"teacher":{"name":"string"}}};

    beforeAll(()=>{
    })

    beforeEach(()=>{
        testContent= <div>This is a test</div>;
        show = true;
        mockHandler= jest.fn(); 
        component = render(
            <Timetable timeStart={480} scheduleSize={780} mins_x_block={15} 
                sessions= {sessions} setSessions= {mockHandler} 
                handleSessionClick={mockHandler}
                updateSession={mockHandler}
                createSession = {mockHandler}>
            </Timetable>)
    });


    test('Renders the subjects', ()=>{

        component.getByTestId("asdasc-123124jp-asdadipkw");

        fireEvent.drop(component.getByTestId("5-5"), {
            dataTransfer: {
                getData: ()=>{return JSON.stringify(sessions[0])}
            }            
          })
        
        fireEvent.drop(component.getByTestId("5-5"), {
            dataTransfer: {
                getData: ()=>{return JSON.stringify(group)}
            }            
        })
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

});