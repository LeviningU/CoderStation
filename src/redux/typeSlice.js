import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTypeApi } from "../api/type";

const typeSlice = createSlice({
    name: "type",
    initialState: {
        typeList: [],
        issueType: "all",
        bookType: "all",
    },
    reducers: {
        setType: (state, action) => {
            state.typeList = action.payload;
        },
        setIssueType: (state, action) => {
            state.issueType = action.payload;
        },
        setBookType: (state, action) => {
            state.bookType = action.payload;
        },
    },
});

const { setType } = typeSlice.actions;

export const { setIssueType, setBookType } = typeSlice.actions;

export const getTypeList = createAsyncThunk(
    "type/getTypeList", 
    async (_, thunkApi) => {
        const { data } = await getTypeApi();
        thunkApi.dispatch(setType(data));
    }
);

export default typeSlice.reducer;