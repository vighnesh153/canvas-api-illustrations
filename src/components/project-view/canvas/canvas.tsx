import * as React from 'react';
import './canvas.scss';

type Props = {
    infoText: string
};

function Canvas(props: Props) {
    return (
        <div className="canvas" style={ style.CanvasRoot }>
            <div className="Canvas__info" style={ style.info }>
                { props.infoText }
            </div>
            <canvas height="300" width="500" style={ style.canvasEl }>
                Sorry. Your browser doesn't support canvas element.
            </canvas>
        </div>
    );
}

export default Canvas;

const style = {
    CanvasRoot: {

    },
    info: {
        margin: '5px auto 0',
    },
    canvasEl: {
        display: 'block',
        margin: '10px auto 0',
        border: '1px solid black'
    },
};
