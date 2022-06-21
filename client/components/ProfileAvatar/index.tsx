import React from 'react'
import { Avatar, IconButton, Menu,MenuItem, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
const ProfileAvatar = () => {
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
  return (
    <>
    <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar sx={{width:"40px",height:"40px"}}  alt="" src="/assets/democard1.jpg" />
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