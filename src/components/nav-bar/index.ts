import { Dispatch } from "redux";
import { connect } from "react-redux";

import NavBar from "./nav-bar";

import { APP_STATE } from "src/redux-impl/store";
import { visitAllProjects } from "src/redux-impl/actions";

function mapStateToProps(state: APP_STATE) {
  return {
    isHomeScreen: state.currentPage.isHomeScreen,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    goToAllProjectsPage: () => dispatch(visitAllProjects()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
