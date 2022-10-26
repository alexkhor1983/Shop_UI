import React from "react";
import "./topbar.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useNavigate} from "react-router-dom";
import {Avatar} from "@material-ui/core";

export default function Topbar() {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
              <MenuItem onClick={navigateProfile}>Profile</MenuItem>
              <MenuItem onClick={navigateLogout}>Logout</MenuItem>
            </Menu>
          </div>
          <Avatar src="/broken-image.jpg" className="topAvatar" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}
