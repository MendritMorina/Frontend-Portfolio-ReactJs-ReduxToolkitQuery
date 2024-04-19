import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {ContactState} from "../../../interfaces/contacts.interface";

const initialState: ContactState= {
  showMessageModal: false,
  selectedItemForMessage: null,
  sendEmailData:{
    name: '',
    lastName: '',
    email: '',
    message: ''
  }
};

const contactSlice = createSlice({
  name:'contacts',
  initialState,
  reducers:{
    setShowMessageModal:(state,action:PayloadAction<boolean>) =>{
      state.showMessageModal = action.payload;
    },
    setSelectedItemForMessage:(state,action:PayloadAction<any>) =>{
      state.selectedItemForMessage = action.payload;
    },
    setSendEmailData: (state, action) => {
      state.sendEmailData = {...state.sendEmailData, ...action.payload};
    },
  }
})

export const {setShowMessageModal,setSelectedItemForMessage,setSendEmailData} = contactSlice.actions;

export default contactSlice.reducer;
