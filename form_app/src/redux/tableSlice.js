
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employeesDetails: []
}

const tableSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployeesDetails: (state, action) => {
            state.employeesDetails = action.payload;
        }
    }
})

export const { addEmployeesDetails } = tableSlice.actions;
export default tableSlice.reducer;