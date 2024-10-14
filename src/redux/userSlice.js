import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLogin = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLogin = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setStatus: (state, action) => {
            state.isLogin = action.payload;
        }
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;