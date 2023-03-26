import {
  Avatar,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addComments, getComments, updateBlog } from "../reducer/blogSlice";

const BlogModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    let comments = localStorage.getItem("blogComments");
    if (comments) {
      dispatch(getComments(JSON.parse(comments)));
    }
  }, []);

  const state = useSelector((state) => state.blogSlice);
  let dispatch = useDispatch();
  let commentRef = useRef();
  let [inpState,setInpState]=useState({title:'',content:''})

  useEffect(()=>{
    if(state.editBlog){
      setInpState({title:state.editBlog.title,content:state.editBlog.body})
    }
  },[state.editBlog])

  const commentHandler = (e) => {
    e.preventDefault();
    let obj = {
      id: state.blogDetail.id,
      userName: state.loginUser.firstName + " " + state.loginUser.lastName,
      blogId: state.blogDetail.userId,
      userId: state.loginUser.id,
      comments: commentRef.current.childNodes[0].childNodes[0].value,
      userPic: state.loginUser.image,
    };
    dispatch(addComments(obj));
    e.target.reset();
  };

  const inpHandler=(e,str)=>{
    if(str==='Title'){
      inpState.title=e.target.value;
    }
    else{
      inpState.content=e.target.value;
    }
    setInpState({...inpState})
  }

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateBlog({inpState:inpState,id:state.editBlog.id-1}))
    props.openModal()
  };


  return (
    <Modal open={props.modal}>
      <Box sx={style}>
        <Box sx={{ background: "white", borderRadius: "5px", padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={props.openModal}>
              <Typography variant="h5" sx={{ color: "red" }}>
                X
              </Typography>
            </IconButton>
          </Box>

          {Object.keys(state.editBlog).length>0 ? (
            <form
              onSubmit={(e) => updateHandler(e)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "10px",
              }}
            >
              <Typography variant="h5">Edit Blog</Typography>
              <TextField label="Title" value={inpState.title} onChange={(e)=>inpHandler(e,"Title")}/>
              <TextField label="Content" value={inpState.content}  onChange={(e)=>inpHandler(e,"Content")} />
              <Button type="submit" variant="outlined">Update Blog</Button>
            </form>
          ) : (
            <>
              <Box sx={{ padding: "10px" }}>
                <Typography variant="h6">{state.blogDetail.title}</Typography>
                <Typography variant="caption">
                  {state.blogDetail.body}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h5">Add Comments</Typography>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onSubmit={(e) => commentHandler(e)}
                >
                  <TextField ref={(ref) => (commentRef.current = ref)} />
                  <Button
                    variant="contained"
                    sx={{ padding: "15px" }}
                    type="submit"
                  >
                    Add Comments
                  </Button>
                </form>
              </Box>
              <Typography variant="h5">Comments</Typography>
              <Box sx={{ overflowY: "scroll", height: "100px" }}>
                {state.comments.map((item) => {
                  if (item.id === state.blogDetail.id) {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Avatar src={item.userPic} alt="" />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="overline"
                            sx={{ fontWeight: "700", fontSize: "1rem" }}
                          >
                            {item.userName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "grey" }}>
                            {item.comments}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  }
                })}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default BlogModal;
