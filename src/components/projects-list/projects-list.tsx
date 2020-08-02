import React, { useEffect, useState } from "react";
import "./projects-list.scss";

import Project from "./project";

type ProjectType = {
  dir: string;
  imageLink: string;
  title: string;
  infoText: string;
  order: number;
};

type propsType = {};
const allProjects: ProjectType[] = [];

function ProjectsList(props: propsType) {
  const [projects, setProjects] = useState(allProjects);

  useEffect(() => {
    import("src/projects.json")
      .then((res) => Promise.resolve(res.default))
      .then(({ projects }: { projects: ProjectType[] }) => {
        setProjects(projects);
      });
  }, []);

  return (
    <div className={"ProjectsList"} style={style.ProjectsListRoot}>
      {projects.map((project) =>
        project.dir === "template" ? null : (
          <Project
            key={project.title}
            title={project.title}
            imageSrc={project.imageLink}
            dirName={project.dir}
            infoText={project.infoText}
          />
        )
      )}
    </div>
  );
}

export default ProjectsList;

const style = {
  ProjectsListRoot: {
    width: "90%",
    margin: "10px auto 10px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 180px)",
    gridGap: "20px",
    justifyContent: "center",
    alignContent: "start",
  },
};
