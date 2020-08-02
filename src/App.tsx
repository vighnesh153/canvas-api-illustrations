import React from "react";
import { connect } from "react-redux";
import "./App.scss";

import { APP_STATE } from "src/redux-impl/store";

import NavBar from "./components/nav-bar";
import ProjectsList from "./components/projects-list";
import ProjectView from "./components/project-view";

type AppPropsType = {
  isHomeScreen: boolean;
};

function App(props: AppPropsType) {
  return (
    <div className="App">
      <NavBar />
      {props.isHomeScreen && <ProjectsList />}
      {!props.isHomeScreen && <ProjectView />}
    </div>
  );
}

const mapStateToProps = (state: APP_STATE) => {
  return {
    isHomeScreen: state.currentPage.isHomeScreen,
  };
};

export default connect(mapStateToProps)(App);
