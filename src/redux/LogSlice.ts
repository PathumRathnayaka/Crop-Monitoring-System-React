import {LogModel} from "../models/LogModel.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState : LogModel[]=[];

const LogSlice=createSlice({
    name: "log",
    initialState,
    reducers:{
        addLog: (state, action: PayloadAction<LogModel>) => {
            state.push(action.payload);
        },
        deleteLog: (state, action) => {
            return state.filter(log => log.logCode !== action.payload);
        },
        updateLog: (state, action) => {
            const index = state.findIndex(log => log.logCode === action.payload.logCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
})

export const {addLog,deleteLog,updateLog } = LogSlice.actions;
export default LogSlice.reducer