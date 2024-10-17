import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypeApi } from "../api/type";

const typeSlice = createSlice({
    name: "type",
    initialState: {
        typeList: []
    },
    reducers: {
        setType: (state, action) => {
            state.typeList = action.payload;
        },
    },
});

const { setType } = typeSlice.actions;

export const getTypeList = createAsyncThunk(
    "type/getTypeList", 
    async (_, thunkApi) => {
        const { data } = await getTypeApi();
        thunkApi.dispatch(setType(data));
    }
);

export default typeSlice.reducer;