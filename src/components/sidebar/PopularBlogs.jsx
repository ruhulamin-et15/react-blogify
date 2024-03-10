import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopularBlogs = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/blogs/popular`
        );
        setPopularBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedBlogs();
  }, []);

  const navigate = useNavigate();

  const handleAuthorClick = (blog) => {
    navigate(`/profile/${blog?.author?.id}`, { state: { blog } });
  };

  const handleDetailsClick = (blog) => {
    navigate(`/blog-details/${blog.id}`);
  };

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>
      {loading ? (
        <h3>Loading Popular Blogs...</h3>
      ) : (
        <ul className="space-y-5 my-5">
          {popularBlogs &&
            popularBlogs.map((blog) => (
              <li key={blog.id}>
                <h3
                  onClick={() => handleDetailsClick(blog)}
                  className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                >
                  {blog?.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  by
                  <button onClick={() => handleAuthorClick(blog)}>
                    {blog?.author?.firstName} {blog?.author?.lastName}
                  </button>
                  <span>·</span> {blog?.likes?.length} Likes
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default PopularBlogs;
