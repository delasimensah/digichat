//components
import ListHeader from "./ListHeader";
import ChatCard from "./ChatCard";
import CreateChat from "./CreateChat";

const ChatList = (props) => {
  const { activeChat, setActiveChat, chats, connecting, userName } = props;

  return (
    <div className="flex flex-col h-full bg-lightGreyMid">
      <ListHeader />

      <div className="flex justify-between p-3 ">
        <h1 className="text-2xl font-medium text-darkGrey">Chats</h1>

        <CreateChat {...props} />
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
                    <>
                      {chat && (
                        <ChatCard
                          key={chat.id}
                          chat={chat}
                          username={userName}
                          activeChat={activeChat}
                          setActiveChat={setActiveChat}
                        />
                      )}
                    </>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
