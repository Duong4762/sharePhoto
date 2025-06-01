import React, { useEffect, useId, useState } from "react";
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
import fetchModelData from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState();
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState({})

  const handleCommentInputsChange = (photoId, value) => {
    console.log(commentInputs)
    setCommentInputs({...commentInputs, [photoId]: value})
  }

  const handleSendComment =async (photoId) => {
    //send to api upload comment with photo_id and reset commentInputs
    console.log("send comment: ", commentInputs[photoId], photoId);
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("token")}`, 'Content-Type': 'application/json' };
    const response = await fetch(`https://dnynpd-8081.csb.app/api/photo/commentsOfPhoto/${photoId}`, 
    {headers, method: "post", body: JSON.stringify({comment: commentInputs[photoId]})});
    const message = await response.json();
    console.log(message)
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const photos = await fetchModelData(`/api/photo/photosOfUser/${userId}`);
        setPhotos(photos);
      } catch (error) {
        console.log(error); 
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId])

  if(loading){
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!photos&&!loading) {
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
              <div className="comment-box">
                <textarea placeholder="Comment"
                          value = {commentInputs.photo_id}
                          onChange={(e) => handleCommentInputsChange(photo._id, e.target.value)}>
                </textarea>
                <button onClick={()=>handleSendComment(photo._id)}>Send</button>
              </div>
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
