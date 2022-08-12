import React, { FC } from 'react';
import { Input, Label, Wrapper } from './input.styles';

type PropsType = {
    /** Label and placeholder*/
    labelText?: string;
    /** Current value */
    value: string;
    /** Handler input change */
    onChange: (value: string) => void;
};

const InputComponent: FC<PropsType> = ({ labelText, value, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <Wrapper>
            {labelText && <Label>{labelText}</Label>}
            <Input value={value} onChange={handleChange}></Input>
        </Wrapper>
    );
};

export default InputComponent;
