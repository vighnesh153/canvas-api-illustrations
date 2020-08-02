import * as React from "react";
import "./project.scss";
import { SelectedProject } from "src/redux-impl/current-page/reducer";

type Props = {
  title: string;
  imageSrc: string;
  infoText: string;
  dirName: string;

  setCurrentProject: (p: SelectedProject) => void;
};

function Project(props: Props) {
  return (
    <div
      className={"Project"}
      style={style.ProjectRoot}
      onClick={() =>
        props.setCurrentProject({
          title: props.title,
          dirName: props.dirName,
          infoText: props.infoText,
        })
      }
    >
      <div style={style.image}>
        <img
          className="Project__image"
          src={props.imageSrc}
          alt="Illustration snap"
        />
      </div>
      <div className="Project__title" style={style.title}>
        {props.title}
      </div>
    </div>
  );
}

export default Project;

const style = {
  ProjectRoot: {
    width: "100%",
    height: "200px",
    borderRadius: "10px",
    boxShadow: "0 0 10px #bbb",
    cursor: "pointer",
  },
  image: {
    width: "90%",
    height: "60%",
    border: "1px solid #bbb",
    margin: "10px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  title: {
    width: "90%",
    margin: "auto",
    fontSize: "20px",
  },
};
