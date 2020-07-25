import * as React from 'react';
import './data.scss';

type Props = {

};

function Data(props: Props) {
    return (
        <div className="Data" style={ style.DataRoot }>
            <div style={ style.child }>Child</div>
            <div style={ style.child }>Child</div>
            <div style={ style.child }>Child</div>
            <div style={ style.child }>Child</div>
            <div style={ style.child }>Child</div>
            <div style={ style.child }>Child</div>
        </div>
    );
}

export default Data;

const style = {
    DataRoot: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 200px)',
        gridGap: '10px',
        justifyContent: 'space-evenly',
        alignContent: 'start',
    },
    child: {
        width: '100%',
        height: '70px',
        border: '1px solid purple'
    },
};
