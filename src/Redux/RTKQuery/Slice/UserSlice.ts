import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL; 
export const userApi = createApi({
  reducerPath: 'userApi', // Tên slice cho user
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }), // URL gốc của API
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `/update-profile/${userId}`, 
        method: 'PUT',
        body: profileData, 
      })
    }),
    editUserAdmin: builder.mutation({
      query: ({userNew}) => ({
        url: `/edit-user-role`, 
        method: 'POST',
        body: userNew, 
      })
    }),
    blockUserAdmin: builder.mutation({
      query: ({userBlock}) => ({
        url: `/block-user`, 
        method: 'POST',
        body: userBlock, 
      })
    }),
    changePassword: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/change-password/${userId}`, 
        method: 'PUT',
        body: data, 
      })
    }),
      getUserById: builder.query({
        query: (userId) => ({
          url: `/get-user-id/${userId}`,
          method: 'GET',
        }),
      }),
      getUsers: builder.query({
        query: () => '/users', // Endpoint gọi API lấy danh sách users
      }),
      addUser: builder.mutation({// Endpoint gọi API thêm account
        query: (newUser) => ({
          url: '/add-user',
          method: 'POST',
          body: newUser,
        }),
      }),
    }),
  })

export const { useUpdateUserProfileMutation, useEditUserAdminMutation, useBlockUserAdminMutation, useGetUserByIdQuery, useGetUsersQuery, useAddUserMutation, useChangePasswordMutation} = userApi; // Export hook để gọi mutation