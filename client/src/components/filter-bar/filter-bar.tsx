import React, { FC } from 'react';
import { Wrapper } from './filter-bar.styles';
import InputComponent from './input/input';
import SelectComponent from './select/selest';
import { TableHeaderType, ConditionType } from '../../../typings/types';

type PropsType = {
    headers: Array<TableHeaderType>;
    conditions: Array<ConditionType>;
    filterBy: string;
    filterCondition: string;
    filterValue: string;
    onChangeFilterBy: (value: string) => void;
    onChangeFilterCondition: (value: string) => void;
    onChangeFilterValue: (value: string) => void;
};

const FilterBar: FC<PropsType> = ({
    headers,
    conditions,
    filterBy,
    filterCondition,
    filterValue,
    onChangeFilterBy,
    onChangeFilterCondition,
    onChangeFilterValue,
}) => {
    return (
        <Wrapper>
            <SelectComponent items={headers} labelText={'Столбец'} onChange={onChangeFilterBy} value={filterBy} />
            <SelectComponent items={conditions} labelText={'Условие'} onChange={onChangeFilterCondition} value={filterCondition} />
            <InputComponent value={filterValue} onChange={onChangeFilterValue} labelText={'Значение'} />
        </Wrapper>
    );
};

export default FilterBar;
