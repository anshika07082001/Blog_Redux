import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addLikes, delBlog, edit, showBlog } from "../reducer/blogSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Blogs = (props) => {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.blogSlice);

  const showBlogData = (index) => {
    dispatch(showBlog(index));
    props.openModal();
  };

  const likesHandler=(index,e)=>{
    e.stopPropagation()
    dispatch(addLikes(index))
  }

  const deleteBlog=(e,index)=>{
    e.stopPropagation()
    dispatch(delBlog(index))
  }

  
  const editBlog = (e,index) => {
    e.stopPropagation()
    dispatch(edit(index))
    props.openModal()
  };

  return (
    <Grid
      container
      sx={{
        padding: "90px 20px 20px 20px",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {state.blogs.map((item, index) => {
        return (
          <Grid
            sm={3}
            md={2}
            key={index}
            sx={{
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              padding: "5px",
              background: "#faf8f8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "2px",
              cursor: "pointer",
            }}
            onClick={() => showBlogData(index)}
          >
            <Typography variant="caption">{item.title}</Typography>
            <img
              src="https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              alt=""
              style={{ height: "50%", width: "80%" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.reactions} Likes :
              <IconButton onClick={(e)=>likesHandler(index,e)}>
                <ThumbUpIcon
                  fontSize="small"
                  sx={
                    item.reactions > 0
                      ? { color: "#2b9ce2" }
                      : { color: "grey" }
                  }
                />
              </IconButton>
            </Box>
            {state.loginUser.id === item.userId ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Edit Blog">
                <IconButton onClick={(e) => editBlog(e,index)}>
                  <EditIcon sx={{ color: "blue" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Blog">
                <IconButton onClick={(e)=>deleteBlog(e,index)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <></>
          )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Blogs;
