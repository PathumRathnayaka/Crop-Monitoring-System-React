import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StaffModel} from "../models/StaffModel";

const initialState:StaffModel[]=[];

const StaffSlice=createSlice({
    name: "staff",
    initialState,
    reducers:{
        addEmployee:(state,action:PayloadAction<StaffModel>)=>{
            state.push(action.payload);
        },
        deleteEmployee: (state, action) => {
            return state.filter(staff => staff.id !== action.payload);
        },
        updateEmployee: (state, action) => {
            const index = state.findIndex(staff => staff.id === action.payload.staffId);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
})

export const {addEmployee,deleteEmployee,updateEmployee } = StaffSlice.actions;
export default StaffSlice.reducer
