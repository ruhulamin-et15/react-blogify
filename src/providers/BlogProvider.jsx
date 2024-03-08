import { useReducer } from "react";
import { BlogContext } from "../context";
import { BlogReducer, initialState } from "../reducers/BlogReducer";

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BlogReducer, initialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
