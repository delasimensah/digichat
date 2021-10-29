import { useState } from "react";

import { IoEllipsisVertical } from "react-icons/io5";

//mui
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";

const FeedHeader = ({ receipient }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="px-3 flex items-center justify-between min-h-16 border-b">
      <div className="flex items-center space-x-2">
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
  );
};

export default FeedHeader;
