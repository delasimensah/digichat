import { useState } from "react";
import { IoPaperPlane, IoImageOutline, IoHappyOutline } from "react-icons/io5";
import Picker from "emoji-picker-react";
import { sendMessage } from "react-chat-engine";

//mui
import { IconButton, Dialog, DialogContent } from "@mui/material";

const MessageForm = (props) => {
  const { chatId, creds } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiSelect = (_, emojiObject) => {
    const { emoji } = emojiObject;

    setMessage(`${message} ${emoji}`);
  };

  const send = (e) => {
    e.preventDefault();

    const text = message.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setMessage("");
  };

  const handleUpload = (e) => {
    sendMessage(creds, chatId, { files: e.target.files, text: "" });
  };

  return (
    <>
      <div className="flex items-center px-2 bg-white border-t min-h-16 md:px-5">
        <div className="flex items-center justify-between flex-grow space-x-2 md:space-x-3">
          <label htmlFor="upload-button">
            <span className="image-button">
              <IoImageOutline className="w-5 h-5 cursor-pointer text-darkGrey md:w-7 md:h-7" />
            </span>
          </label>
          <input
            type="file"
            multiple={false}
            id="upload-button"
            style={{ display: "none" }}
            onChange={(e) => handleUpload(e)}
          />

          <IconButton disableRipple onClick={handleOpen}>
            <IoHappyOutline className="w-5 h-5 text-darkGrey md:w-7 md:h-7" />
          </IconButton>
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-lightGreyMid focus:outline-none rounded-3xl"
            placeholder="Type a message here"
            value={message}
            onChange={handleChange}
          />
          <IconButton className="bg-mypurple" disableRipple onClick={send}>
            <IoPaperPlane className="w-4 h-4 text-white md:w-5 md:h-5" />
          </IconButton>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Picker onEmojiClick={handleEmojiSelect} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageForm;
