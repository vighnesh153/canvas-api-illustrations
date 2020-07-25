import * as React from 'react';
import './data.scss';

import Button from 'src/util-components/button';
import NumberInput from 'src/util-components/number-input';

type Props = {

};

function Data(props: Props) {
    return (
        <div className="Data" style={ style.DataRoot }>
            <div style={ style.child }><Button text={'Start'} cb={() => {}}/></div>
            <div style={ style.child }>
                <NumberInput
                    min={1} max={10}
                    title={'Something'} currentValue={5}
                    note={'I am a note'} step={1}
                    onChange={(n) => console.log('Number changed to', n)}
                />
            </div>
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
        gridTemplateColumns: 'repeat(auto-fit, 150px)',
        gridGap: '10px',
        justifyContent: 'space-evenly',
        alignContent: 'start',
    },
    child: {
        width: '100%',
        height: '70px',
        border: '1px solid purple',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
