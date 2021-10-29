import { IoPaperPlane, IoImageOutline, IoHappyOutline } from "react-icons/io5";

//mui
import { IconButton } from "@mui/material";

const MessageForm = () => {
  return (
    <div className="bg-white min-h-16 flex items-center px-2 md:px-5 border-t">
      <div className="flex-grow flex items-center space-x-2 md:space-x-3 justify-between">
        <IconButton disableRipple>
          <IoImageOutline className="text-darkGrey md:w-7 md:h-7 w-5 h-5" />
        </IconButton>

        <IconButton disableRipple>
          <IoHappyOutline className="text-darkGrey md:w-7 md:h-7 w-5 h-5" />
        </IconButton>
        <input
          type="text"
          className="bg-lightGreyMid flex-grow focus:outline-none px-4 py-2 rounded-3xl"
          placeholder="Type a message here"
        />
        <IconButton className="bg-mypurple" disableRipple>
          <IoPaperPlane className="text-white w-4 h-4 md:w-5 md:h-5" />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageForm;
