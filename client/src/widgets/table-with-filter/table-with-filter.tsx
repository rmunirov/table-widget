import React, { useEffect, useState } from 'react';
import { DataTable, FilterBar, Pagination } from '../../components';
import { useGetParamsQuery, useGetTableDataMutation } from '../../__data__/services/api';
import { Wrapper, Filter, Content, PaginationWrapper } from './table-with-filter.styles';

const TableWithFilter = () => {
    const [filterBy, setFilterBy] = useState('date');
    const [filterCond, setFilterCond] = useState('EQUAL');
    const [FilterVal, setFilterVal] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortMethod, setSortMethod] = useState('ASC');
    const [page, setPage] = useState(1);

    const [getData, result] = useGetTableDataMutation();

    const { data, isLoading } = useGetParamsQuery(undefined);

    useEffect(() => {
        getData({ sortBy: sortBy, sortMethod: sortMethod, filterBy: filterBy, condition: filterCond, value: FilterVal, page });
    }, [filterBy, filterCond, FilterVal, sortBy, sortMethod, page]);

    useEffect(() => {
        getData({ sortBy: sortBy, sortMethod: sortMethod, filterBy: filterBy, condition: filterCond, value: FilterVal, page });
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

    const handlePageChange = (value: number) => {
        setPage(value);
    };

    const onSort = (value: string, method: string) => {
        setSortBy(value);
        setSortMethod(method);
    };

    if (result.isLoading || isLoading) {
        return <div>is loading...</div>;
    }

    if (!result?.data?.success || !data?.success) {
        return <div>Something went wrong, please update the page</div>;
    }

    return (
        <Wrapper>
            <Filter>
                <FilterBar
                    conditions={data?.body?.conditions}
                    headers={data?.body?.headers}
                    filterBy={filterBy}
                    filterCondition={filterCond}
                    filterValue={FilterVal}
                    onChangeFilterBy={handleColumnChange}
                    onChangeFilterCondition={handleConditionChange}
                    onChangeFilterValue={handleValueChange}
                />
            </Filter>
            <Content>
                <DataTable
                    headers={data?.body?.headers}
                    data={result?.data?.body?.data}
                    methods={data?.body?.sortMethods}
                    onSort={onSort}
                />
            </Content>
            <PaginationWrapper>
                <Pagination count={result?.data?.body?.totalPages} page={page} onChange={handlePageChange} />
            </PaginationWrapper>
        </Wrapper>
    );
};

export default TableWithFilter;
