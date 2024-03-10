import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useBlog from "../../hooks/useBlog";
import useProfile from "../../hooks/useProfile";
import BlogCard from "./BlogCard";

const blogsPerPage = 10;
const BlogContents = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const { state: profile } = useProfile();
  const { state } = useBlog();
  const allBlogs = blogs ?? state?.blogs ?? profile?.blogs;
  const { api } = useAxios();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/blogs?limit=${blogsPerPage}&page=${page}`
        );
        if (response.data.blogs.length === 0) {
          setHasMore(false);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    //cleanup function
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page, api]);

  return (
    <div className="space-y-3 md:col-span-5">
      {allBlogs &&
        allBlogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} setBlogs={setBlogs} />
        ))}

      {hasMore ? (
        <div ref={loaderRef}>Loading more blogs...</div>
      ) : (
        <div className="text-xl ms-5">No More Blogs</div>
      )}
    </div>
  );
};

export default BlogContents;
