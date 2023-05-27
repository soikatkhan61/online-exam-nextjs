import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    name: '',
    phone: '',
    collge: '',
    isVerified: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, phone, role } = action.payload;
            state.name = name;
            state.phone = phone;
            state.role = role;
          },
          setName:(state, action) => {
            state.name = state.name
          }
    }
})

export const { updateUser,setName } = userSlice.actions

export default userSlice.reducer