import { Dispatch } from "redux";
import { connect } from "react-redux";

import ProjectView from "./project-view";

import { APP_STATE } from "src/redux-impl/store";

const mapStateToProps = (state: APP_STATE) => {
  const project = state.currentPage.selectedProject;
  return {
    title: project.title,
    infoText: project.infoText,
    dirName: project.dirName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
