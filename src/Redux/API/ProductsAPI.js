import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsAPI = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:1337/api"}),
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: ()=> "/products?populate=thumbnail"
        }),
        getProduct: builder.query({
            query: (id)=> `/products/${id}?populate=thumbnail`
        })
    })
})

export const {useGetAllProductsQuery, useGetProductQuery} = productsAPI