import { API_URL } from "../Component/const";
import { apiList } from "../helper/apiList"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryServicesApi = createApi({
    reducerPath: 'categoryServicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        GetCategory : builder.query({
            query: ({pageSize, skip}) => {
                return (
                    {
                        url: `${apiList.getCategory.url(pageSize, skip)}`,
                        method: `${apiList.getCategory.method}`
                    }
                )
            },
        }),
        AddCategory: builder.mutation({
            query: ({ data }) => ({
                url: apiList.addCategory.url,
                method: apiList.addCategory.method,
                body: data,
            }),
        }),
        UpdateCategory: builder.mutation({
            query: ({ data, id }) => ({
                url: apiList.updateCategory.url(id),
                method: apiList.updateCategory.method,
                body: data,
            })
        }),
        UpdateCategoryStatus : builder.mutation({
            query: ({ status, id}) => ({
                url : apiList.updateCategoryStatus.url(id,status),
                method : apiList.updateCategoryStatus.method
            })
        }),
        UpdateSubCategoryStatus : builder.mutation({
            query: ({ status, categoryId, subCategoryId}) => ({
                url : apiList.updateSubcategoryStatus.url(categoryId,subCategoryId,status),
                method : apiList.updateSubcategoryStatus.method
            })
        }),
        DeleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: apiList.deleteCategory.url(id),
                method: apiList.deleteCategory.method,
            })
        }),
        DeleteSubCategory: builder.mutation({
            query: ({ categoryId,subCategoryId }) => ({
                url: apiList.deleteSubCategory.url(categoryId,subCategoryId),
                method: apiList.deleteSubCategory.method,
            })
        })
    })
})

export const { useGetCategoryQuery,useUpdateCategoryStatusMutation, useUpdateSubCategoryStatusMutation,
    useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, 
    useDeleteSubCategoryMutation } = categoryServicesApi;