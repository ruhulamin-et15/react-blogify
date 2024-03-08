import useProfile from "../../hooks/useProfile";
import BlogCard from "../blogs/BlogCard";

const MyBlogs = () => {
  const { state } = useProfile();
  return (
    <div className="my-6 space-y-4">
      {state?.author &&
        state?.author?.blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default MyBlogs;
