import { ActionReducerMapBuilder,createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axios";
interface userSliceStateType{
    token:string,
    plan:string,
}
const initialState:userSliceStateType = {
    token:"",
    plan:""
}


export const fetchUserPlan = createAsyncThunk("measure",async (token:string)=>{
    const {data} = await instance.get("/user/getPlan",{
        headers:{
            Authorization:token
        }
    });
    return data.plan
});

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
    },
    extraReducers:(builder:ActionReducerMapBuilder<userSliceStateType>)=>{
        builder
        .addCase(fetchUserPlan.fulfilled ,(state,action)=>{
            state.plan = action.payload
        })
    }
})

export const {getAccessToken,logout} = userSlice.actions
export default userSlice.reducer;