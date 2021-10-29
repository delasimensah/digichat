import { useState, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import axios from "axios";

//mui
import { Avatar, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";

const ListHeader = () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.pathname = "/login";
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://api.chatengine.io/users/me/",
          {
            headers: {
              "Project-ID": process.env.REACT_APP_PROJECT_ID,
              "User-Name": username,
              "User-Secret": password,
            },
          }
        );

        setLoading(false);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [username, password]);

  return (
    <div className="flex items-center justify-between px-3 h-16 bg-white border-b border-r">
      {loading ? (
        <div className="flex items-center space-x-2">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={100} />
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Avatar
            alt={userInfo?.username}
            src={userInfo?.avatar}
            className="bg-gray-100 w-9 h-9"
          />
          <h1 className="text-lg capitalize text-darkGrey">
            {userInfo?.username}
          </h1>
        </div>
      )}

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
        <MenuItem>New Group</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ListHeader;
