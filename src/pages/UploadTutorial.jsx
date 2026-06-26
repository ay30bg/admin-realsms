import React, { useState } from "react";
import {
  FiUpload,
  FiVideo,
  FiImage,
  FiClock,
  FiTag,
} from "react-icons/fi";

import "../styles/uploadTutorial.css";

const UploadTutorial = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "SMS",
    duration: "",
  });

  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleThumbnail = (e) => {
    if (e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...formData,
      video,
      thumbnail,
    });

    alert("Tutorial added");
  };

  return (
    <div className="upload-page">

      <div className="upload-header">
        <h1>Upload Video Tutorial</h1>
        <p>
          Add tutorials that users can watch from the app
        </p>
      </div>

      <form
        className="upload-container"
        onSubmit={handleSubmit}
      >

        <div className="left-panel">

          <div className="input-group">
            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Getting Started"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Tutorial description..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">

            <div className="input-group">

              <label>
                <FiTag />
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>SMS</option>
                <option>OTP</option>
                <option>Deposit</option>
                <option>Logs</option>
              </select>

            </div>

            <div className="input-group">

              <label>
                <FiClock />
                Duration
              </label>

              <input
                type="text"
                name="duration"
                placeholder="3:45"
                value={formData.duration}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        <div className="right-panel">

          <div className="upload-box">

            <label>

              <FiImage />

              Upload Thumbnail

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleThumbnail}
              />

            </label>

            {thumbnail && (
              <img
                src={thumbnail}
                alt=""
                className="preview-image"
              />
            )}

          </div>

          <div className="upload-box">

            <label>

              <FiVideo />

              Upload Video

              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideo}
              />

            </label>

            {video && (
              <video
                controls
                className="preview-video"
              >
                <source src={video} />
              </video>
            )}

          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            <FiUpload />
            Upload Tutorial
          </button>

        </div>

      </form>

    </div>
  );
};

export default UploadTutorial;
