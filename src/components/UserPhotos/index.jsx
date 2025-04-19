import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos) {
    return <Typography variant="h6">No Data</Typography>;
  }
  return (
    <div className="user-photos-container">
      {photos.map((photo) => {
        return (
          <Card key={photo._id} className="card-photo">
            <CardMedia
              component="img"
              height="300"
              image={`/images/${photo.file_name}`}
              alt="User uploaded"
            />
            <Typography
              variant="caption"
              color="text.secondary"
              className="typography-upload-time"
            >
              Uploaded at: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                {photo.comments ? (
                  photo.comments.map((comment) => (
                    <div key={comment._id}>
                      <Typography variant="subtitle2">
                        {comment.user.first_name} {comment.user.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {comment.comment}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.5 }}
                      >
                        Commented at:{" "}
                        {new Date(comment.date_time).toLocaleString()}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No comments yet.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default UserPhotos;
