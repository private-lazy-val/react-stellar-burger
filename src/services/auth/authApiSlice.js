import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: 'auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: token => ({
                url: 'auth/logout',
                method: 'POST',
                body: { ...token }
            })
        })
    })
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApiSlice;