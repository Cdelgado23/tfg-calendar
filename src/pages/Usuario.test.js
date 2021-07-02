import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Usuario from './Usuario'
import { spanish } from '../translations/Spanish';
import { BrowserRouter as Router} from 'react-router-dom';

describe('<Usuario>', ()=>{
    let mockHandler;
    let component;
    beforeAll(()=>{
        mockHandler= jest.fn(); 
    })

    beforeEach(()=>{
        mockHandler.mockClear();
    });

    test('Renders the screen without logged user', async ()=>{
        component = render(<Router><Usuario loggedUser={null} logOut={mockHandler}></Usuario></Router>);
    });

    test('Renders the screen with logged user', ()=>{
        component = render(
            <Usuario loggedUser="Test user" logOut={mockHandler}></Usuario>);
        fireEvent.click(component.getByText(spanish.logout));
        expect(mockHandler).toHaveBeenCalledTimes(1);

    });

});