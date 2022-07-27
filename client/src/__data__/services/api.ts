import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../constants/endpoints';

export const api = createApi({
    reducerPath: 'table-widget',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4343/api', mode: 'cors' }),
    endpoints: (builder) => ({
        getTableData: builder.query({
            query: () => ENDPOINTS.GET_TABLE_DATA,
        }),

        getHeaders: builder.query({
            query: () => ENDPOINTS.GET_HEADERS,
        }),

        getConditions: builder.query({
            query: () => ENDPOINTS.GET_CONDITIONS,
        }),
        getSortMethods: builder.query({
            query: () => ENDPOINTS.GET_SORT_METHODS,
        }),

        getTableDataSort: builder.mutation({
            query: ({ sortBy, sortMethod }) => ({
                url: `${ENDPOINTS.GET_TABLE_DATA_SORT}?sortBy=${sortBy}&sortMethod=${sortMethod}`,
                method: 'GET',
            }),
        }),

        getTableDataFilter: builder.mutation({
            query: ({ filterBy, condition, value }) => ({
                url: `${ENDPOINTS.GET_TABLE_DATA_FILTER}?filterBy=${filterBy}&condition=${condition}&value=${value}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetTableDataQuery,
    useGetConditionsQuery,
    useGetHeadersQuery,
    useGetTableDataFilterMutation,
    useGetTableDataSortMutation,
    useGetSortMethodsQuery,
} = api;
