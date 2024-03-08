import { useAuth } from "../../hooks/useAuth";
import FavouriteBlogs from "./FavouriteBlogs";
import PopularBlogs from "./PopularBlogs";

const SideBar = () => {
  const { auth } = useAuth();
  const isMe = auth.authToken;
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <PopularBlogs />
      {isMe && <FavouriteBlogs />}
    </div>
  );
};

export default SideBar;
