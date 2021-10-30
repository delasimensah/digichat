import { ChatEngine } from "react-chat-engine";

//components
import ChatList from "../components/ChatList";
import ChatFeed from "../components/ChatFeed";

const Chat = () => {
  const username = localStorage.getItem("username");
  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.REACT_APP_PROJECT_ID}
      userName={username}
      userSecret={localStorage.getItem("password")}
      renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
      renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
      renderChatSettings={() => {
        return null;
      }}
      onNewMessage={(_, message) => {
        if (message.sender.username !== username) {
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play();
        }
      }}
    />
  );
};

export default Chat;
