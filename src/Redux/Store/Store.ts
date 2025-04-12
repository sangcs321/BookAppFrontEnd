import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Slice/User'
import { userApi } from '../RTKQuery/Slice/UserSlice'

export const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
  })
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch