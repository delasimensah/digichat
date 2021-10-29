import { Switch, Route, Redirect } from "react-router-dom";

//pages
import Login from "./pages/Login";
import Chat from "./pages/Chat";

const App = () => {
  const user = localStorage.getItem("username");

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          user ? (
            <Chat />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />

      <Route
        path="/login"
        render={() =>
          user ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            <Login />
          )
        }
      />
    </Switch>
  );
};

export default App;
