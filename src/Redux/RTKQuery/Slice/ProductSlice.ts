import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../../Types/Type'; // Import interface Product từ ProductProps.ts
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu trả về (nếu cần)
type ProductResponse = Product[];

// API_URL có thể được lấy từ biến môi trường (@env)
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
export const productsApi = createApi({
  reducerPath: 'productsApi', // Tên slice
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
      const token = await getData(); // Lấy token từ AsyncStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Thêm token vào header
      }
      return headers;
    }
  }), // URL gốc của API

  endpoints: (builder) => ({
    // Endpoint để lấy tất cả sản phẩm
    getProducts: builder.query<ProductResponse, void>({
      query: () => '/api/products', // Endpoint gọi API lấy danh sách sản phẩm
    }),
    // Bạn có thể thêm các endpoint khác nếu cần
    getProductById: builder.query<Product, number>({
      query: (productId) => `/api/products/${productId}`, // Lấy sản phẩm theo ID
    }),
    // Endpoint thêm sản phẩm (nếu cần)
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: '/api/products',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateQuantityProduct: builder.mutation<Product, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/api/products/${id}/update-quantity`,
        method: 'PUT',
        params: { quantity }, // Chỉ cập nhật số lượng
      }),
    }),
    checkProductQuantity: builder.query<Product, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/api/products/${id}/check-quantity`,
        method: 'GET',
        params: { quantity }, // Gửi quantity làm query param
      }),
    }),
    searchProducts: builder.query<Product[], { keyword?: string; category?: string }>({
      query: ({ keyword, category }) => {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);
        return `/api/products/search?${params.toString()}`;
      },
    }),
  }),
});

// Export các hooks để sử dụng
export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation,useUpdateQuantityProductMutation, useCheckProductQuantityQuery, useLazyGetProductsQuery, useLazySearchProductsQuery } = productsApi;