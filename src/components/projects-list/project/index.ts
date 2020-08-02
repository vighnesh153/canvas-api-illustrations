import { Dispatch } from "redux";
import { connect } from "react-redux";

import Project from "./project";

import { SelectedProject } from "src/redux-impl/current-page/reducer";
import { visitSpecificProject } from "src/redux-impl/current-page/actions";
import { APP_STATE } from "src/redux-impl/store";

function mapStateToProps(state: APP_STATE) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setCurrentProject: (p: SelectedProject) =>
      dispatch(visitSpecificProject(p)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
