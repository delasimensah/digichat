import React from "react";
import parse from "html-react-parser";

const Messages = ({ messages, username, loading }) => {
  return (
    <div className="flex-grow overflow-x-hidden overflow-y-auto bg-lightGrey p-5 md:px-5 md:py-10 space-y-3 flex flex-col">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {messages.map((message, idx) => {
            return (
              <span
                key={idx}
                className={`px-5 py-2 inline-block max-w-xs md:max-w-md lg:max-w-lg ${
                  message.sender.username === username
                    ? "bg-mypurple text-white self-end rounded-tl-3xl rounded-bl-3xl rounded-br-3xl "
                    : "bg-gray-200 self-start rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
                }`}
              >
                {parse(message.text)}
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Messages;
