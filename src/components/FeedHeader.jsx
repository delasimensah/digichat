import { useState } from "react";

import { IoEllipsisVertical, IoCaretBackOutline } from "react-icons/io5";

//mui
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  SwipeableDrawer,
} from "@mui/material";

//components
import ChatList from "./ChatList";

const FeedHeader = ({ receipient, ...otherProps }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
          <MenuItem>Clear Messages</MenuItem>
          <MenuItem>Delete Chat</MenuItem>
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
    </>
  );
};

export default FeedHeader;
