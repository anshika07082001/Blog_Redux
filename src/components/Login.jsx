import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducer/blogSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  let [open, setOpen] = useState({ snackOpen: false, severity: "", msg: "" });
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let location = useLocation();
  const state = useSelector((state) => state.blogSlice);

  const handleClose = () => {
    if (open.snackOpen) {
      open.snackOpen = false;
    } else {
      open.snackOpen = true;
    }
    setOpen({ ...open });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const config = { "Content-Type": "application/json" };
    try {
      const result = await axios.post(
        "https://dummyjson.com/auth/login",
        obj,
        config
      );
      console.log(result.data);
      open.msg = "Successfully Login!!";
      open.severity = "success";
      handleClose();
      setTimeout(() => navigate("/"), 3000);
      dispatch(login(result.data));
    } catch (error) {
      open.msg = error.response.data.message;
      open.severity = "error";
      handleClose();
    }
    setOpen({ ...open });
  };

  if (Object.keys(state.loginUser).length > 0)
    return <Navigate to="/" state={{ from: location }} replace />;
  else
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open.snackOpen}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={open.severity}
              sx={{ width: "100%" }}
            >
              {open.msg}
            </Alert>
          </Snackbar>

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    );
};

export default Login;
