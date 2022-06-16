import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userSliceStateType{
    token:string
}
const initialState:userSliceStateType = {
    token:""
}
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        getAccessToken(state,action:PayloadAction<string>){
            state.token = action.payload
        },
        logout(state){
            state.token = ""
        }
    }
})

export const {getAccessToken,logout} = userSlice.actions
export default userSlice.reducer;