import React, { FC } from 'react';
import { Data, Row } from './data-table-data.styles';
import { TableDataType } from '../../../../typings/types';

const DataTableRow: FC<TableDataType> = ({ date, name, count, distance }) => {
    return (
        <Row>
            <Data>{date.toLocaleString()}</Data>
            <Data>{name}</Data>
            <Data>{count}</Data>
            <Data>{distance}</Data>
        </Row>
    );
};

export default DataTableRow;
