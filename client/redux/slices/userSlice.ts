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
    try {
        const {data} = await instance.get("/user/getPlan",{
            headers:{
                Authorization:token
            }
        });
        console.log(data);
        if(data){
            return {isAuthenticated:true,plan:data.plan}
        }
        return {isAuthenticated:true,plan:data}
    } catch (error:any) {
        if(error.response.statusText){
            return {isAuthenticated:false,plan:""}
        }
    }

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
            if(action.payload?.isAuthenticated){
                state.plan = action.payload.plan
            }else{
                state.token = ""
            }
        })
    }
})

export const {getAccessToken,logout} = userSlice.actions
export default userSlice.reducer;