import React from "react";
import DataAttributes from "src/models/data-attributes";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

function Component(props: PropsType) {
  return <></>;
}

export default Component;

const dataAttributes: DataAttributes = {
  buttons: [
    {
      text: "Text",
      clickHandler: () => {},
    },
  ],
  numberInputs: [
    {
      title: "Number Input Title",
      note: "I am a note",
      min: 1,
      max: 10,
      step: 1,
      currentValue: 5,
      onChange: (value: number) => {},
    },
  ],
  rangeInputs: [
    {
      title: "Range Input Title",
      note: "I am a note",
      min: 1,
      max: 10,
      step: 1,
      currentValue: 5,
      onChange: (value: number) => {},
    },
  ],
  selectFromDropDowns: [
    {
      title: "Dropdown Title",
      onChange: (value) => {},
      options: [{ returnValue: "val1", displayText: "Value 1" }],
      currentValue: "val1",
    },
  ],
};
