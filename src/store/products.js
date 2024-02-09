import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const productsSlice = createApi({
    reducerPath : 'products',
    tagTypes:['products'],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000/"}),
    endpoints:(build)=>({
         getProducts:build.query({
            query:(filter)=>`products?${filter.category !== 'All'? `category=${filter.category}`:''}`,
            providesTags:['products']
         }),
         getProduuct:build.query({
            query:(id)=> `products/${id}` ,
            providesTags:['products']
         }),
         addProduct:build.mutation({
            query:(person)=>({
                url:"products",
                method:"POST",
                body:person
            }),
            invalidatesTags:['products']
         }),
         deleteProduct:build.mutation({
            query:(id)=>({
                url:`products/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['products']
         }),
         pathProducts:build.mutation({
            query:({id, ...path})=>({
                url:`products/${id}`,
                method:"PATCH",
                body:path
            })
         }),
         registerUser:build.mutation({
            query:(user)=>({
               url:"register",
               method:"POST",
               body:user
            })
         }),
         loginUser:build.mutation({
            query:(user)=>({
               url:'login',
               method:"POST",
               body:user
            })
         })
    })
})

export const {useGetProductsQuery , 
              useAddProductMutation, 
              useDeleteProductMutation, 
              usePathProductsMutation, 
              useGetProduuctQuery,
              useRegisterUserMutation,
              useLoginUserMutation,
            } = productsSlice