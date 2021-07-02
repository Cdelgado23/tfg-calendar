import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Subject from './index'


describe('<Subject>', ()=>{
    var component;
    var show = true;
    let testContent;
    let mockHandler; 
    let subject= {"id":"string","subjectName":"Test Subject","color":"string","groups":[{"groupName":"Test Group","subjectName":"string","color":"string","type":"string","defaultSessionValues":{"color":"string","length":0,"room":{"name":"string"},"teacher":{"name":"string"}}}],"titles":[{"semester":0,"titleName":"string"}]};

    beforeAll(()=>{
    })

    beforeEach(()=>{
        testContent= <div>This is a test</div>;
        show = true;
        mockHandler= jest.fn(); 
        component = render(<Subject subject={subject}></Subject>)
    });


    test('renders the component', ()=>{
        component.getByText("Test Subject");
    });  
    test('click the button', ()=>{
        var button= component.getByText("Test Subject");
        fireEvent.click(button);
        component.getByText("Test Group");
        
    });  
});