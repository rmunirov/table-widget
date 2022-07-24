import React, { useState } from 'react';
import { SelectComponent, InputComponent, TableComponent } from '../../components';
import { Wrapper, Filter, Content } from './table-with-filter.styles';

const TableWithFilter = () => {
    const [column, setColumn] = useState('');
    const [condition, setCondition] = useState('');
    const [value, setValue] = useState('');

    const handleColumnChange = (value: string) => {
        setColumn(value);
    };

    const handleConditionChange = (value: string) => {
        setCondition(value);
    };

    const handleValueChange = (value: string) => {
        setValue(value);
    };

    const items = [
        { value: 'data', label: 'Дата' },
        { value: 'name', label: 'Название' },
        { value: 'count', label: 'Количество' },
        { value: 'distance', label: 'Расстояние' },
    ];

    const conditions = [
        { value: 'equal', label: 'равно' },
        { value: 'contain', label: 'содержит' },
        { value: 'greater', label: 'больше' },
        { value: 'less', label: 'меньше' },
    ];

    return (
        <Wrapper>
            <Filter>
                <SelectComponent items={items} labelText="Столбец" value={column} onChange={handleColumnChange} />
                <SelectComponent
                    items={conditions}
                    labelText="Условие"
                    value={condition}
                    onChange={handleConditionChange}
                />
                <InputComponent labelText="Значение" value={value} onChange={handleValueChange} />
            </Filter>
            <Content>
                <TableComponent />
            </Content>
        </Wrapper>
    );
};

export default TableWithFilter;
