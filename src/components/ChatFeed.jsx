const ChatFeed = (props) => {
  const { activeChat } = props;

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="p-3">{activeChat}</div>

        <div className="flex-grow overflow-x-hidden overflow-y-auto bg-lightGrey">
          <p>messages</p>
        </div>

        <div className="bg-indigo-600">form</div>
      </div>
    </>
  );
};

export default ChatFeed;
