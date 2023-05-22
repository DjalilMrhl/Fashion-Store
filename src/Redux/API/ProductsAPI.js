import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsAPI = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({baseUrl: "https://strapi-4yf5.onrender.com/api"}),
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
