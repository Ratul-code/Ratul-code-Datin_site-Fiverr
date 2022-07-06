import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import CreateProfile from './CreateProfile';
import LikedUserModal from './LikedUserModal';
import WarningModal from './WarningModal';

const ProfileModal = () => {
    const {profile} = useAppSelector(state=>state); 
    switch (profile.profileModalState) {
        case "CREATING":
            return (
                <CreateProfile/>
              )
        case "WARNING":
            return (
                <WarningModal/>
              )
        case "LIKEDUSER":
            console.log("here")
            return (
                <LikedUserModal/>
              )
        default:
            return (<></>)
    }
}

export default ProfileModal