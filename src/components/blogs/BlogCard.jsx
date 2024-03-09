import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import ThreeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";
import { formatRelativeTime } from "../../utils/date-time";

const BlogCard = ({ blog }) => {
  const [showAction, setShowAction] = useState(false);
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const isMe = state?.author?.id === blog?.author?.id;
  const navigate = useNavigate();
  const initialName =
    blog?.author?.firstName && blog?.author?.firstName.charAt(0);

  const handleBlogClick = () => {
    navigate(`/blog-details/${blog.id}`);
  };

  const handleSingleProfile = (event) => {
    event.stopPropagation();
    navigate(`/profile/${blog?.author?.id}`);
  };

  const handleShowAction = (event) => {
    event.stopPropagation();
    setShowAction(!showAction);
  };

  const handleEdit = (event, blog) => {
    event.stopPropagation();
    navigate(`/edit-blog/${blog?.id}`, { state: { blog } });
  };

  const handleDeleteBlog = async (event, blog) => {
    event.stopPropagation();
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_BASE_URL}/blogs/${blog?.id}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.BLOG_DELETED,
          data: blog?.id,
        });
        setShowAction(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
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
          {blog?.content.substring(0, 200)}
          {blog?.content?.length > 200 && " ..."}
        </p>
        {/* Meta Informations */}
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
        {isMe && (
          <div className="absolute right-0 top-0">
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
                  onClick={(event) => handleDeleteBlog(event, blog)}
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
