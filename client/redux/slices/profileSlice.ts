import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../utils/axios";
interface profileSliceStateType{
    profileStatus:"IDLE"|"LOADING",
    profile?:any,
    myProfile:boolean,
    profileModalState:"CREATING"|"UPDATING"|"WARNING"
}

interface fetchProfileTypes{
    token:string,
    userId:string | string[] | undefined,
}


export const fetchProfile = createAsyncThunk("profile",async ({token,userId}:fetchProfileTypes)=>{
        const {data} = await instance.get(`/user/getProfile/${userId}`,{
            headers:{
                Authorization:token
            }
        });
        console.log(data);
        return data      
});


const initialState:profileSliceStateType = {
    profileStatus:"IDLE",
    myProfile:false,
    profileModalState:"WARNING"
}


const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setProfileModalState(state,action:PayloadAction<"CREATING"|"UPDATING"|"WARNING">){
            state.profileModalState = action.payload
        }
    },
    extraReducers:(builder:ActionReducerMapBuilder<profileSliceStateType>)=>{
        builder
        .addCase(fetchProfile.pending,(state)=>{
            state.profileStatus="LOADING"
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.profileStatus="IDLE"
            state.myProfile = action.payload.myProfile
            state.profile = action.payload.profile
        });
    }
})
export const {setProfileModalState} = profileSlice.actions
export default profileSlice.reducer;