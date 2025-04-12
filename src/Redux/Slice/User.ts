import { createSlice } from '@reduxjs/toolkit'



// Define a type for the slice state
interface User {
  id: String,
  name?: String,
  avatar?: String,
  email: String,
  phoneNumber?: String,
  verified: boolean,
  address?: String,
  role: String,
  isBlock:boolean
}

// Define the initial state using that type
const initialState: User = {
 id: '',
 name: "",
 avatar: '',
 role: '',
 phoneNumber: '',
 email:'',
 verified: false,
 address: '',
 isBlock:false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   setUser: (state, action) => {
    state.id = action.payload.id;
    state.name = action.payload.name ;
    state.avatar = action.payload.avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
    state.phoneNumber = action.payload.phoneNumber ||"" ;
    state.email = action.payload.email;
    state.role = action.payload.role;
    state.verified = action.payload.verified;
    state.address = action.payload.address;
   },
   updateProfile: (state, action) => {
    state.name = action.payload.name ;
    state.avatar = action.payload.avatar
    state.address = action.payload.address;
    state.phoneNumber = action.payload.phoneNumber;
   },
   clearUser:(state, action) => {
    state.id = action.payload._id;
    state.name = action.payload.name ;
    state.avatar = action.payload.avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
    state.phoneNumber = action.payload.phoneNumber ||"" ;
    state.email = action.payload.email;
    state.role = action.payload.role;
    state.verified = action.payload.verified;
    state.address = action.payload.address;
   }
    
    
  },
})

export const {setUser, updateProfile} = userSlice.actions

export default userSlice.reducer


