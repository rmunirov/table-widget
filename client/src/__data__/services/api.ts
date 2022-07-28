import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../constants/endpoints';

export const api = createApi({
    reducerPath: 'table-widget',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4343/api', mode: 'cors' }),
    endpoints: (builder) => ({
        getHeaders: builder.query({
            query: () => ENDPOINTS.GET_HEADERS,
        }),

        getConditions: builder.query({
            query: () => ENDPOINTS.GET_CONDITIONS,
        }),
        getSortMethods: builder.query({
            query: () => ENDPOINTS.GET_SORT_METHODS,
        }),

        getTableData: builder.mutation({
            query: ({ sortBy, sortMethod, filterBy, condition, value }) => ({
                url:
                    `${ENDPOINTS.GET_TABLE_DATA}?sortBy=${sortBy}` +
                    `&sortMethod=${sortMethod}&filterBy=${filterBy}&condition=${condition}&value=${value}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetConditionsQuery, useGetHeadersQuery, useGetSortMethodsQuery, useGetTableDataMutation } = api;
