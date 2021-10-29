import { IoAddCircle } from "react-icons/io5";

//mui
import { IconButton } from "@mui/material";

//components
import ListHeader from "./ListHeader";
import ChatCard from "./ChatCard";

const ChatList = (props) => {
  const { activeChat, setActiveChat, chats, connecting, userName } = props;

  return (
    <div className="flex flex-col h-full bg-lightGreyMid">
      <ListHeader />

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

                  return (
                    <ChatCard
                      key={chat.id}
                      chat={chat}
                      username={userName}
                      activeChat={activeChat}
                      setActiveChat={setActiveChat}
                    />
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
