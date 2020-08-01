import React, { Suspense } from "react";
import "./canvas.scss";

type Props = {
  infoText: string;
  dirName: string;
};

function CanvasContainer(props: Props) {
  const canvasRef = React.createRef<HTMLCanvasElement>();

  const CanvasManipulator = React.lazy(() =>
    import(`src/illustrations/${props.dirName}`)
  );

  return (
    <div className="canvas" style={style.CanvasRoot}>
      <div className="Canvas__info" style={style.info}>
        {props.infoText}
      </div>
      <canvas height="300" width="500" style={style.canvasEl} ref={canvasRef}>
        Sorry. Your browser doesn't support canvas element.
      </canvas>
      <Suspense fallback={<div>Loading...</div>}>
        <CanvasManipulator canvasRef={canvasRef} />
      </Suspense>
    </div>
  );
}

export default CanvasContainer;

const style = {
  CanvasRoot: {},
  info: {
    margin: "5px auto 0",
  },
  canvasEl: {
    display: "block",
    margin: "10px auto 0",
    border: "1px solid black",
  },
};
