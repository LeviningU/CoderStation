import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInterviewApi } from "../api/interview";

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        interview: [],
    },
    reducers: {
        setInterview: (state, action) => {
            state.interview = action.payload;
        },
    },
});

const { setInterview } = interviewSlice.actions;

export const getInterviewAsync = createAsyncThunk(
    "type/getInterviewAsync", 
    async (_, thunkApi) => {
        const { data } = await getInterviewApi();
        thunkApi.dispatch(setInterview(data));
    }
);

export default interviewSlice.reducer;