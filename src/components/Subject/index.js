import React from 'react'
import {SubjectMain, SubjectTitle, SubjectGroupsList, GroupElement, AddGroupButton} from './SubjectElements';


function ListGroups(params) {
    return  params.map((group) =>
    <GroupElement group={group}>{group.name}</GroupElement>
  );
}


export default class Subject extends React.Component {

  constructor(props) {
    super(props);
    this.state = {subject: props.subject,
                  showGroups: false};

    this.handleSubjectTitleClick= this.handleSubjectTitleClick.bind(this);
  }

  handleSubjectTitleClick() {
    this.setState({
        showGroups: !this.state.showGroups
      });
  }

  render() {
    return (
        <SubjectMain>
        <SubjectTitle onClick={this.handleSubjectTitleClick} ButtonCornersRadius= {!this.state.showGroups} color = {this.state.subject.color}>
        {this.state.subject.name}
        </SubjectTitle>
        <SubjectGroupsList show={this.state.showGroups}>
            {ListGroups(this.state.subject.groups)}
        <AddGroupButton>
          +
        </AddGroupButton>
        </SubjectGroupsList>
      </SubjectMain>
    )
  }
}