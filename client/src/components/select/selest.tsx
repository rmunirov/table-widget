import React, { FC, useEffect } from 'react';
import { Label, Select, Wrapper, Option } from './select.styles';

type Item = {
    value: string;
    label: string;
};

type PropsType = {
    /** Label and placeholder*/
    labelText?: string;
    /** Current value */
    value: string;
    /** Handler input change */
    onChange: (value: string) => void;
    /** Options */
    items: Array<Item>;
};

const SelectComponent: FC<PropsType> = ({ items, labelText, value, onChange }) => {
    useEffect(() => {
        if (items.length > 0) {
            onChange(items[0].value);
        }
    }, []);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    if (!items) {
        return null;
    }

    return (
        <Wrapper>
            {labelText && <Label>{labelText}</Label>}
            <Select value={value} onChange={handleChange}>
                {items.map((item) => (
                    <Option key={item.value} value={item.value}>
                        {item.label}
                    </Option>
                ))}
            </Select>
        </Wrapper>
    );
};

export default SelectComponent;
