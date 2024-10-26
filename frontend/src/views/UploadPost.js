import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UploadPostView.css";

const UploadPostView = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      setErrorMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    fetch("http://localhost:3000/api/posts/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Error uploading post.");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Post uploaded successfully:", data);
        navigate("/feed"); // Redirige al feed tras la subida
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="upload-post-container">
      <form onSubmit={handleSubmit} className="upload-post-form">
        <h2>Upload New Post</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-group">
          <label htmlFor="image">Select Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Write a caption (optional)"
          ></textarea>
        </div>
        <button type="submit">Upload Post</button>
      </form>
    </div>
  );
};

export default UploadPostView;
