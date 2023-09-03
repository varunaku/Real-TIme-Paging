import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define a service using a base URL
//https://redux-toolkit.js.org/rtk-query/api/createApi


//Create a database
const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001",
    }),

    //the 3 endpoints here just being operations. SignupUser when we signing up for example. Mutations only and not Queries, we are not ever only reading. R/W always.
    //create an api to make queries to our database

    endpoints: (builder) => ({
        
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),

        // login (A mutation and not a query because we will be changing something, like status for example)
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // logout

        logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi; //names are created for us automatically

export default appApi;