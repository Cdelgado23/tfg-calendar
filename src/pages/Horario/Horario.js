import React from 'react';
import { LateralMenu, MenuHeader, MenuBody, SpaceBetweenMenu, CentralMenu, Footer, PageHeader} from '../PagesElements';
import Timetable from '../../components/Timetable'
import Subject from '../../components/Subject'
import SessionForm from '../../components/SessionForm';

import {RepositoryContext} from '../../context/RepositoryContext';

import {MyLoader} from '../PagesElements.js';
import { EmptySpace, Header } from '../../components/SubjectForm/SubjectFormElements';



const rooms=["Sala 1", "Sala Grande", "Salón de actos"];

function getRooms(session){
  return rooms; 
}



function ListSubjects(params) {
  return  params.map((subject) =>
  <Subject subject={subject}></Subject>
);
}

function TitlesDropdown(titles, onChange){
  return(  
  <React.Fragment>

    <select name="titles" id="titles" onChange={(e)=>{onChange(e.target.value);}}>
      <option value={null}>Select a title</option>
      {
          titles.map((title) =>
          <option value={JSON.stringify(title)}>{title.titleName}</option>
          )
      }
    </select>
  </React.Fragment>
  );

}


function SemesterDropdown(semesters, onChange){
  return(  
  <React.Fragment>

    <select name="semesters" id="semesters" onChange={(e)=>{onChange(e.target.value);}}>
      <option value="0">Select a semester</option>
      {
          Array.from(new Array(semesters), (x, i) => i + 1).map((sem) =>
          <option value={sem}>{sem}</option>
          )
      }
    </select>
  </React.Fragment>
  );

}

export default class Horario extends React.Component {
  static contextType = RepositoryContext;

  constructor(props) {
    super(props);
    this.handleSessionClick = this.handleSessionClick.bind(this);
    this.state={
      loading: false,
      sessions: [],
      subjects: [],
      titles:[]
    
    };

    this.setLoading = this.setLoading.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.updateSession = this.updateSession.bind(this);
    this.createSession = this.createSession.bind(this);

    this.setSubjects = this.setSubjects.bind(this);

    this.setTitles = this.setTitles.bind(this);
    this.selectTitle = this.selectTitle.bind(this);
    this.selectSemester = this.selectSemester.bind(this);

    this.getRooms = this.getRooms.bind(this);
  }
  
  handleSessionClick(clickedSession){
    this.setState({ 
      selectedSession: clickedSession});
      console.log(clickedSession);
  }
  
  setLoading(_loading){
    this.setState({loading: _loading});
  }
  setSessions(_sessions){
    this.setState({sessions: _sessions});
  }
  updateSession(session){
    this.context.updateSession(session, ()=> {
      this.context.loadSessionsOfSubjects(this.state.subjects.map(s=> s.subjectName), this.setSessions);
    }
  );
  }
  createSession(session){
    this.context.createSession(session, ()=> {
        this.setState((prevState) =>(
          {sessions: [...prevState.sessions, session]}
        ));
      }
    );
  }

  setSubjects(_subjects){
    this.setState({subjects: _subjects});

    var subjectNames= _subjects.map((subject)=> subject.subjectName);
    
    if (_subjects.length>0){
      this.context.loadSessionsOfSubjects(subjectNames, this.setSessions);
    }
    
  }

  setTitles(_titles){
    this.setState({titles: _titles});
  }
  selectTitle(_title){
    try {
      console.log("title " + _title)
      var parsed = JSON.parse(_title);

      this.setState(
        {selectedTitle: parsed,
          selectedSemester: 0,
          subjects: [],
          sessions: [],
          selectedSession:{}
        });
  
      var search= {titleName: parsed.titleName, semester: 0};
  
      this.context.loadSubjectsOfTitle(search, this.setSubjects);
    } catch(e) {
      this.setState(
        {selectedTitle: null,
          selectedSemester: 0,
          subjects: [],
          sessions: [],
          selectedSession:{}
        });
    }
  }

  selectSemester(semester){
    this.setState(
      {
        selectedSemester: semester,
        subjects: [],
        sessions: [],
        selectedSession:{}
      });

      var search= {titleName: this.state.selectedTitle.titleName, semester: parseInt(semester)};
      console.log(search);
      this.context.loadSubjectsOfTitle(search, this.setSubjects);
  }


  getRooms(){
    this.context.getRooms((rooms)=>{
      this.setState({
        rooms: rooms
      });
    })
  }

  componentDidMount() {
    this.context.setLoadingCallback(this.setLoading);

    this.context.loadTitles(this.setTitles);

  }

  render() {
    return (
      <MyLoader
      active={this.state.loading}
      spinner
      text='Loading your content...'
      >
      <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      >
        <PageHeader>
          {TitlesDropdown(this.state.titles, this.selectTitle)}
          {this.state.selectedTitle? SemesterDropdown(this.state.selectedTitle.semesters, this.selectSemester): ""}
        </PageHeader>
          <SpaceBetweenMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Asignaturas</h2>
              </MenuHeader>
              <MenuBody>
                {ListSubjects(this.state.subjects)}
              </MenuBody>
            </LateralMenu>
            <CentralMenu>
              <Timetable timeStart={480} scheduleSize={780} mins_x_block={15} 
                          sessions= {this.state.sessions} setSessions= {this.setSessions} 
                          handleSessionClick={this.handleSessionClick}
                          updateSession={this.updateSession}
                          createSession = {this.createSession}>
              </Timetable>
            </CentralMenu>
            <LateralMenu>
              <MenuHeader>
                <h2>Sesión</h2>
              </MenuHeader>
              <MenuBody>
                <SessionForm getAvalibleRooms = {getRooms} 
                              key ={this.state.selectedSession? this.state.selectedSession.id:"-"} 
                              id ={this.state.selectedSession? this.state.selectedSession.id:null} 
                              selectedSession={this.state.selectedSession}
                              updateSession = {this.updateSession}>
                </SessionForm>
              </MenuBody>
            </LateralMenu>     
          </SpaceBetweenMenu>
          <Footer></Footer>
        </div>
      </MyLoader>
    );
  };
  
}
