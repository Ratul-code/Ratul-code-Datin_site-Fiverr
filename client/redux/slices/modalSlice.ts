import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface modalSliceStateType{
    isOpen:boolean,
    message?:string
}
const initialState:modalSliceStateType = {
    isOpen:false,
    message:""
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        setIsOpen(state,action:PayloadAction<boolean>){
            state.isOpen = action.payload
        },
        setMessage(state,action:PayloadAction<string>){
            state.message = action.payload
        }
    }
})

export const {setIsOpen,setMessage} = modalSlice.actions
export default modalSlice.reducer;