import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Slice/User'
import cartSlice from '../Slice/Cart';
import { userApi } from '../RTKQuery/Slice/UserSlice'
import { productsApi } from '../RTKQuery/Slice/ProductSlice';
import { cartApi } from '../RTKQuery/Slice/CartSlice';
import { ordersApi } from '../RTKQuery/Slice/OrderSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice, // Thêm cartSlice reducer
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productsApi.middleware)
      .concat(cartApi.middleware) // Thêm middleware cho cartApi
      .concat(ordersApi.middleware)
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch