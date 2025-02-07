import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StaffModel} from "../models/StaffModel";

const initialState:StaffModel[]=[];

const StaffSlice=createSlice({
    name: "staff",
    initialState,
    reducers:{
        addStaff:(state,action:PayloadAction<StaffModel>)=>{
            state.push(action.payload);
        },
        deleteStaff: (state, action) => {
            return state.filter(staff => staff.id !== action.payload);
        },
        updateStaff: (state, action) => {
            const index = state.findIndex(staff => staff.id === action.payload.staffId);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
})

export const {addStaff,deleteStaff,updateStaff } = StaffSlice.actions;
export default StaffSlice.reducer
