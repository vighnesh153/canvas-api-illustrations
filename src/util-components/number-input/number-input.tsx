import * as React from 'react';
import './number-input.scss';

type Props = {
    title: string;
    note: string;

    min: number;
    max: number;
    step: number
    currentValue: number;

    onChange: (value: number) => void;
};

function NumberInput(props: Props) {
    const [currentValue, setCurrentValue] = React.useState(props.currentValue);
    const { onChange } = props;

    React.useEffect(() => {
        onChange(currentValue);
    }, [currentValue, onChange]);

    const increment = () => {
        setCurrentValue(prev => {
            return Math.min(props.max, prev + props.step);
        });
    };

    const decrement = () => {
        setCurrentValue(prev => {
            return Math.max(props.min, prev - props.step);
        });
    };

    return (
        <div style={ style.NumberInputRoot }>
            <div className={ 'NumberInput__title' } style={ style.title }>
                { props.title }
            </div>
            <div className="NumberInput__box">
                <div className="box-content down-arrow" onClick={ decrement }>
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="currentColor"
                              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                    </svg>
                </div>
                <div className="box-content text-box current-value">{ currentValue }</div>
                <div className="box-content up-arrow" onClick={ increment }>
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="currentColor"
                              d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" />
                    </svg>
                </div>
            </div>
            <div className={ 'NumberInput__note' } style={ style.note }>
                { props.note ? `( ${props.note} )` : '' }
            </div>
        </div>
    );
}

export default NumberInput;

const style = {
    NumberInputRoot: {
        width: '100%',
    },
    title: {
        fontSize: '16px',
        marginBottom: 0
    },
    note: {
        color: '#4b4b4b',
        fontStyle: 'italic'
    }
};
