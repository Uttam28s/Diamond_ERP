import { API_URL } from "../Component/const";
import { apiList } from "../helper/apiList"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeeServicesApi = createApi({
    reducerPath: 'employeeServicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['Employee'],
    endpoints: (builder) => ({
        getEmployee: builder.query({
            query: () => {
                return (
                    {
                        url: `${apiList.getEmployee.url}`,
                        method: `${apiList.getEmployee.method}`
                    }
                )
            },
        }),
        AddEmployee: builder.mutation({
            query: ({ data }) => ({
                url: apiList.addEmployee.url,
                method: apiList.addEmployee.method,
                body: data,
            }),
        }),
        UpdateEmployee: builder.mutation({
            query: ({ data, id }) => ({
                url: apiList.updateEmployee.url(id),
                method: apiList.updateEmployee.method,
                body: data,
            })
        }),
        DeleteEmployee: builder.mutation({
            query: ({ id }) => ({
                url: apiList.deleteEmployee.url(id),
                method: apiList.deleteEmployee.method,
            })
        }),
        AdminLogin: builder.mutation({
            query: ({ data }) => {
                return (
                    {
                        url: apiList.adminLogin.url,
                        method: apiList.adminLogin.method,
                        body: data,
                    }
                )
            }
        })
    })
})

export const { useGetEmployeeQuery, useUpdateEmployeeMutation, useAddEmployeeMutation, useDeleteEmployeeMutation, useAdminLoginMutation } = employeeServicesApi;
