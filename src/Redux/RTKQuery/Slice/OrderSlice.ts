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
export const ordersApi = createApi({
    reducerPath: 'orderApi', // The name of your slice
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
        addOrder: builder.mutation({
            query: (products) => ({
                url: '/api/orders', // Endpoint to add order
                method: 'POST',
                body: products,
            }),
        }),
        getOrdersByStatus: builder.query({
            query: ({ status, userId }) => ({
                url: `/get-orders/${status}/${userId}`, // Dynamic endpoint to fetch orders by status
                method: 'GET',
            }),
        }),
        getAllOrder: builder.query({
            query: () => '/api/orders', // Endpoint to get all orders
        }),
        updateStatusOrder: builder.mutation({
            query: ({ id, state }) => ({
                url: `/api/orders/${id}/state`,
                method: 'PUT',
                params: { state: state },
            })
        }),
        filterOrder: builder.query({
            query: ({ orderCode, createdDate, sortDate }) => ({
                url: '/orders/filter',
                params: {
                    orderCode: orderCode,
                    createdDate: createdDate,
                    sortDate: sortDate
                },
                method: 'GET',
            }),
        }),
        deleteOrder: builder.mutation({
            query: ({ orderId }) => ({
                url: `/order/${orderId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetOrdersByStatusQuery, useAddOrderMutation, useGetAllOrderQuery, useUpdateStatusOrderMutation, useFilterOrderQuery, useLazyFilterOrderQuery, useDeleteOrderMutation } = ordersApi;