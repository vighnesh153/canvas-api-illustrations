import React, {useEffect} from "react";
import DataAttributes from "src/models/data-attributes";

import Controller  from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;

  useEffect(() => {
    const canvasEl = props.canvasRef.current as HTMLCanvasElement;
    const gameController = new Controller(canvasEl);
    canvasEl.focus();
    gameController.start();

    return () => {
      gameController.stop();
    };
  }, []);

  return <></>;
}

export default Component;
