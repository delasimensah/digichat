import { ChatEngine } from "react-chat-engine";

//components
import ChatList from "../components/ChatList";
import ChatFeed from "../components/ChatFeed";

const Chat = () => {
  return (
    <ChatEngine
      height="100vh"
      projectID={process.env.REACT_APP_PROJECT_ID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
      renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
    />
  );
};

export default Chat;
