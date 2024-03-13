import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentIcon from "../assets/icons/comment.svg";
import HeartFillIcon from "../assets/icons/heart-filled.svg";
import HeartIcon from "../assets/icons/heart.svg";
import LikeIcon from "../assets/icons/like.svg";
import LikedIcon from "../assets/icons/liked.svg";
import BlogComments from "../components/blogs/BlogComments";
import BlogDetails from "../components/blogs/BlogDetails";
import CircleLoader from "../components/loader/CircleLoader";
import LoginRegisterModal from "../components/modal/LoginRegisterModal";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import usePortal from "../hooks/usePortal";
import useTitle from "../hooks/useTitle";

const BlogDetailsPage = () => {
  useTitle("Blog Details | Learn with Sumit");
  const { api } = useAxios();
  const { id } = useParams();
  const { auth } = useAuth();
  const [blog, setBlog] = useState();
  const commentRef = useRef(null);
  const renderPortal = usePortal();

  const updatedBlog = (updatedComments) => {
    setBlog(updatedComments);
  };

  const isMe = auth.authToken;
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `${import.meta.env.VITE_BASE_URL}/blogs/${id}`
        );
        setBlog(res.data);
        setFavourite(res.data.isFavourite);
        if (res.data.likes) {
          setLiked(
            res.data.likes.map((like) => like.id).includes(auth?.user?.id)
          );
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [api, id, isMe, auth?.user?.id]);

  const handleLike = async () => {
    if (!isMe) {
      setShowLoginModal(true);
      return;
    }
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/blogs/${id}/like`
      );
      if (response.status === 200) {
        const updatedBlog = {
          ...blog,
          likes: response.data.likes,
        };
        setBlog(updatedBlog);
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleFavourite = async () => {
    try {
      if (!isMe) {
        setShowLoginModal(true);
      }
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/blogs/${id}/favourite`
      );
      if (response.status === 200) {
        const updatedBlog = {
          ...blog,
          isFavourite: favourite,
        };
        setBlog(updatedBlog);
        setFavourite(!favourite);
        if (!favourite) {
          toast.success(`${blog?.title} is added to favourite`);
        } else {
          toast.warning(`${blog?.title} is removed from favourite`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scroolToComments = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <CircleLoader />;
  }

  return (
    <main>
      {showLoginModal &&
        renderPortal(
          <LoginRegisterModal
            onClose={() => setShowLoginModal(false)}
            message="like/favourite this post"
          />
        )}
      <BlogDetails blog={blog} />

      <BlogComments blog={blog} updatedBlog={updatedBlog} />

      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLike}>
            <img src={!liked ? LikeIcon : LikedIcon} alt="likeicon" />
            <span>{blog?.likes?.length}</span>
          </li>
          <li onClick={handleFavourite}>
            {isMe ? (
              <img
                src={favourite ? HeartFillIcon : HeartIcon}
                alt="Favourite"
              />
            ) : (
              <img src={HeartIcon} alt="Unfavourite" />
            )}
          </li>
          <p>
            <li onClick={scroolToComments}>
              <img src={CommentIcon} alt="Comments" />
              <span>{blog?.comments?.length}</span>
            </li>
          </p>
        </ul>
      </div>
      <div ref={commentRef}></div>
    </main>
  );
};

export default BlogDetailsPage;
