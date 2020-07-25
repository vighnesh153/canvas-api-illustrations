import * as React from 'react';
import './range-input.scss';

type Props = {
    title: string;
    note: string;

    min: number;
    max: number;
    step: number;
    currentValue: number;

    onChange: (value: number) => void;
};

function RangeInput(props: Props) {
    const [currentValue, setCurrentValue] = React.useState(props.currentValue);
    const { onChange } = props;

    React.useEffect(() => {
        onChange(currentValue);
    }, [currentValue, onChange]);

    return (
        <div className="range-input" style={ style.RangeInputRoot }>
            <div className={ 'RangeInput__title' } style={ style.title }>
                { props.title }
            </div>
            <div style={ style.box }>
                <label>
                    <input type="range" min={ props.min } max={ props.max }
                           step={ props.step } value={ currentValue }
                           onChange={ (e) => setCurrentValue(+e.target.value) }/>
                </label>
            </div>
            <div className={ 'RangeInput__note' } style={ style.note }>
                { props.note ? '(' + props.note + ')' : props.note }
            </div>
        </div>
    );
}

export default RangeInput;

const style = {
    RangeInputRoot: {
        width: '100%',
    },
    title: {
        width: '100%',
        fontSize: '16px',
        marginBottom: 0,
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
    },
    note: {
        width: '100%',
        color: '#4b4b4b',
        fontStyle: 'italic',
    },
};
