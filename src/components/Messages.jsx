import React from "react";
import parse from "html-react-parser";

//mui
import { CircularProgress } from "@mui/material";

const Messages = ({ messages, username, loading }) => {
  return (
    <div className="flex-grow overflow-x-hidden overflow-y-auto bg-lightGrey p-5 md:px-5 md:py-10 space-y-3 flex flex-col">
      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {messages.map((message, idx) => {
            if (message.attachments && message.attachments.length > 0) {
              return (
                <a
                  href={message.attachments[0].file}
                  className="w-72 h-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={message.attachments[0].file}
                    alt=""
                    className={`w-full bg-gray-300 min-h-24 rounded-md object-cover cursor-pointer ${
                      message.sender.username === username
                        ? "self-end"
                        : "self-start"
                    }`}
                  />
                </a>
              );
            }
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
