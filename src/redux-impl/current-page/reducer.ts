import {
  VISIT_ALL_PROJECTS,
  VISIT_SPECIFIC_PROJECT,
} from "src/redux-impl/current-page/action-types";

export type SelectedProject = {
  dirName: string;
  title: string;
  infoText: string;
};

export type CurrentPageStateType = {
  isHomeScreen: boolean;
  selectedProject: SelectedProject;
};

const initialState: CurrentPageStateType = {
  isHomeScreen: true,
  selectedProject: { dirName: "", infoText: "", title: "" },
};

export default (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case VISIT_ALL_PROJECTS:
      return {
        isHomeScreen: true,
        selectedProject: initialState.selectedProject,
      };
    case VISIT_SPECIFIC_PROJECT:
      return {
        isHomeScreen: false,
        selectedProject: action.payload,
      };
    default:
      return state;
  }
};
