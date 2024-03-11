import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";

import usePortal from "../../hooks/usePortal";
import { formatRelativeTime } from "../../utils/date-time";
import DeleteBlogModal from "../modal/DeleteBlogModal";

const BlogCard = ({ blog, setBlogs }) => {
  const [showAction, setShowAction] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const renderPortal = usePortal();
  const initialName =
    blog?.author?.firstName && blog?.author?.firstName.charAt(0);

  const handleBlogClick = () => {
    navigate(`/blog-details/${blog?.id}`);
  };

  const handleSingleProfile = (event) => {
    event.stopPropagation();
    if (auth?.user?.id === blog?.author?.id) {
      navigate(`/profile`);
    } else {
      navigate(`/profile/${blog?.author?.id}`);
    }
  };

  const handleShowAction = (event) => {
    event.stopPropagation();
    setShowAction(!showAction);
  };

  const handleEdit = (event, blog) => {
    event.stopPropagation();
    navigate(`/edit-blog/${blog?.id}`, { state: { blog } });
  };

  const handleDeleteModalShow = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  return (
    <div onClick={handleBlogClick} className="blog-card">
      <img
        className="blog-thumb"
        src={`${import.meta.env.VITE_BASE_URL}/uploads/blog/${blog?.thumbnail}`}
        alt="blog"
      />
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">
          <span>{blog?.title}</span>
        </h3>
        <p className="mb-6 text-base text-slate-500 mt-1">
          {blog?.content.substring(0, 250)}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div
              className="avater-img bg-indigo-600 text-white"
              onClick={handleSingleProfile}
            >
              {blog?.author?.avatar === null ? (
                <span className>{initialName}</span>
              ) : (
                <img
                  className="rounded-full"
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                    blog?.author?.avatar
                  }`}
                  alt="avatar"
                />
              )}
            </div>
            <div>
              <h5 className="text-slate-500 text-sm">
                <button onClick={handleSingleProfile}>
                  {blog?.author?.firstName} {blog?.author?.lastName}
                </button>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatRelativeTime(blog?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{blog?.likes?.length} Likes</span>
          </div>
        </div>
        {auth?.user?.id === blog?.author?.id && (
          <div className="absolute right-0 top-0">
            {showDeleteModal &&
              renderPortal(
                <DeleteBlogModal
                  setBlogs={setBlogs}
                  blog={blog}
                  setShowAction={setShowAction}
                  onClose={() => setShowDeleteModal(false)}
                />
              )}
            <button onClick={handleShowAction}>
              <img src={ThreeDots} alt="3dots of Action" />
            </button>
            {showAction && (
              <div className="action-modal-container">
                <button
                  onClick={(event) => handleEdit(event, blog)}
                  className="action-menu-item hover:text-lwsGreen"
                >
                  <img src={EditIcon} alt="Edit" />
                  Edit
                </button>
                <button
                  onClick={(e) => handleDeleteModalShow(e)}
                  className="action-menu-item hover:text-red-500"
                >
                  <img src={DeleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
