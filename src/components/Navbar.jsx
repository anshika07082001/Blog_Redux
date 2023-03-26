import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../reducer/blogSlice";

const Navbar = (props) => {
  const state = useSelector((state) => state.blogSlice);

  let dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.drawerHandler}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BLOGS
          </Typography>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}><Avatar src={state.loginUser.image} sx={{height:25,width:25,border:'1px solid white'}}/>&nbsp;
          <Typography variant="overline"> Welcome, {state.loginUser.firstName}</Typography>
          </Box>
          <Button
            sx={{ color: "white", cursor: "pointer", textDecoration: "none" }}
            onClick={logOutHandler}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
