import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "./styles.css";

function TopBar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  // const userId = pathParts[pathParts.length - 1];

  // const user = userId ? models.userModel(userId) : null;
  // let context = "";

  // if (location.pathname.startsWith("/photos/") && user) {
  //   context = `Photos of ${user.first_name} ${user.last_name}`;
  // } else if (location.pathname.startsWith("/users/") && user) {
  //   context = `${user.first_name} ${user.last_name}`;
  // }

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login")
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {user ? (<>
          <Typography variant="h6" color="inherit">
            Hi, {user.firstName}
          </Typography>
          <button onClick={logOut}>Logout</button></>
        ) : (
          <Typography variant="h6" color="inherit">
            Please login
          </Typography>
        )}
        {/* {context && (
          <Typography variant="h6" color="inherit">
            {context}
          </Typography>
        )} */}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
