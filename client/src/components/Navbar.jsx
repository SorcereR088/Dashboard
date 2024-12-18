import React, {useState} from "react";
import {LightModeOutlined,DarkModeOutlined,Menu as MenuIcon,Search,SettingsOutlined,ArrowDropDownOutlined,} from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, InputBase, useTheme , Button, Box, Typography, Menu, MenuItem} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import profileImage from "../assets/profile.jpeg";

  const Navbar = ({user, isSidebarOpen, setIsSidebarOpen}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>


        <FlexBetween>
          <Button onClick={handleClick} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem"}}>
                      <Box
                        component= "img"
                        alt = "profile"
                        src = {profileImage}
                        height = "32px"
                        width = "32px"
                        borderRadius = "50%"
                        sx = {{ojectFit: "cover"}} />

                        <Box textAlign=  "left">
                        <Typography
                        fontWeight="bold"
                        fontSize="0.9rem"
                        sx={{ color: theme.palette.secondary[100] }}>
                        {user[0]?.user_name || 'Guest'} {/* Access the first element in the array */}
                        </Typography>

                                <Typography
                                fontSize = "0.8rem"
                                sx = {{color: theme.palette.secondary[100]}}>
                                    {user[0]?.user_email  || ''}
                                </Typography>
                                </Box>

                                <ArrowDropDownOutlined sx={{color: theme.palette.secondary[300], fontSize: "25px"}} />
                            
          </Button>
          <Menu anchorEL = {anchorEl} open={isOpen} onClose={handleClose} anchorOrigin = {{vertical: "buttom", horizontal: "center"}}>
            <MenuItem onClick={handleClose}>Log out</MenuItem>
          </Menu>
          </FlexBetween>
        </FlexBetween>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
