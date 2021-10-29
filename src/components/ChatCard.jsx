import moment from "moment";
import parse from "html-react-parser";

//mui
import { Avatar } from "@mui/material";

const ChatCard = ({ activeChat, setActiveChat, chat, username }) => {
  const receipient = chat?.people.find(
    (person) => person.person.username !== username
  );

  return (
    <div
      key={chat.id}
      className={`flex space-x-2 items-center p-3 rounded-lg shadow-lg cursor-pointer hover:bg-darkGreyMid hover:text-white ${
        activeChat === chat.id ? "bg-darkGreyMid text-white" : "bg-lightGrey"
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
};

export default ChatCard;
