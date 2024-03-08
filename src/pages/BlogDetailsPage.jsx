import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentIcon from "../assets/icons/comment.svg";
import HeartFillIcon from "../assets/icons/heart-filled.svg";
import HeartIcon from "../assets/icons/heart.svg";
import LikeIcon from "../assets/icons/like.svg";
import LikedIcon from "../assets/icons/liked.svg";
import BlogComments from "../components/blogs/BlogComments";
import BlogDetails from "../components/blogs/BlogDetails";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const BlogDetailsPage = () => {
  const { api } = useAxios();
  const { id } = useParams();
  const { auth } = useAuth();
  const [blog, setBlog] = useState();

  const updatedBlog = (updatedComments) => {
    setBlog(updatedComments);
  };

  const isMe = auth.authToken;
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(true);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`http://localhost:3000/blogs/${id}`);
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

  const navigate = useNavigate();

  const handleLike = async () => {
    if (!isMe) {
      navigate("/login");
      toast.warning("Please login first to like the blog.");
      return;
    }
    try {
      const response = await api.post(`http://localhost:3000/blogs/${id}/like`);
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
        navigate("/login");
        toast.warning("Please Login First For Add to Favourite");
      }
      const response = await api.patch(
        `http://localhost:3000/blogs/${id}/favourite`
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
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
            <li>
              <img src={CommentIcon} alt="Comments" />
              <span>{blog?.comments?.length}</span>
            </li>
          </p>
        </ul>
      </div>
    </main>
  );
};

export default BlogDetailsPage;
