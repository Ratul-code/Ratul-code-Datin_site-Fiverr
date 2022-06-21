import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import CreateProfile from './CreateProfile';

const ProfileModal = () => {
    const {profile} = useAppSelector(state=>state); 
    switch (profile.profileModalState) {
        case "CREATING":
            console.log("creating")
            return (
                <CreateProfile/>
              )
        default:
            return (<></>)
    }
}

export default ProfileModal