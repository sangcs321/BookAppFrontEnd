import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    if (value !== null) {
      return value;
    }
    console.log('Token is null in AsyncStorage');
    return '';
  } catch (e) {
    console.error('Error fetching token from AsyncStorage:', e);
    return '';
  }
};
export const userApi = createApi({
  reducerPath: 'userApi', // Tên slice cho user
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      const token = await getData(); // Thay bằng logic lấy token (ví dụ: từ AsyncStorage hoặc Redux store)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), // URL gốc của API
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: ({ userId, profileData }) => ({
        url: `/api/users/profile/${userId}`,
        method: 'PUT',
        body: profileData,
      })
    }),
    editUserAdmin: builder.mutation({
      query: ({ userNew }) => ({
        url: `/edit-user-role`,
        method: 'POST',
        body: userNew,
      })
    }),
    blockUserAdmin: builder.mutation({
      query: ({ userBlock }) => ({
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

export const { useUpdateUserProfileMutation, useEditUserAdminMutation, useBlockUserAdminMutation, useGetUserByIdQuery, useGetUsersQuery, useAddUserMutation, useChangePasswordMutation } = userApi; // Export hook để gọi mutation