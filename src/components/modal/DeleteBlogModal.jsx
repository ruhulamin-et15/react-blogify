import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

export default function DeleteBlogModal({ onClose, setBlogs, blog }) {
  const { dispatch } = useProfile();
  const { api } = useAxios();
  const location = useLocation();

  const handleDeleteBlog = async (e) => {
    e.stopPropagation();
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_BASE_URL}/blogs/${blog?.id}`
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.BLOG_DELETED,
          data: blog?.id,
        });

        if (location.pathname !== "/profile") {
          setBlogs((prevBlogs) =>
            prevBlogs.filter((item) => item.id !== blog.id)
          );
        }
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

  const handleCancel = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full grid place-items-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] sm:max-w-[600px] lg:max-w-[700px] max-h-[95vh]">
        <div className="relative bg-gray-600 rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-yellow-500 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
              Are you sure you want to delete this blog?
            </h3>
            <button
              onClick={(e) => handleDeleteBlog(e)}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Yes, I am sure
            </button>
            <button
              onClick={(e) => handleCancel(e)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
