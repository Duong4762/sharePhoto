import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const userId = pathParts[pathParts.length - 1];

  const user = userId ? models.userModel(userId) : null;
  let context = "";

  if (location.pathname.startsWith("/photos/") && user) {
    context = `Photos of ${user.first_name} ${user.last_name}`;
  } else if (location.pathname.startsWith("/users/") && user) {
    context = `${user.first_name} ${user.last_name}`;
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          Nguyễn Tùng Dương
        </Typography>
        {context && (
          <Typography variant="h6" color="inherit">
            {context}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
