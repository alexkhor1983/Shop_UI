import React from "react";
import "./topbar.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useNavigate} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Topbar() {
  const Navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateProfile = () => {
    Navigate('/Profile');
  };

  const navigateLogout = () => {
    Navigate('/Logout');
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">HolaAdmin</span>
        </div>
        <div className="topRight">

          <div className="topbarIconContainer">

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                getContentAnchorEl={null}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={navigateProfile}>
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small"/>
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={navigateLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

          </div>
          <Avatar src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" className="topAvatar" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}
