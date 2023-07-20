import { API_URL } from "../Component/const";
import { Rough, apiList } from "../helper/apiList"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roughServicesApi = createApi({
    reducerPath: 'roughServicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['Rough'],
    endpoints: (builder) => ({
        getRough: builder.query({
            query: ({ skip , limit}) => {
                return (
                    {
                        url: `${Rough.getRough.url(skip,limit)}`,
                        method: `${Rough.getRough.method}`
                    }
                )
            },
        }),
        addRough: builder.mutation({
            query: ({ data }) => {
                return (
                    {
                        url: `${Rough.addRough.url}`,
                        method: `${Rough.addRough.method}`,
                        body : data
                    }
                )
            },
        }),
        deleteRough: builder.mutation({
            query: ({ id }) => {
                return (
                    {
                        url: `${Rough.deleteRough.url(id)}`,
                        method: `${Rough.deleteRough.method}`                    
                    }
                )
            },
        }),
        editRough: builder.mutation({
            query: ({ id, data }) => {
                return (
                    {
                        url: `${Rough.editRough.url(id)}`,
                        method: `${Rough.editRough.method}`,
                        body : data                    
                    }
                )
            },
        }),
        getRoughList: builder.query({
            query: () => {
                return (
                    {
                        url: `${Rough.getRoughPreference.url}`,
                        method: `${Rough.getRoughPreference.method}`                    }
                )
            },
        })
    })
})

export const { useGetRoughQuery , useDeleteRoughMutation, useAddRoughMutation, useEditRoughMutation, useGetRoughListQuery } = roughServicesApi;


        // export const getRoughPrefrence = (id) => (dispatch) =>
        //     fetchUrl(Rough.getRoughPrefrence.method, Rough.getRoughPrefrence.url, id)

        // export const getPolishRough = (id) => (dispatch) => 
        //   fetchUrl(Rough.getPolishRough.method, Rough.getPolishRough.url, id)

        // export const getSortingData = (id) => (dispatch) =>
        //     fetchUrl(Rough.getSortingData.method, Rough.getSortingData.url, id)

        // export const addSortingData = (data) => (dispatch) => {
        //     fetchUrl(Rough.addSortingData.method, Rough.addSortingData.url, data)
        // };






