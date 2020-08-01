export type ButtonType = {
    text: string;
    clickHandler: () => void;
};

export type NumberInputType = {
    title: string;
    note: string;
    min: number; max: number; step: number; currentValue: number;
    onChange: (value: number) => void;
};

export type RangeInputType = {
    title: string;
    note: string;
    min: number; max: number; step: number; currentValue: number;
    onChange: (value: number) => void;
};

export type SelectFromDropDownType = {
    title: string;
    currentValue: string;
    options: { returnValue: string, displayText: string }[];
    onChange: (value: string) => void;
};

export default interface DataAttributes {
    buttons?: ButtonType[],
    numberInputs?: NumberInputType[],
    rangeInputs?: RangeInputType[],
    selectFromDropDowns?: SelectFromDropDownType[],
}
