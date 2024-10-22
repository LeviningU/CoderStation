import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserInfoApi } from '../api/user';

export const updateUserInfoAsync = createAsyncThunk(
    'user/updateUserInfo',
    async (data, thunkAPI) => {
        await updateUserInfoApi(data.userId, data.newInfo);
        thunkAPI.dispatch(updateUser(data.newInfo));
    }
);

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
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        }
    },
});

const {updateUser} = userSlice.actions;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;