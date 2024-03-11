import { useNavigate } from "react-router-dom";

export default function LoginRegisterModal({ onClose }) {
  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/login");
  };

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full flex justify-center items-center">
      <div className="relative bg-gray-600 rounded-lg shadow dark:bg-gray-700">
        <div className="p-4 md:p-5 flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
          <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400 text-center">
            Please Login/Register first for comment this post.
          </h3>
          <div>
            <button
              onClick={loginPage}
              className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Login
            </button>
            <button
              onClick={registerPage}
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
