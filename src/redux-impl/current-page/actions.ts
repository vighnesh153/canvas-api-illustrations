import { VISIT_ALL_PROJECTS, VISIT_SPECIFIC_PROJECT } from "./action-types";
import { SelectedProject } from "./reducer";

export function visitAllProjects() {
  return {
    type: VISIT_ALL_PROJECTS,
    payload: null,
  };
}

export function visitSpecificProject(selectedProject: SelectedProject) {
  return {
    type: VISIT_SPECIFIC_PROJECT,
    payload: selectedProject,
  };
}
