import React, { FC } from 'react';
import { TableDataType, TableHeaderType } from '../../../typings/types';
import DataTableHeader from './data-table-header/data-table-header';
import DataTableRow from './data-table-row/data-table-row';
import { Content, Table, Wrapper } from './data-table.style';

type PropsType = {
    headers: Array<TableHeaderType>;
    data: Array<TableDataType>;
    methods: Array<string>;
    onSort: (value: string, method: string) => void;
};

const DataTable: FC<PropsType> = ({ headers, data, methods, onSort }) => {
    return (
        <Wrapper>
            <Table>
                <DataTableHeader headers={headers} methods={methods} onSort={onSort} />
                <Content>
                    {data &&
                        data.map((item) => {
                            return <DataTableRow key={item.id} {...item} />;
                        })}
                </Content>
            </Table>
        </Wrapper>
    );
};

export default DataTable;
