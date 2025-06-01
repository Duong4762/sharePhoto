import React, { useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./styles.css";
import fetchModelData from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList({ user }) {
  const [users, setUsers] = useState();
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const users = await fetchModelData("/api/user/list");
        setUsers(users);
      };
      fetchData();
    } else {
      setUsers(null);
    }
  }, [user]);
  return (
    <div>
      <List component="nav">
        {users &&
          users.map((item) => (
            <>
              <ListItem>
                <Link to={`/users/${item._id}`} className="user-link">
                  <ListItemText
                    primary={`${item.first_name} ${item.last_name}`}
                  />
                </Link>
              </ListItem>
              <Divider />
            </>
          ))}
      </List>
    </div>
  );
}

export default UserList;
