import React from "react";
import parse from "html-react-parser";
import moment from "moment";

//mui
import { CircularProgress } from "@mui/material";

const Messages = ({ messages, username, loading }) => {
  return (
    <div className="flex flex-col flex-grow p-5 space-y-3 overflow-x-hidden overflow-y-auto bg-lightGrey md:px-5 md:py-10">
      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          {messages?.map((message, idx) => {
            if (message?.attachments && message?.attachments.length > 0) {
              return (
                <a
                  href={message?.attachments[0].file}
                  className={`h-auto w-72 block  ${
                    message?.sender.username === username
                      ? "self-end"
                      : "self-start"
                  }`}
                  target="_blank"
                  rel="noreferrer"
                  key={idx}
                >
                  <img
                    src={message?.attachments[0].file}
                    alt=""
                    className={`w-full bg-gray-300 min-h-24 rounded-md object-cover cursor-pointer`}
                  />
                </a>
              );
            }

            return (
              <div
                className={`${
                  message?.sender.username === username
                    ? "self-end"
                    : "self-start"
                }`}
                key={idx}
              >
                <span
                  className={`px-5 py-2 block max-w-xs md:max-w-md lg:max-w-lg ${
                    message?.sender.username === username
                      ? "bg-mypurple text-white  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl "
                      : "bg-gray-200 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl"
                  }`}
                >
                  {parse(message?.text)}
                </span>
                <span
                  className={`flex text-xs text-gray-500 mt-1 ${
                    message?.sender.username === username
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {moment(message?.created).format("LT")}
                </span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Messages;
