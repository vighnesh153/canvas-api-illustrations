import React, {useEffect} from "react";
import DataAttributes from "src/models/data-attributes";

import { ParticlesController } from "./controller";

type PropsType = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDataAttributes: (v: DataAttributes) => void;
};

function Component(props: PropsType) {
  const { canvasRef, setDataAttributes } = props;

  useEffect(() => {
    setDataAttributes({});

    const canvasEl = props.canvasRef.current as HTMLCanvasElement;
    const gameController = new ParticlesController(canvasEl);
    canvasEl.focus();
    gameController.start();

    canvasEl.addEventListener('mousemove', (e) => {
      const rect = canvasEl.getBoundingClientRect();
      const root = document.documentElement;

      const mouseX = e.clientX - rect.left - root.scrollLeft;
      const mouseY = e.clientY - rect.top - root.scrollTop;

      gameController.mouseOver(mouseX, mouseY);
    });

    canvasEl.addEventListener('mouseout', (e) => {
      gameController.mouseOver(1000000, 100000);
    });

    return () => {
      gameController.stop();
    };
  }, []);

  return <></>;
}

export default Component;
