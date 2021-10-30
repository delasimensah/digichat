import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { getOrCreateChat } from "react-chat-engine";

//mui
import {
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const CreateChat = (props) => {
  const { creds } = props;

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [creating, setCreating] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      await getOrCreateChat(
        creds,
        {
          is_direct_chat: true,
          usernames: [username],
        },
        () => {
          setCreating(false);
          setUsername("");
          handleClose();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton className="p-0 hover:bg-transparent" onClick={handleOpen}>
        <IoAddCircle className="w-7 h-7 text-mypurple" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="p-10">
          <TextField
            label="Username"
            variant="standard"
            placeholder="delasi"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            color="primary"
          />

          <Button
            variant="contained"
            className="mt-5 capitalize shadow-none bg-mypurple"
            fullWidth
            onClick={handleCreate}
          >
            {creating ? "Creating..." : "New Chat"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChat;
