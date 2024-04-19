import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    teacherData: [],
    error: "",
}

export const fetchData = createAsyncThunk("teacher/fetchData", async () => {
    try {
        const res = await axios.get("http://localhost:3000/teachers")
        const data = await res.data
        return data;
    } catch (error) {
        return error.message
    }
})

export const addData = createAsyncThunk("teacher/addData", async (teacher) => {
    try {
        const res = await axios.post("http://localhost:3000/teachers", teacher)
        const data = await res.data
        return data;
    } catch (error) {
        return error.message
    }
})

export const editData = createAsyncThunk("teacher/editData", async (teacher) => {
    try {
        const res = await axios.put(`http://localhost:3000/teachers/${teacher.id}`, teacher)
        const data = await res.data
        return data;
    } catch (error) {
        return error.message
    }
})

export const deleteData = createAsyncThunk("teacher/deleteData", async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/teachers/${id}`)
        const data = await res.data
        return data;
    } catch (error) {
        return error.message
    }
})

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = action.payload
            state.error = ""
        })
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false
            state.teacherData = []
            state.error = action.payload
        })

        // Add teacher
        builder.addCase(addData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addData.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = [...state.teacherData, action.payload]
            state.error = ""
        })
        builder.addCase(addData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // Edit teacher
        builder.addCase(editData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editData.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = state.teacherData.map(data => data.id == action.payload.id ? action.payload : data)
            state.error = ""
        })
        builder.addCase(editData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // Delete teacher
        builder.addCase(deleteData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteData.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = state.teacherData.filter(data => data.id !== action.payload.id)
            state.error = ""
        })
        builder.addCase(deleteData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const teacherReducer = teacherSlice.reducer;
export const teacherAction = teacherSlice.actions;