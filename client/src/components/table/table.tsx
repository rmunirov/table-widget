import React, { FC } from 'react';
import TableHead from './table-head/table-head';
import { Row, Table, TBody, THead, Wrapper } from './table.style';
import { TableDataType, TableHeaderType } from './../../../typings/types';
import TableDataRow from './table-data/table-data';

type PropsType = {
    headers: Array<TableHeaderType>;
    data: Array<TableDataType>;
};

const TableComponent: FC<PropsType> = ({ headers, data }) => {
    return (
        <Wrapper>
            <Table>
                <THead>
                    <Row>
                        {headers.map((item) => {
                            return (
                                <TableHead
                                    key={item.title}
                                    title={item.title}
                                    withSort={item.withSort}
                                    onSort={item.onSort}
                                />
                            );
                        })}
                    </Row>
                </THead>
                <TBody>
                    {data.map((item) => {
                    return <TableDataRow key={item.name} {...item} />;
                })}
                </TBody>
            </Table>
        </Wrapper>
    );
};

export default TableComponent;
