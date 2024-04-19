import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./students/studentSlice";

const store = configureStore({
    reducer: {
        student: studentReducer,
    }
})

export default store;