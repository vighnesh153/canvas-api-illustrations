import React from "react";
import "./project-view.scss";

import Data from "./data";
import CanvasContainer from "./canvas-container";

type Props = {
  title: string;
  infoText: string;
  dirName: string;
};

function ProjectView(props: Props) {
  return (
    <div style={style.ProjectViewRoot}>
      <div className="ProjectView__title" style={style.title}>
        {props.title}
      </div>
      <div>
        <Data />
        <CanvasContainer dirName={props.dirName} infoText={props.infoText} />
      </div>
    </div>
  );
}

export default ProjectView;

const style = {
  ProjectViewRoot: {
    width: "90%",
    minWidth: "900px",
    margin: "10px auto",
    border: "1px solid red",
  },
  title: {
    marginBottom: "10px",
    fontSize: "20px",
  },
  flexCentered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
