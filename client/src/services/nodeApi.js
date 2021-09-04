import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

// const baseUrl="https://baccaratapp.herokuapp.com/api/v1";
// const baseUrl="https://api.aidb.vip/api/v1/";

const baseUrl="http://127.0.0.1:3001/api/v1";



export const nodeApi=createApi( {
  reducerPath: "nodeApi",
  baseQuery: fetchBaseQuery( { baseUrl } ),

  tagTypes: [
    'Users'
  ],

  endpoints: ( builder ) => ( {

    //********** Login query
    login: builder.mutation( {
      query: ( body ) => ( {
        url: "/users/login",
        method: "POST",
        body,
      } ),
      // invalidatesTags: [ 'User' ],
    } ),


    //**** Signup query
    signup: builder.mutation( {
      query: ( body ) => ( {
        url: "/users/signup",
        method: "POST",
        body,
      } ),


    } ),

    //******** Get All users
    getAllUsers: builder.query( {
      query: () => ( {
        url: "/users/",
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get( "jwt" )}`,
        },

      } ),
      providesTags: [ "Users" ],
    } ),


    //******** Update Password
    updatePassword: builder.mutation( {
      query: ( body ) => ( {
        url: `/users/password/${body.id}`,
        method: "PATCH",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get( "jwt")}`,
        },
      } ),
      invalidatesTags: [ "Users" ],
    } ),


    //******** Update Duration
    updateDuration: builder.mutation( {
      query: ( body ) => ( {
        url: `/users/duration/${body.id}`,
        method: "PATCH",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get( "jwt" )}`,
        },

      } ),
      invalidatesTags: [ "Users" ],
    } ),

    //******** Update Duration
    getPattern: builder.mutation( {
      query: ( body ) => ( {
        url: `/baccarat/pattern`,
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get( "jwt")}`,
        },

      } ),
    } ),

    //******** Delete User
    deleteUser: builder.mutation( {

      query: ( body ) => ( {
        url: `/users/deleteuser/${body.id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${Cookies.get( "jwt" )}`,
        },

      } ),

      invalidatesTags: [ "Users" ],
    } ),

    //******** Logout User
    logoutUser: builder.mutation( {

      query: ( body ) => ( {
        url: `/users/logout`,
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${Cookies.get( "jwt" )}`,
        },

      } ),

      invalidatesTags: [ "Users" ],
    } ),


  } ),


} )

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateDurationMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery, useGetPatternMutation, useDeleteUserMutation, useLogoutUserMutation
}=nodeApi;