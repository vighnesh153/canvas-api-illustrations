import * as React from "react";
import "./data.scss";

import DataAttributes, {
  ButtonType,
  NumberInputType,
  RangeInputType,
  SelectFromDropDownType,
} from "src/models/data-attributes";

import Button from "src/util-components/button";
import NumberInput from "src/util-components/number-input";
import RangeInput from "src/util-components/range-input";
import SelectFromDropDown from "src/util-components/select-from-drop-down";

type Props = {
  attrs: DataAttributes;
};

function Data(props: Props) {
  const attrs = props.attrs;
  const buttons = attrs.buttons ? (attrs.buttons as ButtonType[]) : [];
  const numberInputs = attrs.numberInputs
    ? (attrs.numberInputs as NumberInputType[])
    : [];
  const rangeInputs = attrs.rangeInputs
    ? (attrs.rangeInputs as RangeInputType[])
    : [];
  const dropDowns = attrs.selectFromDropDowns
    ? (attrs.selectFromDropDowns as SelectFromDropDownType[])
    : [];

  return (
    <div className="Data" style={style.DataRoot}>
      {buttons.map((button) => (
        <div style={style.child} key={button.text}>
          <Button text={button.text} cb={button.clickHandler} />
        </div>
      ))}
      {/*<div style={ style.child }>*/}
      {/*    <Button text={'Start'} cb={() => {*/}
      {/*        console.log('Start was clicked')*/}
      {/*    }}/>*/}
      {/*</div>*/}
      {numberInputs.map((numberInput) => (
        <div style={style.child} key={numberInput.title}>
          <NumberInput
            min={numberInput.min}
            max={numberInput.max}
            title={numberInput.title}
            currentValue={numberInput.currentValue}
            note={numberInput.note}
            step={numberInput.step}
            onChange={numberInput.onChange}
          />
        </div>
      ))}
      {/*<div style={ style.child }>*/}
      {/*    <NumberInput*/}
      {/*        min={1} max={10}*/}
      {/*        title={'Something'} currentValue={5}*/}
      {/*        note={'I am a note'} step={1}*/}
      {/*        onChange={(n) => console.log('Number changed to', n)}*/}
      {/*    />*/}
      {/*</div>*/}
      {rangeInputs.map((rangeInput) => (
        <div style={style.child} key={rangeInput.title}>
          <RangeInput
            min={rangeInput.min}
            max={rangeInput.max}
            step={rangeInput.step}
            onChange={rangeInput.onChange}
            currentValue={rangeInput.currentValue}
            title={rangeInput.title}
            note={rangeInput.note}
          />
        </div>
      ))}
      {/*<div style={ style.child }>*/}
      {/*    <RangeInput*/}
      {/*        min={0} max={2 * Math.PI} step={0.01} currentValue={0.45}*/}
      {/*        title={'Range Input'} note={'I am a note'}*/}
      {/*        onChange={(value) => {*/}
      {/*            console.log('Value changed to', value)*/}
      {/*        }}*/}
      {/*    />*/}
      {/*</div>*/}
      {dropDowns.map((dropDown) => (
        <div style={style.child} key={dropDown.title}>
          <SelectFromDropDown
            title={dropDown.title}
            currentValue={dropDown.currentValue}
            options={dropDown.options}
            onChange={dropDown.onChange}
          />
        </div>
      ))}
      {/*<div style={ style.child }>*/}
      {/*    <SelectFromDropDown*/}
      {/*        title={ 'Some Title' } currentValue={ 'val2' }*/}
      {/*        options={ [*/}
      {/*            { displayText: 'Value 1', returnValue: 'val1' },*/}
      {/*            { displayText: 'Value 2', returnValue: 'val2' },*/}
      {/*            { displayText: 'Value 3', returnValue: 'val3' },*/}
      {/*            { displayText: 'Value 4', returnValue: 'val4' },*/}
      {/*        ] }*/}
      {/*        onChange={(value => {*/}
      {/*            console.log('Value changed to', value)*/}
      {/*        })}*/}
      {/*    />*/}
      {/*</div>*/}
    </div>
  );
}

export default Data;

const style = {
  DataRoot: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 150px)",
    gridGap: "10px",
    justifyContent: "space-evenly",
    alignContent: "start",
  },
  child: {
    width: "100%",
    height: "70px",
    // border: '1px solid purple',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
