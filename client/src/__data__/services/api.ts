import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../constants/endpoints';

export const api = createApi({
    reducerPath: 'table-widget',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4343/api', mode: 'cors' }),
    endpoints: (builder) => ({
        getTableData: builder.query({
            query: () => ENDPOINTS.GET_TABLE_DATA,
        }),
    }),
});

export const { useGetTableDataQuery } = api;
