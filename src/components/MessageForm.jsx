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

  const handleEmojiSelect = (emojiObject) => {
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
      <div className="bg-white min-h-16 flex items-center px-2 md:px-5 border-t">
        <div className="flex-grow flex items-center space-x-2 md:space-x-3 justify-between">
          <label htmlFor="upload-button">
            <span className="image-button">
              <IoImageOutline className="text-darkGrey md:w-7 md:h-7 w-5 h-5 cursor-pointer" />
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
            <IoHappyOutline className="text-darkGrey md:w-7 md:h-7 w-5 h-5" />
          </IconButton>
          <input
            type="text"
            className="bg-lightGreyMid flex-grow focus:outline-none px-4 py-2 rounded-3xl"
            placeholder="Type a message here"
            value={message}
            onChange={handleChange}
          />
          <IconButton className="bg-mypurple" disableRipple onClick={send}>
            <IoPaperPlane className="text-white w-4 h-4 md:w-5 md:h-5" />
          </IconButton>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Picker onEmojiClick={handleEmojiSelect} native />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageForm;
