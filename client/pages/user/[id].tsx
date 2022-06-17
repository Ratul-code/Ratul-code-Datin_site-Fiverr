import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserPlan } from '../../redux/slices/userSlice';

const Profile = () => {
    const router = useRouter();
    const {user} = useAppSelector(state=>state);
    const {id} = router.query;
    const dispatch = useAppDispatch();
    // if(!user.token){
    //     router.replace("/login");
    // }
    useEffect(()=>{
      dispatch(fetchUserPlan(user.token));
    })
    console.log(user.token);
  return (
    <div>
        Accessable for bronze members userID:{id}
        <h1>{user.plan}</h1>
    </div>
  )
}

export default Profile