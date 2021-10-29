import { useState } from "react";
import axios from "axios";

//mui
import { TextField, Button } from "@mui/material";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await axios.put(
        "https://api.chatengine.io/users/",
        { username, secret: password },
        { headers: { "Private-Key": process.env.REACT_APP_PRIVATE_KEY } }
      );

      setLoading(false);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.pathname = "/";
    } catch (err) {
      setLoading(false);
      setError("Oops, incorrect credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-lightGreyMid">
      <div className="w-5/6 p-5 bg-white shadow-lg rounded-2xl lg:p-10 md:w-96">
        <form className="flex flex-col items-center space-y-4">
          <TextField
            label="Username"
            variant="standard"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            color="primary"
          />

          <TextField
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            color="primary"
          />

          {error && <div className="text-red-500">{error}</div>}

          <Button
            variant="contained"
            className="inline-block mt-5 capitalize shadow-none bg-mypurple"
            onClick={handleSubmit}
            loading={loading}
            disabled={username === "" || password === ""}
          >
            {loading ? "Loading..." : "Login/SignUp"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
