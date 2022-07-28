import React, { useEffect, useState } from 'react';
import { SelectComponent, InputComponent, TableComponent } from '../../components';
import { useGetConditionsQuery, useGetHeadersQuery, useGetSortMethodsQuery, useGetTableDataMutation } from '../../__data__/services/api';
import { Wrapper, Filter, Content } from './table-with-filter.styles';

const TableWithFilter = () => {
    const [filterBy, setFilterBy] = useState('');
    const [filterCond, setFilterCond] = useState('');
    const [FilterVal, setFilterVal] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortMethod, setSortMethod] = useState('');
    const [activeSortColumn, setActiveSortColumn] = useState(null);

    const [getData, result] = useGetTableDataMutation();

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
        if (sortBy && sortMethod) {
            getData({ sortBy: sortBy, sortMethod: sortMethod, filterBy: filterBy, condition: filterCond, value: FilterVal });
        }
    }, [filterBy, filterCond, FilterVal, sortBy, sortMethod]);

    useEffect(() => {
        getData({ sortBy: sortBy, sortMethod: sortMethod, filterBy: filterBy, condition: filterCond, value: FilterVal });
    }, []);

    const handleColumnChange = (value: string) => {
        setFilterBy(value);
    };

    const handleConditionChange = (value: string) => {
        setFilterCond(value);
    };

    const handleValueChange = (value: string) => {
        setFilterVal(value);
    };

    const onSort = (value: string, method: string) => {
        setSortBy(value);
        setSortMethod(method);
        setActiveSortColumn(headersData?.body.find((item) => item.value === value));
    };

    if (isLoadingHeaders || isLoadingConditions || isLoadingSortMethods || result.isLoading) {
        return <div>is loading...</div>;
    }

    if (!headersData?.success || !conditionsData?.success || !sortMethodsData?.success || !result.isSuccess || !result.data.success) {
        return <div>Something went wrong, please update the page</div>;
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
                <SelectComponent items={headersData?.body} labelText="Столбец" value={filterBy} onChange={handleColumnChange} />
                <SelectComponent items={conditionsData?.body} labelText="Условие" value={filterCond} onChange={handleConditionChange} />
                <InputComponent labelText="Значение" value={FilterVal} onChange={handleValueChange} />
            </Filter>
            <Content>
                <TableComponent
                    headers={headersWithSort}
                    data={result?.data?.body}
                    methods={sortMethodsData?.body}
                    activeSortColumn={activeSortColumn}
                />
            </Content>
        </Wrapper>
    );
};

export default TableWithFilter;
