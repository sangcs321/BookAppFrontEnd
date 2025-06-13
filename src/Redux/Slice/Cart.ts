import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from '../RTKQuery/Slice/CartSlice'; // Import cartApi để đồng bộ với RTK Query

interface Image {
  id: number;
  url: string;
  publicId: string;
}

interface ProductImage {
  id: number;
  image: Image;
}

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  quantity: number;
  images: ProductImage[];
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
interface CartState {
  cartItems: CartItem[];
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  } as CartState,
  // `createSlice` will infer the state type from the `initialState` argument
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addCartItem: (state, action) => {
      const newItem: CartItem = action.payload;
      if (!newItem.product?.id) {
        console.error('Product ID is undefined in newItem:', newItem);
        return state;
      }
      const existingItem = state.cartItems.find(
        (item) => item.product.id === newItem.product.id
      );
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng quantity
        existingItem.quantity += 1;
      } else {
        // Nếu không, thêm mới
        state.cartItems.push(newItem);
        
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    // Đồng bộ với RTK Query
    builder
      // getCartItems
      .addMatcher(cartApi.endpoints.getCartItems.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(cartApi.endpoints.getCartItems.matchFulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addMatcher(cartApi.endpoints.getCartItems.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart items';
      })
      // addCartItem
      .addMatcher(cartApi.endpoints.addCartItem.matchFulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.cartItems.find(
          (item) => item.product.id === newItem.product.id
        );
        if (existingItem) {
          if (existingItem.product.quantity > (existingItem.quantity + 1) ){
            existingItem.quantity += 1;
          }
        } else {
          state.cartItems.push({
            id: newItem.id,
            quantity: newItem.quantity,
            product: newItem.product as Product, // Cần điều chỉnh dựa trên dữ liệu thực tế
          });
        }
      })
      // updateCartItemQuantity
      .addMatcher(cartApi.endpoints.updateCartItemQuantity.matchFulfilled, (state, action) => {
        const updatedItem = action.payload;
        const item = state.cartItems.find((item) => item.id === updatedItem.id);
        if (item) {
          console.log('Found item to update:', item);
          item.quantity = updatedItem.quantity;
        } else {
          console.log('Item not found in state:', updatedItem.id);
        }
      })
      // deleteCartItem
      .addMatcher(cartApi.endpoints.deleteCartItem.matchFulfilled, (state, action) => {
        const id = action.meta.arg.originalArgs; // Lấy id từ argument của mutation
        const itemIndex = state.cartItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          state.cartItems.splice(itemIndex, 1);
        }
      });
  },
});

export const { setCartItems, addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;