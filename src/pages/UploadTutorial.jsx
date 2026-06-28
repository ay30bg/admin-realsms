import React, { useState } from "react";
import {
  FiUpload,
  FiVideo,
  FiImage,
  FiClock,
  FiTag,
  FiTrash2,
  FiEdit2,
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

  const [editingId, setEditingId] = useState(null);

  const [tutorials, setTutorials] = useState([
    {
      id: 1,
      title: "Getting Started",
      description: "Learn platform basics",
      category: "SMS",
      duration: "3:45",
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
    },
  ]);

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

    const tutorialData = {
      id: editingId || Date.now(),
      ...formData,
      video,
      thumbnail,
    };

    if (editingId) {
      setTutorials(
        tutorials.map((item) =>
          item.id === editingId ? tutorialData : item
        )
      );
    } else {
      setTutorials([tutorialData, ...tutorials]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "SMS",
      duration: "",
    });

    setVideo(null);
    setThumbnail(null);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setTutorials(
      tutorials.filter((item) => item.id !== id)
    );
  };

  const handleEdit = (tutorial) => {
    setEditingId(tutorial.id);

    setFormData({
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      duration: tutorial.duration,
    });

    setThumbnail(tutorial.thumbnail);
    setVideo(tutorial.video);
  };

  return (
    <div className="upload-page">

      <div className="upload-header">
        <h1>Upload Video Tutorial</h1>
        <p>Add tutorials users can watch</p>
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
              value={formData.description}
              onChange={handleChange}
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
                hidden
                type="file"
                accept="image/*"
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
                hidden
                type="file"
                accept="video/*"
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

            {editingId
              ? "Update Tutorial"
              : "Upload Tutorial"}
          </button>

        </div>

      </form>

      {/* Tutorial Manager */}

      <div className="tutorial-manager">

        <h2>Tutorial Manager</h2>

        <div className="tutorial-list">

          {tutorials.map((tutorial) => (

            <div
              key={tutorial.id}
              className="tutorial-card"
            >

              <img
                src={tutorial.thumbnail}
                alt=""
              />

              <div className="tutorial-content">

                <h3>{tutorial.title}</h3>

                <p>{tutorial.description}</p>

                <span>
                  {tutorial.category} •{" "}
                  {tutorial.duration}
                </span>

              </div>

              <div className="tutorial-actions">

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(tutorial)
                  }
                >
                  <FiEdit2 />
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(tutorial.id)
                  }
                >
                  <FiTrash2 />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default UploadTutorial;
