import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {ErrorLogState} from "../../../interfaces/errorLogs.interface";

const initialState: ErrorLogState= {
    showBodyModal: false,
    selectedItemForBody: null,
};

const errorLogSlice = createSlice({
    name:'errorLogs',
    initialState,
    reducers:{
        setShowBodyModal:(state,action:PayloadAction<boolean>) =>{
            state.showBodyModal = action.payload;
        },
        setSelectedItemForBody:(state,action:PayloadAction<any>) =>{
            state.selectedItemForBody = action.payload;
        },
    }
})

export const {setShowBodyModal,setSelectedItemForBody} = errorLogSlice.actions;

export default errorLogSlice.reducer;
