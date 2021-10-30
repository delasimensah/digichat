import { useEffect, useState } from "react";
import axios from "axios";

//components
import FeedHeader from "./FeedHeader";
import Messages from "./Messages";
import MessageForm from "./MessageForm";

const ChatFeed = (props) => {
  // console.log("feed: ", props);
  const { activeChat, messages, chats, setMessages, connecting, userName } =
    props;
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const [loading, setLoading] = useState(false);

  const chat = chats && chats[activeChat];

  const receipient = chat?.people.find(
    (person) => person.person.username !== userName
  );

  const keys = messages && Object.keys(messages);

  const newMessages = keys?.map((key) => {
    return messages[key];
  });

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        if (!connecting && activeChat) {
          const response = await axios.get(
            `https://api.chatengine.io/chats/${activeChat}/messages/latest/45/`,
            {
              headers: {
                "Project-ID": process.env.REACT_APP_PROJECT_ID,
                "User-Name": username,
                "User-Secret": password,
              },
            }
          );

          setLoading(false);
          setMessages(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [password, username, activeChat, setMessages, connecting]);

  if (!activeChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full overflow-hidden">
        <h1 className="text-xl font-medium">
          Create New Chat or Select Existing Chat
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* header */}
      <FeedHeader receipient={receipient} {...props} />

      {/* messages */}
      <Messages messages={newMessages} loading={loading} username={userName} />

      {/* message form */}
      <MessageForm chatId={activeChat} {...props} />
    </div>
  );
};

export default ChatFeed;
