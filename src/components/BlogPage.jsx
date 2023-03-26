import { Drawer, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blogData,
  fetchBlogs,
  fetchUsers,
  login,
  showBlog,
  showBlogs,
  userData,
} from "../reducer/blogSlice";
import BlogModal from "./BlogModal";
import Blogs from "./Blogs";
import Navbar from "./Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.blogSlice);
  let navigate = useNavigate();

  let [drawer, setDrawer] = useState(false);
  let [modal, setModal] = useState(false);

  useEffect(() => {
    let blogsData = localStorage.getItem("BlogsData");
    if (blogsData) {
      dispatch(blogData(JSON.parse(blogsData)));
    } else {
      dispatch(fetchBlogs());
    }
    let usersData = localStorage.getItem("UsersData");
    if (usersData) {
      dispatch(userData(JSON.parse(usersData)));
    } else {
      dispatch(fetchUsers());
    }
  }, []);

  const drawerHandler = () => {
    if (drawer) {
      setDrawer(false);
    } else {
      setDrawer(true);
    }
  };
  const openModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const showUsersBlog=(index,item)=>{
    let arr=[]
    state.blogs.forEach((ele)=>{
      if(ele.userId===item.id){
        arr.push(ele)
      }
    })
    dispatch(showBlogs(arr))
  }

  return (
    <>
      <Navbar drawerHandler={drawerHandler} />
      <Box onClick={drawerHandler}>
        <Drawer open={drawer}>
          {state.users.length > 0 ? (
            state.users.map((item,index) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    margin: "10px",
                    background: "#dddcdc",
                    borderRadius: "5px",
                    padding: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor:'pointer'
                  }}
                  onClick={()=>showUsersBlog(index,item)}
                >
                  <Typography>
                    {item.firstName} {item.lastName}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </Drawer>
      </Box>
      {state.blogs.length > 0 ? <Blogs openModal={openModal} /> : <></>}
      <BlogModal modal={modal} openModal={openModal} />
    </>
  );
};

export default BlogPage;
