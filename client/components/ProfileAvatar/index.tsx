import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, Menu,MenuItem, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
import instance from '../../utils/axios';
const ProfileAvatar = () => {
  const [imgUrl,setImgUrl] = useState<string>("")
  const router = useRouter();
  const {user} = useAppSelector(state=>state);
  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const fetchImgUrl = async()=>{
    await instance.get(`/profile/getProfileImage/${user.user.id}`,{
        headers:{
            Authorization:user.token
        }
    }).then(res=>setImgUrl(res.data))
}
useEffect(()=>{
    fetchImgUrl();
},[])
  return (
    <>
    <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {imgUrl?<Avatar sx={{width:"40px",height:"40px"}}  alt="" src={`https://ave-dating-site.herokuapp.com/images/${imgUrl}`} />:<Avatar sx={{width:"40px",height:"40px"}}  alt="" src="/assets/blankcard.jpg" />}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px'  }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
            <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{"Dashboard"}</Typography>
            </MenuItem>
            <MenuItem  onClick={()=>{
              setAnchorElUser(null);
              router.replace(`/user/${user.user.id}`)
            }}>
              <Typography textAlign="center">{"Profile"}</Typography>
            </MenuItem>
            <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{"Account"}</Typography>
            </MenuItem>
            <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{"Settings"}</Typography>
            </MenuItem>
            <MenuItem  onClick={()=>{
              dispatch(logout());
              router.replace("/login")
            }}>
              <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
        </Menu>
        </>
  )
}

export default ProfileAvatar