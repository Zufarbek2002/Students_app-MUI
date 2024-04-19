import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    studentData: [],
    error: "",
}

export const fetchData = createAsyncThunk("student/fetchData", async () => {
    try {
        const res = await axios.get("http://localhost:3000/students")
        const data = res.data
        return data;
    } catch (error) {
        return error.message
    }
})

export const addData = createAsyncThunk("student/addData", async (student) => {
    try {
        const res = await axios.post("http://localhost:3000/students", student)
        const data = res.data
        return data;
    } catch (error) {
        return error.message
    }
})

const studentSlice = createSlice({
    name: "student",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.studentData = action.payload
            state.error = ""
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.studentData = []
            state.error = action.payload
        })
        // Add student
        builder.addCase(addData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addData.fulfilled, (state, action) => {
            state.loading = false
            state.studentData = [...state.studentData, action.payload]
            state.error = ""
        })
        builder.addCase(addData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const studentReducer = studentSlice.reducer;
export const studentAction = studentSlice.actions;