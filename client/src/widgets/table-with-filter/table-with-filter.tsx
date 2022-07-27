import React, { useEffect, useState } from 'react';
import { SelectComponent, InputComponent, TableComponent } from '../../components';
import {
    useGetConditionsQuery,
    useGetHeadersQuery,
    useGetSortMethodsQuery,
    useGetTableDataFilterMutation,
    useGetTableDataQuery,
    useGetTableDataSortMutation,
} from '../../__data__/services/api';
import { Wrapper, Filter, Content } from './table-with-filter.styles';

const TableWithFilter = () => {
    const [column, setColumn] = useState('');
    const [condition, setCondition] = useState('');
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [activeSortColumn, setActiveSortColumn] = useState(null);
    const [sortTable, resultSort] = useGetTableDataSortMutation({
        selectFromResult: (result) => ({
            ...result,
        }),
    });
    const [filterTable, resultFilter] = useGetTableDataFilterMutation({
        selectFromResult: (result) => ({
            ...result,
        }),
    });

    const { tableData, isLoadingTableData } = useGetTableDataQuery(undefined, {
        selectFromResult: (result) => ({
            isLoadingTableData: result.isLoading,
            tableData: result.data,
            ...result,
        }),
    });
    const { headersData, isLoadingHeaders } = useGetHeadersQuery(undefined, {
        selectFromResult: (result) => ({
            isLoadingHeaders: result.isLoading,
            headersData: result.data,
            ...result,
        }),
    });
    const { conditionsData, isLoadingConditions } = useGetConditionsQuery(undefined, {
        selectFromResult: (result) => ({
            isLoadingConditions: result.isLoading,
            conditionsData: result.data,
            ...result,
        }),
    });

    const { sortMethodsData, isLoadingSortMethods } = useGetSortMethodsQuery(undefined, {
        selectFromResult: (result) => ({
            isLoadingSortMethods: result.isLoading,
            sortMethodsData: result.data,
            ...result,
        }),
    });

    useEffect(() => {
        if (value && column && value) {
            filterTable({ filterBy: column, condition: condition, value: value });
        }
    }, [column, condition, value]);

    useEffect(() => {
        if (tableData && resultSort.isUninitialized) {
            setData(tableData?.body);
        }

        if (resultSort.isSuccess && resultSort?.data?.success) {
            setData(resultSort?.data?.body);
        }

        if (resultFilter.isSuccess && resultFilter?.data?.success) {
            setData(resultFilter?.data?.body);
        }
    }, [tableData, resultSort, resultFilter]);

    const handleColumnChange = (value: string) => {
        setColumn(value);
    };

    const handleConditionChange = (value: string) => {
        setCondition(value);
    };

    const handleValueChange = (value: string) => {
        setValue(value);
    };

    const onSort = (value: string, method: string) => {
        sortTable({ sortBy: value, sortMethod: method });
        setActiveSortColumn(headersData?.body.find((item) => item.value === value));
    };

    if (isLoadingTableData || isLoadingHeaders || isLoadingConditions || isLoadingSortMethods) {
        return <div>is loading...</div>;
    }

    if (!tableData?.success || !headersData?.success || !conditionsData?.success || !sortMethodsData?.success) {
        return <div>Something is wrong, please update the page</div>;
    }

    if (!data) {
        return <div>Data is not received</div>;
    }

    const headersWithSort = headersData?.body.map((item) => {
        return {
            ...item,
            onSort: onSort,
        };
    });

    return (
        <Wrapper>
            <Filter>
                <SelectComponent items={headersData?.body} labelText="Столбец" value={column} onChange={handleColumnChange} />
                <SelectComponent items={conditionsData?.body} labelText="Условие" value={condition} onChange={handleConditionChange} />
                <InputComponent labelText="Значение" value={value} onChange={handleValueChange} />
            </Filter>
            <Content>
                <TableComponent headers={headersWithSort} data={data} methods={sortMethodsData?.body} activeSortColumn={activeSortColumn} />
            </Content>
        </Wrapper>
    );
};

export default TableWithFilter;
