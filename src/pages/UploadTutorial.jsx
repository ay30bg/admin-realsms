// import React, { useState } from "react";
// import {
//   FiUpload,
//   FiVideo,
//   FiImage,
//   FiClock,
//   FiTag,
//   FiTrash2,
//   FiEdit2,
// } from "react-icons/fi";

// import "../styles/uploadTutorial.css";

// const UploadTutorial = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "SMS",
//     duration: "",
//   });

//   const [video, setVideo] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);

//   const [editingId, setEditingId] = useState(null);

//   const [tutorials, setTutorials] = useState([
//     {
//       id: 1,
//       title: "Getting Started",
//       description: "Learn platform basics",
//       category: "SMS",
//       duration: "3:45",
//       thumbnail:
//         "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
//     },
//   ]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleVideo = (e) => {
//     if (e.target.files[0]) {
//       setVideo(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleThumbnail = (e) => {
//     if (e.target.files[0]) {
//       setThumbnail(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const tutorialData = {
//       id: editingId || Date.now(),
//       ...formData,
//       video,
//       thumbnail,
//     };

//     if (editingId) {
//       setTutorials(
//         tutorials.map((item) =>
//           item.id === editingId ? tutorialData : item
//         )
//       );
//     } else {
//       setTutorials([tutorialData, ...tutorials]);
//     }

//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       category: "SMS",
//       duration: "",
//     });

//     setVideo(null);
//     setThumbnail(null);
//     setEditingId(null);
//   };

//   const handleDelete = (id) => {
//     setTutorials(
//       tutorials.filter((item) => item.id !== id)
//     );
//   };

//   const handleEdit = (tutorial) => {
//     setEditingId(tutorial.id);

//     setFormData({
//       title: tutorial.title,
//       description: tutorial.description,
//       category: tutorial.category,
//       duration: tutorial.duration,
//     });

//     setThumbnail(tutorial.thumbnail);
//     setVideo(tutorial.video);
//   };

//   return (
//     <div className="upload-page">

//       <div className="upload-header">
//         <h1>Upload Video Tutorial</h1>
//         <p>Add tutorials users can watch</p>
//       </div>

//       <form
//         className="upload-container"
//         onSubmit={handleSubmit}
//       >

//         <div className="left-panel">

//           <div className="input-group">
//             <label>Title</label>

//             <input
//               type="text"
//               name="title"
//               placeholder="Getting Started"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Description</label>

//             <textarea
//               rows="5"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="row">

//             <div className="input-group">
//               <label>
//                 <FiTag />
//                 Category
//               </label>

//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//               >
//                 <option>SMS</option>
//                 <option>OTP</option>
//                 <option>Deposit</option>
//                 <option>Logs</option>
//               </select>
//             </div>

//             <div className="input-group">

//               <label>
//                 <FiClock />
//                 Duration
//               </label>

//               <input
//                 type="text"
//                 name="duration"
//                 placeholder="3:45"
//                 value={formData.duration}
//                 onChange={handleChange}
//               />
//             </div>

//           </div>

//         </div>

//         <div className="right-panel">

//           <div className="upload-box">

//             <label>
//               <FiImage />
//               Upload Thumbnail

//               <input
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={handleThumbnail}
//               />
//             </label>

//             {thumbnail && (
//               <img
//                 src={thumbnail}
//                 alt=""
//                 className="preview-image"
//               />
//             )}

//           </div>

//           <div className="upload-box">

//             <label>
//               <FiVideo />
//               Upload Video

//               <input
//                 hidden
//                 type="file"
//                 accept="video/*"
//                 onChange={handleVideo}
//               />
//             </label>

//             {video && (
//               <video
//                 controls
//                 className="preview-video"
//               >
//                 <source src={video} />
//               </video>
//             )}

//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//           >
//             <FiUpload />

//             {editingId
//               ? "Update Tutorial"
//               : "Upload Tutorial"}
//           </button>

//         </div>

//       </form>

//       {/* Tutorial Manager */}

//       <div className="tutorial-manager">

//         <h2>Tutorial Manager</h2>

//         <div className="tutorial-list">

//           {tutorials.map((tutorial) => (

//             <div
//               key={tutorial.id}
//               className="tutorial-card"
//             >

//               <img
//                 src={tutorial.thumbnail}
//                 alt=""
//               />

//               <div className="tutorial-content">

//                 <h3>{tutorial.title}</h3>

//                 <p>{tutorial.description}</p>

//                 <span>
//                   {tutorial.category} •{" "}
//                   {tutorial.duration}
//                 </span>

//               </div>

//               <div className="tutorial-actions">

//                 <button
//                   className="edit-btn"
//                   onClick={() =>
//                     handleEdit(tutorial)
//                   }
//                 >
//                   <FiEdit2 />
//                 </button>

//                 <button
//                   className="delete-btn"
//                   onClick={() =>
//                     handleDelete(tutorial.id)
//                   }
//                 >
//                   <FiTrash2 />
//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default UploadTutorial;

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
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(false);

  // ======================
  // FETCH TUTORIALS
  // ======================

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const res = await axios.get(
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
  // INPUT CHANGE
  // ======================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // const handleVideo = (e) => {
  //   if (e.target.files[0]) {
  //     setVideo(
  //       e.target.files[0]
  //     );
  //   }
  // };

 const handleVideo = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // preview URL
  const previewUrl =
    URL.createObjectURL(file);

  setVideo(previewUrl);

  // get duration
  const videoElement =
    document.createElement(
      "video"
    );

  videoElement.preload =
    "metadata";

  videoElement.src =
    previewUrl;

  videoElement.onloadedmetadata =
    () => {

      const totalSeconds =
        Math.floor(
          videoElement.duration
        );

      const minutes =
        Math.floor(
          totalSeconds / 60
        );

      const seconds =
        totalSeconds % 60;

      setFormData(
        (prev) => ({
          ...prev,
          duration:
            `${minutes}:${String(
              seconds
            ).padStart(
              2,
              "0"
            )}`,
        })
      );
    };
};

  const handleThumbnail = (
    e
  ) => {
    if (e.target.files[0]) {
      setThumbnail(
        e.target.files[0]
      );
    }
  };

  // ======================
  // SUBMIT
  // ======================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "duration",
        formData.duration
      );

      if (thumbnail) {
        data.append(
          "thumbnail",
          thumbnail
        );
      }

      if (video) {
        data.append(
          "video",
          video
        );
      }

      if (editingId) {

        await axios.put(
          `${API_URL}/api/tutorials/${editingId}`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      } else {

        await axios.post(
          `${API_URL}/api/tutorials`,
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      }

      fetchTutorials();
      resetForm();

    } catch (err) {
      console.log(err);
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

    setThumbnail(null);
    setVideo(null);
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
    setEditingId(null);
  };

  return (
    <div className="upload-page">

      <div className="upload-header">
        <h1>
          Upload Video Tutorial
        </h1>

        <p>
          Add tutorials users can
          watch
        </p>
      </div>

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
              placeholder="Getting Started"
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
                type="text"
                name="duration"
                placeholder="Auto detected"
                value={
                  formData.duration
                }
                onChange={
                  handleChange
                }
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

            {thumbnail && (

              <img
                src={URL.createObjectURL(
                  thumbnail
                )}
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

            {video && (

              <video
                controls
                className="preview-video"
              >
                <source
                  src={URL.createObjectURL(
                    video
                  )}
                />
              </video>

            )}

          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={
              loading
            }
          >

            <FiUpload />

            {loading
              ? "Processing..."
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
            (
              tutorial
            ) => (

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
