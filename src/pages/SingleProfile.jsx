import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../components/blogs/BlogCard";
import useTitle from "../hooks/useTitle";

const SingleProfile = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  useTitle(`${userInfo?.firstName} ${userInfo?.lastName} | Learn with Sumit`);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/profile/${id}`
        );
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading Profile Details...</div>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
              {userInfo?.avatar === null ? (
                <span className>S</span>
              ) : (
                <img
                  className="rounded-full"
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
                    userInfo?.avatar
                  }`}
                />
              )}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {userInfo?.firstName} {userInfo?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{userInfo?.email}</p>
          </div>
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {userInfo?.bio}
              </p>
            </div>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
        </div>
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Blogs</h4>
        <div className="my-6 space-y-4">
          {userInfo &&
            userInfo.blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default SingleProfile;
