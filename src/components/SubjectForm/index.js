import React from 'react'

import {FullBody, Header, FormBody, EmptySpace, FormGroup} from './SubjectFormElements';


function SubjectFormGroup(){
    return (<FormGroup width="30vw">

                <Header>
                    <h2>SUBJECT</h2>
                </Header>
                <FormBody height="30vh">
                    
                </FormBody>
                <Header>
                    <h2>GROUPS</h2>
                </Header>
                <FormBody height="33.5vh">
                    BODY 2
                </FormBody>

            </FormGroup>);
}

function GroupFormGroup(){
    return (<FormGroup width="40vw" margin="0 0 0 1vw">

                <Header>
                    <h2>GROUP</h2>
                </Header>
                <FormBody height="30vh">
                    BODY
                </FormBody>
                <Header>
                    <h2>SESSIONS</h2>
                </Header>
                <FormBody height="33.5vh">
                    BODY 2
                </FormBody>

            </FormGroup>);
}




export default class SubjectForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <EmptySpace/>

                <FullBody>
                    {SubjectFormGroup()}
                    {GroupFormGroup()}
                </FullBody>
            </React.Fragment>
        )
    }

}