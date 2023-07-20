import { API_URL } from "../Component/const";
import { apiList } from "../helper/apiList"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginServicesApi = createApi({
    reducerPath: 'loginServicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        Login :  builder.mutation({
            query: ({ data }) => ({
                url: apiList.adminLogin.url,
                method: apiList.adminLogin.method,
                body: data,
            }),
            invalidatesTags: ['Shipping'],
            transformResponse: (response) => response,
        }),
    })
})

export const { useLoginMutation } = loginServicesApi;