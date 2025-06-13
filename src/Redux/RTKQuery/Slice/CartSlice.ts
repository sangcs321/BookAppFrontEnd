import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItemDTO } from '../../../Types/Type'; // Import interface CartItem và CartItemDTO
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu trả về
type CartResponse = CartItemDTO[];
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: ProductImage[];
}
interface Image {
  id: number;
  url: string;
  publicId: string;
}

interface ProductImage {
  id: number;
  image: Image;
}
interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
// API_URL lấy từ biến môi trường
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
export const cartApi = createApi({
    reducerPath: 'cartApi', // Tên slice
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
        // Endpoint để lấy tất cả items trong giỏ hàng
        getCartItems: builder.query<CartResponse, void>({
            query: (userId) => `/api/cart/user/${userId}`,
        }),
        // Endpoint để thêm sản phẩm vào giỏ hàng
        addCartItem: builder.mutation<CartItem, CartItem>({
            query: (newCartItem) => ({
                url: '/api/cart',
                method: 'POST',
                body: newCartItem,
            }),
        }),
        // Endpoint để cập nhật số lượng của một item trong giỏ hàng
        updateCartItemQuantity: builder.mutation<CartItemDTO, { id: number; quantity: number }>({
            query: ({ id, quantity }) => ({
                url: `/api/cart/${id}/${quantity}`,
                method: 'PUT',
            }),
        }),
        // Endpoint để xóa một item khỏi giỏ hàng
        deleteCartItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/cart/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export các hooks để sử dụng
export const {
    useGetCartItemsQuery,
    useAddCartItemMutation,
    useUpdateCartItemQuantityMutation,
    useDeleteCartItemMutation
} = cartApi;