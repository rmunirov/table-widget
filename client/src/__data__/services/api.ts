import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../constants/endpoints';

export const api = createApi({
    reducerPath: 'table-widget',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4343/api', mode: 'cors' }),
    endpoints: (builder) => ({
        getParams: builder.query({
            query: () => ENDPOINTS.GET_PARAMS,
        }),

        getTableData: builder.mutation({
            query: ({ sortBy, sortMethod, filterBy, condition, value, page }) => ({
                url:
                    `${ENDPOINTS.GET_TABLE_DATA}?sortBy=${sortBy}` +
                    `&sortMethod=${sortMethod}&filterBy=${filterBy}&condition=${condition}&value=${value}&page=${page}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetTableDataMutation, useGetParamsQuery } = api;
