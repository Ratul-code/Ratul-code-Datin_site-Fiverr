import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../utils/axios";
interface profileSliceStateType{
    profilesStatus:"IDLE"|"LOADING",
    profile?:any,
    myProfile:boolean,
    profileModalState:"CREATING"|"UPDATING"|"WARNING"|"LIKEDUSER"
}

interface fetchProfileTypes{
    token:string,
    userId:string | string[] | undefined,
}


export const fetchProfile = createAsyncThunk("profile",async ({token,userId}:fetchProfileTypes)=>{
        const {data} = await instance.get(`/profile/getProfile/${userId}`,{
            headers:{
                Authorization:token
            }
        });
        console.log(data.response);
        return data      
});


const initialState:profileSliceStateType = {
    profilesStatus:"IDLE",
    myProfile:false,
    profileModalState:"WARNING"
}


const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setProfileModalState(state,action:PayloadAction<"CREATING"|"UPDATING"|"WARNING"|"LIKEDUSER">){
            state.profileModalState = action.payload
        }
    },
    extraReducers:(builder:ActionReducerMapBuilder<profileSliceStateType>)=>{
        builder
        .addCase(fetchProfile.pending,(state)=>{
            state.profilesStatus="LOADING"
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.profilesStatus="IDLE"
            state.myProfile = action.payload.myProfile
            state.profile = action.payload.profile
        })
        .addCase(fetchProfile.rejected,(state,action)=>{
            state.profilesStatus="IDLE"
        });
    }
})
export const {setProfileModalState} = profileSlice.actions
export default profileSlice.reducer;