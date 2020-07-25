import React from 'react';
import './App.scss';

import NavBar from './components/nav-bar';
import ProjectsList from './components/projects-list';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ProjectsList />
    </div>
  );
}

export default App;
