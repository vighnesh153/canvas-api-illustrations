import React from "react";

import "./nav-bar.scss";

type NavBarProps = {
  isHomeScreen: boolean;
  goToAllProjectsPage: () => void;
};

function NavBar(props: NavBarProps) {
  return (
    <div style={style.navRoot}>
      <div style={style.content}>
        <div style={style.title}>Canvas Illustrations</div>
        {!props.isHomeScreen && (
          <div
            className={"NavBar__back-btn"}
            style={style.backBtn}
            onClick={props.goToAllProjectsPage}
          >
            Back
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

const style = {
  navRoot: {
    height: "10vh",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
  },
  title: {
    fontSize: "20px",
  },
  backBtn: {
    padding: "5px 15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
