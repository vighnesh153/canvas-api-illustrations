import * as React from "react";
import "./button.scss";

type Props = {
  text: string;
  cb: () => void;
};

function Button(props: Props) {
  return (
    <div className={"ControllerButton"} style={style} onClick={props.cb}>
      {props.text}
    </div>
  );
}

export default Button;

const style = {
  width: "100%",
  height: "50px",
  padding: "4px 8px",

  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontSize: "20px",
  outlineColor: "black",
};
