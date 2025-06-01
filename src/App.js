import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/page/LoginRegister";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const App = (props) => {
  const [user, setUser] = useState();

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} setUser={setUser} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList user={user}/>
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/"
                  element={<PrivateRoute user={user}></PrivateRoute>}
                />
                <Route
                  path="/users/:userId"
                  element={
                    <PrivateRoute user={user}>
                      <UserDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <PrivateRoute user={user}>
                      <UserPhotos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute user={user}>
                      <UserList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/login"
                  element={<LoginRegister setUser={setUser} />}
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
