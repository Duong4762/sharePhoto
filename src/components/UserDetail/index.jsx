import React from "react";
import { Typography, Card, CardContent, Stack, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="h6">User not found.</Typography>;
  }

  return (
    <div className="user-detail-container">
      <Card className="user-card">
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            User Details
          </Typography>

          <Stack spacing={3} sx={{ mt: 3 }}>
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">
                {user.first_name} {user.last_name}
              </span>
            </div>

            <div className="info-row">
              <span className="label">Occupation:</span>
              <span className="value">{user.occupation}</span>
            </div>

            <div className="info-row">
              <span className="label">Location:</span>
              <span className="value">{user.location}</span>
            </div>

            <div className="info-row">
              <span className="label">Description:</span>
              <span className="value">"{user.description}"</span>
            </div>
          </Stack>
        </CardContent>
      </Card>
      <div className="button-wrapper">
        <Link to={`/photos/${userId}`}>
          <Button variant="contained" color="primary" size="large">
            View {user.first_name}'s Photos
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetail;
