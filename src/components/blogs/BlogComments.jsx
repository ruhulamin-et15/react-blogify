import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import usePortal from "../../hooks/usePortal";
import useProfile from "../../hooks/useProfile";
import DeleteCommentModal from "../modal/DeleteCommentModal";

const BlogComments = ({ blog, updatedBlog }) => {
  const { auth } = useAuth();
  const { state } = useProfile();
  const { api } = useAxios();
  const [showDeleteModal, setShowDeleteModal] = useState();
  const renderPortal = usePortal();
  const navigate = useNavigate();
  const lastCommentRef = useRef(null);

  const { handleSubmit, register, setValue } = useForm();

  const submitComment = async (formData) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/${blog?.id}/comment`,
        formData
      );
      if (response.status === 200) {
        const updateBlog = {
          ...blog,
          comments: response.data.comments,
        };
        updatedBlog(updateBlog);
        setValue("content", "");
        lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCommentModal = () => {
    setShowDeleteModal(true);
  };

  const handleProfileDetails = (blog) => {
    navigate(`/profile/${blog?.author?.id}`);
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments {blog?.comments?.length}
        </h2>
        {auth?.authToken && (
          <div className="flex items -center space-x-4">
            <div className="avater-img bg-indigo-600 text-white">
              <>
                {auth.user.avatar === null ? (
                  <span>{auth.user.firstName.charAt(0)}</span>
                ) : (
                  <img
                    className="rounded-full"
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                      state?.author?.avatar ?? auth.user.avatar
                    }`}
                    alt="avatar"
                  />
                )}
              </>
            </div>
            <form onSubmit={handleSubmit(submitComment)} className="w-full">
              <div>
                <textarea
                  {...register("content")}
                  className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                  name="content"
                  placeholder="Write a comment"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {blog?.comments &&
          blog?.comments.map((comment) => (
            <div key={comment?.id} className="flex items-start space-x-4 my-8">
              {showDeleteModal &&
                renderPortal(
                  <DeleteCommentModal
                    blog={blog}
                    updatedBlog={updatedBlog}
                    commentId={comment?.id}
                    onClose={() => setShowDeleteModal(false)}
                  />
                )}
              <div className="avater-img bg-orange-600 text-white">
                {comment?.author?.avatar === null ? (
                  <span className>{comment?.author?.firstName.charAt(0)}</span>
                ) : (
                  <img
                    onClick={() => handleProfileDetails(comment)}
                    className="rounded-full cursor-pointer"
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                      auth.user.id === comment?.author?.id
                        ? auth.user.avatar
                        : comment?.author?.avatar
                    }`}
                  />
                )}
              </div>
              <div className="w-full">
                <h5
                  onClick={() => handleProfileDetails(comment)}
                  className="text-slate -500 font-bold cursor-pointer"
                >
                  {comment?.author?.firstName} {comment?.author?.lastName}
                </h5>
                <p className="text-slate-300">{comment?.content}</p>
              </div>
              {auth.authToken ? (
                <>
                  {(auth.user.id === comment?.author?.id ||
                    auth.user.id === blog?.author?.id) && (
                    <button
                      className="border border-gray-500 rounded-md px-2 py-1 cursor-pointer"
                      onClick={handleDeleteCommentModal}
                    >
                      Delete
                    </button>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        <div ref={lastCommentRef}></div>
      </div>
    </section>
  );
};

export default BlogComments;
