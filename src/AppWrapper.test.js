import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import AppWrapper from './AppWrapper'
import { spanish } from './translations/Spanish';
import { BrowserRouter as Router} from 'react-router-dom';

describe('<AppWrapper>', ()=>{
    let mockHandler;
    let component;
    beforeAll(()=>{
        mockHandler= jest.fn(); 
    })

    beforeEach(()=>{
        mockHandler.mockClear();
    });

    test('render ',(()=>{
      component= render(<AppWrapper env="test">

      </AppWrapper>);
      
    }));

});