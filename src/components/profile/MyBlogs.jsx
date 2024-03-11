import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import BlogCard from "../blogs/BlogCard";

const MyBlogs = () => {
  const { state } = useProfile();
  return (
    <>
      {state?.author?.blogs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-gray-600 mt-2 h-[150px] w-3/4 mx-auto rounded-md">
          <p className="mx-auto text-xl">
            No Blogs! Please{" "}
            <Link className="text-green-500 underline" to="/create-blog">
              Create
            </Link>{" "}
            to show your blogs.
          </p>
        </div>
      ) : (
        <>
          <div className="my-6 space-y-4">
            {state?.author &&
              state?.author?.blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default MyBlogs;
