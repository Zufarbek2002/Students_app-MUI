import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./students/studentSlice";
import { teacherReducer } from "./teachers/teacherSlice";

const store = configureStore({
    reducer: {
        student: studentReducer,
        teacher: teacherReducer
    }
})

export default store;