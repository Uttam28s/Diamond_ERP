import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiList } from "../helper/apiList";
import { API_URL } from "../Component/const";


export const productServicesApi = createApi({
    reducerPath: 'productServicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageSize, skip,product,category }) => {
                return (
                    {
                        url: `${apiList.getProducts.url(pageSize, skip, product,category)}`,
                        method: `${apiList.getProducts.method}`
                    }
                )
            },
        }),
        AddProduct: builder.mutation({
            query: ({ data }) => ({
                url: apiList.addProduct.url,
                method: apiList.addProduct.method,
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        UpdateProductStatus: builder.mutation({
            query: ({ status, id }) => ({
                url: apiList.updateProductStatus.url(status,id),
                method: apiList.updateProductStatus.method,
                })
        }),
        UpdateProduct : builder.mutation({
            query: ({ data, id }) => ({
                url: apiList.updateProduct.url(id),
                method: apiList.updateProduct.method,
                body: data,
            })
        }),
        DeleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: apiList.removeProduct.url(id),
                method: apiList.removeProduct.method,
            })
        }),
    })
})

export const { useAddProductMutation, useUpdateProductStatusMutation,useUpdateProductMutation, useGetProductsQuery, useDeleteProductMutation } = productServicesApi;