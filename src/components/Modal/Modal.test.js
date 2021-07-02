import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Modal from './index'


describe('<Modal>', ()=>{
    var component;
    var show = true;
    let testContent;
    let mockHandler; 
    beforeEach(()=>{
        testContent= <div>This is a test</div>;
        show = true;
        mockHandler= jest.fn(); 
    });

    test('renders its children', ()=>{
        component= render(<Modal show={show} onClose={mockHandler}>{testContent}</Modal>)
        component.debug();
        component.getByText('This is a test');
    });  
    
    test('do not render content', ()=>{
        component= render(<Modal show={false}>{" "}</Modal>)
        expect(component.container).toBeEmptyDOMElement();
    });  

    test('click close button', ()=>{
        component= render(<Modal show={show} width= "10vw" onClose={mockHandler}>{testContent}</Modal>)
        const button = component.getByText("X");
        fireEvent.click(button);
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });  
    
});



