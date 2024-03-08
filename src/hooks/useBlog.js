import { useContext } from "react";
import { BlogContext } from "../context";

const useBlog = () => {
  return useContext(BlogContext);
};

export default useBlog;
