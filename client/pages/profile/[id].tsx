import { useRouter } from 'next/router';
import React from 'react'
import { useAppSelector } from '../../redux/hooks';

const Profile = () => {
    const router = useRouter();
    const {user} = useAppSelector(state=>state);
    const {id} = router.query;
    if(!user.token){
        router.replace("/login");
    }
  return (
    <div>
        Accessable for bronze members userID:{id}
    </div>
  )
}

export default Profile