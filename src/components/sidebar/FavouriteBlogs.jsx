import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const FavouriteBlogs = () => {
  const [favBlogs, setFavBlogs] = useState([]);
  const { api } = useAxios();

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await api.get(`http://localhost:3000/blogs/favourites`);
      setFavBlogs(response.data.blogs);
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
      {favBlogs?.length !== 0 ? (
        <ul className="space-y-5 my-5">
          {favBlogs &&
            favBlogs.map((favBlog) => (
              <li onClick={() => handleDetails(favBlog.id)} key={favBlog.id}>
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
        <p className="mt-4">Your Favourites List is Empty</p>
      )}
    </div>
  );
};

export default FavouriteBlogs;
