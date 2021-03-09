import React, {useEffect} from "react";
import DataAttributes from "src/models/data-attributes";

import Controller from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;

  useEffect(() => {
    const currentVal = "5";

    const canvasEl = props.canvasRef.current as HTMLCanvasElement;
    let gameController = new Controller(canvasEl, parseInt(currentVal, 10));
    canvasEl.focus();

    const dataAttributes: DataAttributes = {
      selectFromDropDowns: [
        {
          title: 'Disks',
          currentValue: currentVal,
          onChange: (val) => {
            gameController.stop();
            gameController = new Controller(canvasEl, parseInt(val, 10));
            canvasEl.focus();
          },
          options: [
            { returnValue: '1', displayText: '1' },
            { returnValue: '2', displayText: '2' },
            { returnValue: '3', displayText: '3' },
            { returnValue: '4', displayText: '4' },
            { returnValue: '5', displayText: '5' },
            { returnValue: '6', displayText: '6' },
            { returnValue: '7', displayText: '7' },
            { returnValue: '8', displayText: '8' },
            { returnValue: '9', displayText: '9' },
            { returnValue: '10', displayText: '10' },
          ],
        }
      ],
      buttons: [
        {
          text: "START",
          clickHandler: () => {
            gameController.start();
          },
        },
      ],
    };

    setDataAttributes(dataAttributes);

    return () => {
      gameController.stop();
    };
  }, []);

  return <></>;
}

export default Component;
