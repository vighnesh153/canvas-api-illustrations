export type ButtonType = {
  text: string;
  clickHandler: () => void;
};

export type NumberInputType = {
  title: string;
  note: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  onChange: (value: number) => void;
};

export type RangeInputType = {
  title: string;
  note: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  onChange: (value: number) => void;
};

export type SelectFromDropDownType = {
  title: string;
  currentValue: string;
  options: { returnValue: string; displayText: string }[];
  onChange: (value: string) => void;
};

export default interface DataAttributes {
  buttons?: ButtonType[];
  numberInputs?: NumberInputType[];
  rangeInputs?: RangeInputType[];
  selectFromDropDowns?: SelectFromDropDownType[];
}

// Example
// const dataAttributes: DataAttributes = {
//     buttons: [
//         {
//             text: "Text",
//             clickHandler: () => {},
//         },
//     ],
//     numberInputs: [
//         {
//             title: "Number Input Title",
//             note: "I am a note",
//             min: 1,
//             max: 10,
//             step: 1,
//             currentValue: 5,
//             onChange: (value: number) => {},
//         },
//     ],
//     rangeInputs: [
//         {
//             title: "Range Input Title",
//             note: "I am a note",
//             min: 1,
//             max: 10,
//             step: 1,
//             currentValue: 5,
//             onChange: (value: number) => {},
//         },
//     ],
//     selectFromDropDowns: [
//         {
//             title: "Dropdown Title",
//             onChange: (value) => {},
//             options: [{ returnValue: "val1", displayText: "Value 1" }],
//             currentValue: "val1",
//         },
//     ],
// };
