import React, { FC, useState } from 'react';
import { TableHeaderType } from '../../../../typings/types';
import { Header, Row } from './data-table-header.styles';
import TableHeaderItem from './data-table-header-item/data-table-header-item';

type PropsType = {
    headers: Array<TableHeaderType>;
    methods: Array<string>;
    onSort: (value: string, method: string) => void;
};

const DataTableHeader: FC<PropsType> = ({ headers, methods, onSort }) => {
    const [activeHeader, setActiveHeader] = useState<TableHeaderType | null | undefined>(null);

    const handleSort = (value: string, method: string) => {
        const header = headers.find((item) => item.value === value);
        setActiveHeader(header ? header : null);
        onSort(value, method);
    };

    return (
        <Header>
            <Row>
                {headers &&
                    headers.map((item) => {
                        return (
                            <TableHeaderItem
                                key={item.label}
                                header={item}
                                methods={methods}
                                onSort={handleSort}
                                isActive={activeHeader === null ? false : item.label === activeHeader?.label}
                            />
                        );
                    })}
            </Row>
        </Header>
    );
};

export default DataTableHeader;
