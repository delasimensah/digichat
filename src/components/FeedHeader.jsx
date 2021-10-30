import { useState } from "react";
import axios from "axios";

import { IoEllipsisVertical, IoCaretBackOutline } from "react-icons/io5";

//mui
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  SwipeableDrawer,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";

//components
import ChatList from "./ChatList";

const FeedHeader = ({ receipient, ...otherProps }) => {
  const { activeChat, setActiveChat } = otherProps;

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  //menu dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //mobile menu
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  //delete dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteChat = async () => {
    try {
      await axios.delete(`https://api.chatengine.io/chats/${activeChat}/`, {
        headers: {
          "Project-ID": process.env.REACT_APP_PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      });

      setActiveChat(null);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 border-b min-h-16">
        <div className="flex items-center space-x-2">
          <IconButton onClick={toggleDrawer}>
            <IoCaretBackOutline className="w-5 h-5 md:hidden text-darkGrey" />
          </IconButton>
          <Avatar
            src={receipient?.person.avatar}
            alt=""
            className="bg-gray-100 w-9 h-9"
          />
          <div>
            <h1 className="capitalize text-darkGrey">
              {receipient?.person.username}
            </h1>
            <p className="text-xs text-green-400">
              {receipient?.person.is_online ? "online" : ""}
            </p>
          </div>
        </div>

        <IconButton onClick={handleClick}>
          <IoEllipsisVertical className="w-5 h-5" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          classes={{ paper: "shadow-md w-40" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* <MenuItem>Clear Messages</MenuItem> */}
          <MenuItem onClick={handleOpenDialog}>Delete Chat</MenuItem>
        </Menu>
      </div>

      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <div className="h-full w-80">
          <ChatList {...otherProps} />
        </div>
      </SwipeableDrawer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to delete chat?</DialogTitle>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className="capitalize text-darkGrey"
          >
            No
          </Button>
          <Button onClick={deleteChat} className="text-red-500 capitalize">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedHeader;
