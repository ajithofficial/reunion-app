import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import tableSlice from "./tableSlice";
export const store = configureStore({
    reducer: {
        formData: formSlice,
        employees: tableSlice
    }
})