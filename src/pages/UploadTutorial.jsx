import React, { useEffect, useState } from "react";
import axios from "axios";
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

const API_URL = process.env.REACT_APP_API_URL;

const CLOUD_NAME =
  process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const UploadTutorial = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "SMS",
    duration: "",
  });

  const [video, setVideo] =
    useState(null);

  const [thumbnail, setThumbnail] =
    useState(null);

  const [videoPreview, setVideoPreview] =
    useState(null);

  const [
    thumbnailPreview,
    setThumbnailPreview,
  ] = useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const [tutorials, setTutorials] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

// ======================
// EFFECTS
// ======================

useEffect(() => {
  fetchTutorials();
}, []);

useEffect(() => {

  return () => {

    if (videoPreview) {

      URL.revokeObjectURL(
        videoPreview
      );

    }

    if (thumbnailPreview) {

      URL.revokeObjectURL(
        thumbnailPreview
      );

    }

  };

}, [
  videoPreview,
  thumbnailPreview
]);

  // ======================
  // FETCH
  // ======================

  const fetchTutorials =
    async () => {
      try {
        const res =
          await axios.get(
            `${API_URL}/api/tutorials`
          );

        setTutorials(
          res.data.tutorials
        );
      } catch (err) {
        console.log(err);
      }
    };

  // ======================
  // INPUT
  // ======================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ======================
  // VIDEO
  // ======================

  const handleVideo = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setVideo(file);

    const url =
      URL.createObjectURL(
        file
      );

    setVideoPreview(url);

    const videoElement =
      document.createElement(
        "video"
      );

    videoElement.preload =
      "metadata";

    videoElement.src = url;

    videoElement.onloadedmetadata =
      () => {
        const totalSeconds =
          Math.floor(
            videoElement.duration
          );

        const hours =
          Math.floor(
            totalSeconds /
              3600
          );

        const minutes =
          Math.floor(
            (totalSeconds %
              3600) /
              60
          );

        const seconds =
          totalSeconds % 60;

        const duration =
          hours > 0
            ? `${hours}:${minutes
                .toString()
                .padStart(
                  2,
                  "0"
                )}:${seconds
                .toString()
                .padStart(
                  2,
                  "0"
                )}`
            : `${minutes}:${seconds
                .toString()
                .padStart(
                  2,
                  "0"
                )}`;

        setFormData(
          (prev) => ({
            ...prev,
            duration:
              duration,
          })
        );
      };
  };

  // ======================
  // THUMBNAIL
  // ======================

  const handleThumbnail =
    (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setThumbnail(file);

      const url =
        URL.createObjectURL(
          file
        );

      setThumbnailPreview(
        url
      );
    };

  // ======================
  // CLOUDINARY
  // ======================

  const uploadToCloudinary =
    async (file, type) => {
      const data =
        new FormData();

      data.append(
        "file",
        file
      );

      data.append(
        "upload_preset",
        UPLOAD_PRESET
      );

      data.append(
        "folder",
        type ===
          "video"
          ? "tutorial-videos"
          : "tutorial-thumbnails"
      );

      const endpoint =
        type === "video"
          ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
          : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const res =
        await axios.post(
          endpoint,
          data,
          {
            maxBodyLength:
              Infinity,
            maxContentLength:
              Infinity,

            onUploadProgress:
              (
                progressEvent
              ) => {
                const percent =
                  Math.round(
                    (progressEvent.loaded *
                      100) /
                      progressEvent.total
                  );

                console.log(
                  `${type}: ${percent}%`
                );
              },
          }
        );

      return res.data.secure_url;
    };

  // ======================
  // SUBMIT
  // ======================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        let videoUrl =
          "";

        let thumbnailUrl =
          "";

        if (video) {
          videoUrl =
            await uploadToCloudinary(
              video,
              "video"
            );
        }

        if (thumbnail) {
          thumbnailUrl =
            await uploadToCloudinary(
              thumbnail,
              "image"
            );
        }

        const payload = {
          title:
            formData.title,

          description:
            formData.description,

          category:
            formData.category,

          duration:
            formData.duration,

          video:
            videoUrl,

          thumbnail:
            thumbnailUrl,
        };

        if (editingId) {
          await axios.put(
            `${API_URL}/api/tutorials/${editingId}`,
            payload
          );
        } else {
          await axios.post(
            `${API_URL}/api/tutorials`,
            payload
          );
        }

        fetchTutorials();

        resetForm();
      } catch (err) {
        console.log(
          err.response
            ?.data ||
            err.message
        );
      } finally {
        setLoading(false);
      }
    };

  // ======================
  // DELETE
  // ======================

  const handleDelete =
    async (id) => {
      try {
        await axios.delete(
          `${API_URL}/api/tutorials/${id}`
        );

        setTutorials(
          tutorials.filter(
            (item) =>
              item._id !== id
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

  // ======================
  // EDIT
  // ======================

  const handleEdit = (
    tutorial
  ) => {
    setEditingId(
      tutorial._id
    );

    setFormData({
      title:
        tutorial.title,
      description:
        tutorial.description,
      category:
        tutorial.category,
      duration:
        tutorial.duration,
    });
  };

  // ======================
  // RESET
  // ======================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "SMS",
      duration: "",
    });

    setVideo(null);
    setThumbnail(null);

    setVideoPreview(
      null
    );

    setThumbnailPreview(
      null
    );

    setEditingId(
      null
    );
  };

  return (
    <div className="upload-page">

      <form
        className="upload-container"
        onSubmit={
          handleSubmit
        }
      >

        <div className="left-panel">

          <div className="input-group">

            <label>
              Title
            </label>

            <input
              type="text"
              name="title"
              value={
                formData.title
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
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
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
              >
                <option>
                  SMS
                </option>
                <option>
                  OTP
                </option>
                <option>
                  Deposit
                </option>
                <option>
                  Logs
                </option>
              </select>
            </div>

            <div className="input-group">
              <label>
                <FiClock />
                Duration
              </label>

              <input
                value={
                  formData.duration
                }
                readOnly
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
                onChange={
                  handleThumbnail
                }
              />

            </label>

            {thumbnailPreview && (
              <img
                src={
                  thumbnailPreview
                }
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
                onChange={
                  handleVideo
                }
              />

            </label>

            {videoPreview && (
              <video
                controls
                className="preview-video"
              >
                <source
                  src={
                    videoPreview
                  }
                />
              </video>
            )}

          </div>

          <button
            className="submit-btn"
            disabled={
              loading
            }
          >

            <FiUpload />

            {loading
              ? "Uploading..."
              : editingId
              ? "Update Tutorial"
              : "Upload Tutorial"}

          </button>

        </div>

      </form>

      <div className="tutorial-manager">

        <h2>
          Tutorial Manager
        </h2>

        <div className="tutorial-list">

          {tutorials.map(
            (tutorial) => (

              <div
                key={
                  tutorial._id
                }
                className="tutorial-card"
              >

                <img
                  src={
                    tutorial.thumbnail
                  }
                  alt=""
                />

                <div className="tutorial-content">

                  <h3>
                    {
                      tutorial.title
                    }
                  </h3>

                  <p>
                    {
                      tutorial.description
                    }
                  </p>

                  <span>

                    {
                      tutorial.category
                    }

                    {" • "}

                    {
                      tutorial.duration
                    }

                  </span>

                </div>

                <div className="tutorial-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        tutorial
                      )
                    }
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        tutorial._id
                      )
                    }
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default UploadTutorial;
