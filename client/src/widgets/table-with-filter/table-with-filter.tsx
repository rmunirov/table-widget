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

    const headers: Array<TableHeaderType> = [
        { title: 'Дата', withSort: false, onSort: () => {} },
        { title: 'Название', withSort: true, onSort: () => {} },
        { title: 'Количество', withSort: true, onSort: () => {} },
        { title: 'Расстояние', withSort: true, onSort: () => {} },
    ];

    const data: Array<TableDataType> = [
        { date: new Date(), name: 'React#1', count: 1, distance: 11 },
        { date: new Date(), name: 'React#2', count: 1, distance: 12 },
        { date: new Date(), name: 'React#3', count: 1, distance: 13 },
        { date: new Date(), name: 'React#4', count: 1, distance: 14 },
        { date: new Date(), name: 'React#5', count: 1, distance: 15 },
        { date: new Date(), name: 'React#6', count: 1, distance: 16 },
        { date: new Date(), name: 'React#7', count: 1, distance: 17 },
        { date: new Date(), name: 'React#8', count: 1, distance: 18 },
        { date: new Date(), name: 'React#9', count: 1, distance: 19 },
    ];

    return (
        <Wrapper>
            <Filter>
                <SelectComponent items={items} labelText='Столбец' value={column} onChange={handleColumnChange} />
                <SelectComponent
                    items={conditions}
                    labelText='Условие'
                    value={condition}
                    onChange={handleConditionChange}
                />
                <InputComponent labelText='Значение' value={value} onChange={handleValueChange} />
            </Filter>
            <Content>
                <TableComponent headers={headers} data={data} />
            </Content>
        </Wrapper>
    );
};

export default TableWithFilter;
