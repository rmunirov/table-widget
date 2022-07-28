import React, { useEffect, useState } from 'react';
import { SelectComponent, InputComponent, TableComponent } from '../../components';
import { useGetParamsQuery, useGetTableDataMutation } from '../../__data__/services/api';
import { Wrapper, Filter, Content } from './table-with-filter.styles';

// TODO надо разделить заголовок таблицы и данные на 2 виджета, чтобы обрабатывали свои запросы отдельно
const TableWithFilter = () => {
    const [filterBy, setFilterBy] = useState('');
    const [filterCond, setFilterCond] = useState('');
    const [FilterVal, setFilterVal] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortMethod, setSortMethod] = useState('');
    const [activeSortColumn, setActiveSortColumn] = useState(null);

    const [getData, result] = useGetTableDataMutation();

    const { data, isLoading } = useGetParamsQuery(undefined);

    useEffect(() => {
        console.log(filterBy);
        console.log(filterCond);
        console.log(FilterVal);
        console.log(sortBy);
        console.log(sortMethod);
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
        setActiveSortColumn(data?.body?.headers.find((item) => item.value === value));
    };

    if (result.isLoading || isLoading) {
        return <div>is loading...</div>;
    }

    if (!result?.data?.success || !data?.success) {
        return <div>Something went wrong, please update the page</div>;
    }

    const headersWithSort = data?.body?.headers.map((item) => {
        return {
            ...item,
            onSort: onSort,
        };
    });

    return (
        <Wrapper>
            <Filter>
                <SelectComponent items={data?.body?.headers} labelText="Столбец" value={filterBy} onChange={handleColumnChange} />
                <SelectComponent items={data?.body?.conditions} labelText="Условие" value={filterCond} onChange={handleConditionChange} />
                <InputComponent labelText="Значение" value={FilterVal} onChange={handleValueChange} />
            </Filter>
            <Content>
                <TableComponent
                    headers={headersWithSort}
                    data={result?.data?.body}
                    methods={data?.body?.sortMethods}
                    activeSortColumn={activeSortColumn}
                />
            </Content>
        </Wrapper>
    );
};

export default TableWithFilter;
