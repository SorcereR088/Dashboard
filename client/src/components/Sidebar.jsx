import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material"
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    PublicOutlined,
    PointOfSaleOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    ReceiptLongOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    Settings
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from '../assets/profile.jpeg'

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Property",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Users",
        icon: <Groups2Outlined/>
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined/>
    },
    {
        text: "Daily",
        icon: <TodayOutlined/>
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined/>
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined/>
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    },
]

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])
    
    
  return <Box component= 'nav'>
    {isSidebarOpen && (
        <Drawer 
            open = {isSidebarOpen}
            onClose = {() => setIsSidebarOpen(false)}
            variant = "persistent"
            anchor = "left"
            sx ={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    color: theme.palette.background.alt,
                    boxSizing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth
                }
            }}>
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color = {theme.palette.secondary.main}>
                            <Box display= "flex" alignItems= "center" gap ="0.5rem">
                                <Typography variant='h4' fontWeight="bold">
                                    Staynest
                                </Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({text, icon}) => {
                            if(!icon){
                                return(
                                    <Typography key={text} sx={{m: "2.25rem 0 1rem 3rem", color: "white"}}>
                                        {text}
                                    </Typography>
                                )
                            }
                            const lcText = text.toLowerCase();
                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton onClick={()=> {
                                        navigate (`/${lcText}`);
                                        setActive(lcText);
                                        }}
                                        sx={{
                                            backgroundColor: active === lcText
                                            ? theme.palette.secondary[300]
                                            : "transparent",
                                            color:
                                            active === lcText
                                            ? theme.palette.primary[600]
                                            : theme.palette.secondary[100],
                                        }}
                                        >
                                        <ListItemIcon sx={{ml: "2rem", 
                                            color: active === lcText
                                            ? theme.palette.primary[600]
                                            : theme.palette.secondary[200],
                                        }}>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {active === lcText && (
                                            <ChevronRightOutlined sx ={{ ml : "auto"}} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>

                <Box buttom= "2rem">
                    <Divider />
                    <FlexBetween textTransform= "none" gap= "1rem" m= "1.5rem 2rem 0 3rem">
                        <Box
                        component= "img"
                        alt = "profile"
                        src = {profileImage}
                        height = "40px"
                        width = "40px"
                        borderRadius = "50%"
                        sx = {{ojectFit: "cover"}} />
                            <Box textAlign=  "left">
                            <Typography
                            fontWeight="bold"
                            fontSize="0.9rem"
                            sx={{ color: theme.palette.secondary[100] }}
                                                        >
                             {user[0]?.user_name || 'Guest'}
                             {/* The data returned by your query is an array because the API likely returns an array, even if it contains only one user. If the API is expected to return multiple users, accessing data[0] ensures you are working with the first user in the array. */}
                            </Typography>
                            </Box>
                            <SettingsOutlined sx={{color: theme.palette.secondary[300], fontSize: '25px'}} />
                    </FlexBetween>
                </Box>
        </Drawer>
    )}
  </Box>
}

export default Sidebar
