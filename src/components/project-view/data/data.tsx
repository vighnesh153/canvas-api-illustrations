import * as React from 'react';
import './data.scss';

import Button from 'src/util-components/button';
import NumberInput from 'src/util-components/number-input';
import RangeInput from 'src/util-components/range-input';
import SelectFromDropDown from 'src/util-components/select-from-drop-down';

type Props = {

};

function Data(props: Props) {
    return (
        <div className="Data" style={ style.DataRoot }>
            <div style={ style.child }>
                <Button text={'Start'} cb={() => {
                    console.log('Start was clicked')
                }}/>
            </div>
            <div style={ style.child }>
                <NumberInput
                    min={1} max={10}
                    title={'Something'} currentValue={5}
                    note={'I am a note'} step={1}
                    onChange={(n) => console.log('Number changed to', n)}
                />
            </div>
            <div style={ style.child }>
                <RangeInput
                    min={0} max={2 * Math.PI} step={0.01} currentValue={0.45}
                    title={'Range Input'} note={'I am a note'}
                    onChange={(value) => {
                        console.log('Value changed to', value)
                    }}
                />
            </div>
            <div style={ style.child }>
                <SelectFromDropDown
                    title={ 'Some Title' } currentValue={ 'val2' }
                    options={ [
                        { displayText: 'Value 1', returnValue: 'val1' },
                        { displayText: 'Value 2', returnValue: 'val2' },
                        { displayText: 'Value 3', returnValue: 'val3' },
                        { displayText: 'Value 4', returnValue: 'val4' },
                    ] }
                    onChange={(value => {
                        console.log('Value changed to', value)
                    })}
                />
            </div>
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
