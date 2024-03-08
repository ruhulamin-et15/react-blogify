import { useNavigate } from "react-router-dom";
import { shortFormatDate } from "../../utils/date-utils";

const BlogDetails = ({ blog }) => {
  const initialName =
    blog?.author?.firstName && blog?.author?.firstName.charAt(0);

  const tagArray = blog?.tags?.split(",").map((tag) => tag?.trim());

  const navigate = useNavigate();

  const handleProfileDetails = (blog) => {
    navigate(`/profile/${blog?.author?.id}`);
  };

  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            <div
              className="avater-img bg-indigo-600 text-white cursor-pointer"
              onClick={() => handleProfileDetails(blog)}
            >
              {blog?.author?.avatar === null ? (
                <span className>{initialName}</span>
              ) : (
                <img
                  className="rounded-full"
                  src={`http://localhost:3000/uploads/avatar/${blog?.author?.avatar}`}
                  alt="avatar"
                />
              )}
            </div>
            <h5
              onClick={() => handleProfileDetails(blog)}
              className="text-slate-500 text-sm cursor-pointer"
            >
              {blog?.author?.firstName} {blog?.author?.lastName}
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {shortFormatDate(blog?.createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {blog?.likes?.length} Likes
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`http://localhost:3000/uploads/blog/${blog?.thumbnail}`}
          alt="thumbnail"
        />
        <ul className="tags">
          {tagArray?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {blog?.content}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
