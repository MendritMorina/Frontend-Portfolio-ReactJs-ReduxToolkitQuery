import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {AppState} from "../../../interfaces/app.interface";

const initialState:AppState = {
  selectedItemIndex: 0,
  showAddEditModal: false,
  selectedItemForEdit: null,
  showDeleteModal:false,
  selectedItemForDelete: null,
  currentModalType: "",
};

const appSlice = createSlice({
  name:'app',
  initialState,
  reducers:{
    setSelectedItemIndex:(state,action:PayloadAction<number>) =>{
      state.selectedItemIndex = action.payload;
    },
    setShowAddEditModal:(state,action:PayloadAction<boolean>) =>{
      state.showAddEditModal = action.payload;
    },
    setSelectedItemForEdit:(state,action:PayloadAction<any>) =>{
      state.selectedItemForEdit = action.payload;
    },
    setShowDeleteModal:(state,action:PayloadAction<boolean>) =>{
      state.showDeleteModal = action.payload;
    },
    setSelectedItemForDelete:(state,action:PayloadAction<any>) =>{
      state.selectedItemForDelete = action.payload;
    },
    setCurrentModalType:(state,action:PayloadAction<string>) =>{
      state.currentModalType = action.payload;
    },
  }
})

export const {setSelectedItemIndex,setShowAddEditModal,setSelectedItemForEdit,setShowDeleteModal,setSelectedItemForDelete,setCurrentModalType} = appSlice.actions;

export default appSlice.reducer;
