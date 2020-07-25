import * as React from 'react';
import './select-from-drop-down.scss';

type Props = {
    title: string;
    currentValue: string;
    options: { returnValue: string, displayText: string }[];

    onChange: (value: string) => void;
};

function SelectFromDropDown(props: Props) {
    const [currentValue, setCurrentValue] = React.useState(props.currentValue);
    const { onChange } = props;

    React.useEffect(() => {
        onChange(currentValue);
    }, [currentValue, onChange]);

    return (
        <label style={ style.SelectFromDropDownRoot }>
            <div className="SelectFromDropDown__title" style={ style.title }>
                { props.title }
            </div>
            <select name="result" style={ style.select } value={ currentValue }
                    onChange={ e => setCurrentValue(e.target.value) }
            >
                {
                    props.options.map(({ returnValue, displayText }) => {
                        return (
                            <option value={ returnValue } key={ displayText }>
                                { displayText }
                            </option>
                        );
                    })
                }
            </select>
        </label>
    );
}

export default SelectFromDropDown;

const style = {
    SelectFromDropDownRoot: {
        width: '100%',
    },
    title: {
        marginBottom: '5px'
    },
    select: {
        width: '90%',
        margin: 'auto',
        display: 'block',
        fontSize: '18px',
    },
};
