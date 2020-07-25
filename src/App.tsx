import React from 'react';
import './App.scss';

import NavBar from './components/nav-bar';
import ProjectsList from './components/projects-list';
import ProjectView from './components/project-view';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/*<ProjectsList />*/}
      <ProjectView title={'Dummy Title'} infoText={'I am an info-text component'} />
    </div>
  );
}

export default App;
