import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux"
import { mobile } from "../../../responsive";
import {Avatar, Badge} from "@material-ui/core";
import HistoryIcon from '@mui/icons-material/History';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ListItemIcon from "@mui/material/ListItemIcon";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import {getProfileImage} from "../../api/axios";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItemNav = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [login,setLogin]= useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [profileImg,setProfileImg]= useState("")
  let decodedToken = "";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateProfile = () => {
    Navigate('/Profile');
  };

  const logout = () => {
    localStorage.setItem("token","");
    setLogin(false);
    Navigate('/');
  };

  useEffect(() => {
    if(localStorage.getItem("token")) {

      decodedToken = jwt_decode(localStorage.getItem("token"))
      console.log(decodedToken.sub)

      getProfileImage(decodedToken.sub).then(res => {
        console.log(res)
        setProfileImg(res?.profileImg)
        setLogin(true)
      }).catch(() => {
        setLogin(false)
      })
    }else{
      setLogin(false)
    }
  }, [login]);

  return (
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
          </Left>
          <Center>
            <Link to={'/admin'} style={{ textDecoration: 'none' }}>
              <Logo>HolaAdmin</Logo>
            </Link>
          </Center>
          <Right>

            {!login ? (
                    <div>
                      <Link to={'/Register'} style={{ "textDecoration": "none", "float": "right" }}>
                        <MenuItemNav>REGISTER</MenuItemNav>
                      </Link>
                      <Link to={'/Login' } style={{ "textDecoration": "none", "float": "right" }}>
                        <MenuItemNav>SIGN IN</MenuItemNav>
                      </Link>
                    </div>
                )
                :
                (<div className="topbarIconContainer">
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
                        <MenuItem onClick={logout}>
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                      <Avatar src={profileImg} className="topAvatar" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                    </div>
                )}

            <MenuItem>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
  );
};

export default Navbar;
