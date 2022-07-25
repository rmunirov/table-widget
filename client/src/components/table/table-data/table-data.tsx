import React, { FC } from 'react';
import { Data, Row } from './table-data.styles';
import { TableDataType } from './../../../../typings/types';

const TableDataRow: FC<TableDataType> = ({ date, name, count, distance }) => {
    return (
        <Row>
            <Data>{date.toLocaleString()}</Data>
            <Data>{name}</Data>
            <Data>{count}</Data>
            <Data>{distance}</Data>
        </Row>
    );
};

export default TableDataRow;
