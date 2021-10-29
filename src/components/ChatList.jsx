import { useState, useEffect } from "react";
import { IoEllipsisVertical, IoAddCircle } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
import parse from "html-react-parser";

//mui
import { Avatar, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";

const ChatList = (props) => {
  const { activeChat, setActiveChat, chats, connecting, userName } = props;
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
    <div className="flex flex-col h-full bg-lightGreyMid">
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

      <div className="flex justify-between p-3 ">
        <h1 className="text-2xl font-medium text-darkGrey">Chats</h1>

        <IconButton className="p-0 hover:bg-transparent">
          <IoAddCircle className="w-7 h-7 text-mypurple" />
        </IconButton>
      </div>

      <div className="flex-grow overflow-x-hidden overflow-y-auto">
        {connecting && !chats ? (
          <h1>Loading</h1>
        ) : (
          <div className="p-2 space-y-3">
            {chats &&
              Object.keys(chats)
                ?.reverse()
                .map((key) => {
                  const chat = chats[key];

                  console.log("chat: ", chat);
                  const receipient = chat?.people.find(
                    (person) => person.person.username !== userName
                  );

                  return (
                    <div
                      key={chat.id}
                      className={`flex space-x-2 items-center p-3 rounded-lg shadow-lg cursor-pointer hover:bg-darkGreyMid hover:text-white ${
                        activeChat === chat.id
                          ? "bg-darkGreyMid text-white"
                          : "bg-lightGrey"
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <Avatar src={receipient?.person.avatar} />

                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h1 className="text-lg font-medium capitalize">
                            {receipient?.person.username}
                          </h1>

                          <p className="text-xs">
                            {moment(chat.last_message.created).format("LT")}
                          </p>
                        </div>

                        <div className="truncate md:w-28 lg:w-44 xl:w-60">
                          {parse(chat.last_message.text)}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
