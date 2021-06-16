import React from 'react';

import {RepositoryContext} from '../../context/RepositoryContext';
import { StyledInput, StyledLabel } from '../../components/SubjectForm/SubjectFormElements';
import { Button, MyLoader } from '../PagesElements';

export default class Login extends React.Component {
    static contextType = RepositoryContext;
  
    constructor(props){
        super(props);
        this.setLoading = this.setLoading.bind(this);
        this.state={
          email: "",
          password: "",
          loading: false
        };
        this.setEmail= this.setEmail.bind(this);
        this.setPassword= this.setPassword.bind(this);
      }
      setLoading(loading){
        this.setState({loading: loading});
      }
    
    
      setEmail(email){
        this.setState({email: email});
      }
      setPassword(psw){
        this.setState({password: psw});
      }

    componentDidMount(){
        this.context.setLoadingCallback(this.setLoading);
    }

    render(){
        return (
            <MyLoader style={{heigth:"80vh"}}
            active={this.state.loading}
            spinner
            text='Loading your content...'
            >  
      
            
              <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
              }}
              >
               {
               this.props.loggedUser? "Welcome back!":
                <div style={{boxShadow: "10px", color: "white", border: "solid", borderColor: "#2DA283", display:"flex", flexDirection: "column", background: "#E7E9EB", alignItems: "center", justifyContent: 'center', width: "40vw", borderRadius: "4px"}}>
                  <h2 style={{color: "#2DA283"}}>Login now</h2>
                  <StyledLabel style={{color: "#2DA283"}}>Email</StyledLabel>
                  <StyledInput margin= "0 0.5vw 0 0.5vw"  type="text" name="email" 
                    value={this.state.email } onChange= {event => {this.setEmail(event.target.value)}}
                    style={{width: "80%", height: "3vh", borderRadius: "5px", borderWidth: "1px"} }/>
                  <StyledLabel style={{color: "#2DA283"}}>Password</StyledLabel>
                  <StyledInput margin= "0 0.5vw 0 0.5vw"  type="password" name="email" 
                    value={this.state.password} onChange= {event => {this.setPassword(event.target.value)}}
                    style={{width: "80%", height: "3vh", borderRadius: "5px", borderWidth: "1px"}}/>
          
                    <Button background={"#F5AB00"} onClick={e=>{this.context.auth(this.state.email, this.state.password, (d)=>{console.log(d)})}}>
                      Login
                    </Button>
                </div>
                }
              </div>
              </MyLoader>
          );
    }

}