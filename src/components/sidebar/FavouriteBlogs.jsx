import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const FavouriteBlogs = () => {
  const [favBlogs, setFavBlogs] = useState([]);
  const { api } = useAxios();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/blogs/favourites`
        );
        setFavBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavourites();
  }, [api]);

  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/blog-details/${id}`);
  };

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>
      {loading ? (
        <h2>Loading Favourites Blogs...</h2>
      ) : (
        <>
          {favBlogs?.length !== 0 ? (
            <ul className="space-y-5 my-5">
              {favBlogs &&
                favBlogs.map((favBlog) => (
                  <li
                    onClick={() => handleDetails(favBlog.id)}
                    key={favBlog.id}
                  >
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      {favBlog.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {favBlog?.tags?.split(",").map((tag, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && ", "}
                          {"#" + tag.trim()}
                        </React.Fragment>
                      ))}
                    </p>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="border border-gray-600 h-[50px] mt-4 flex flex-col items-center justify-center rounded-md">
              <motion.p
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse", // Reverse the animation on repeat
                }}
                className="mx-auto"
              >
                Your Favourites List is Empty!
              </motion.p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavouriteBlogs;
