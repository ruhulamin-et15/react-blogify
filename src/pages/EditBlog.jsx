import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import Field from "../components/Field";
import useAxios from "../hooks/useAxios";
import useBlog from "../hooks/useBlog";
import useTitle from "../hooks/useTitle";

const EditBlog = () => {
  useTitle("Edit Blog | Learn with Sumit");
  const { id } = useParams();
  const imageUploadRef = useRef();
  const { dispatch } = useBlog();
  const { api } = useAxios();
  const [imagePreview, setImagePreview] = useState();

  const [editBlog, setEditBlog] = useState({
    title: "",
    tags: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/blogs/${id}`
        );
        const blogData = response.data;
        setEditBlog({
          title: blogData.title || "",
          tags: blogData.tags || "",
          content: blogData.content || "",
        });
        setImagePreview(
          `${import.meta.env.VITE_BASE_URL}/uploads/blog/${blogData.thumbnail}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [api, id]);

  const updateImageDisplay = async () => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    try {
      const formData = new FormData();
      for (const file of imageUploadRef.current.files) {
        formData.append("thumbnail", file);
      }
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/blogs/${id}`,
        formData
      );
      if (response.status === 200) {
        setImagePreview(URL.createObjectURL(imageUploadRef.current.files[0]));
        dispatch({
          type: actions.blog.IMAGE_UPDATED,
          data: response.data.thumbnail,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    imageUploadRef.current.addEventListener("change", updateImageDisplay);
    imageUploadRef.current.click();
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async (formData) => {
    setEditBlog(formData);
    dispatch({ type: actions.blog.DATA_FETCHING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/blogs/${id}`,
        editBlog
      );
      if (response.status === 200) {
        dispatch({ type: actions.blog.BLOG_EDITED, data: response.data });
        navigate("/profile");
        toast.success("Blog updated successfully");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
  };

  const handleTitleChange = (e) => {
    setEditBlog({ ...editBlog, title: e.target.value });
  };
  const handleTagsChange = (e) => {
    setEditBlog({ ...editBlog, tags: e.target.value });
  };
  const handleContentChange = (e) => {
    setEditBlog({ ...editBlog, content: e.target.value });
  };

  return (
    <main>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit(submitForm)} className="createBlog">
            <Field>
              <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p onClick={handleImageUpload}>Update Your Image</p>
                </div>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  ref={imageUploadRef}
                  hidden
                />
              </div>
            </Field>
            <Field>
              <img
                className="mx-auto justify-center min-h-[250px] max-h-[250px] min-w-[300px] max-w-[300px] rounded-md mb-6"
                src={imagePreview}
                alt="thumbnail"
              />
            </Field>
            <Field error={errors.title}>
              <input
                {...register("title", { required: "Title is Required!" })}
                type="text"
                value={editBlog?.title}
                onChange={handleTitleChange}
                id="title"
                name="title"
                placeholder="Enter your blog title"
              />
            </Field>
            <Field error={errors.tags}>
              <input
                {...register("tags", { required: "Tags is Required!" })}
                type="text"
                value={editBlog?.tags}
                onChange={handleTagsChange}
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />
            </Field>
            <Field error={errors.content}>
              <textarea
                {...register("content", { required: "Content is Required!" })}
                id="content"
                value={editBlog?.content}
                onChange={handleContentChange}
                name="content"
                placeholder="Write your blog content"
                rows={8}
              />
            </Field>
            <p>{errors?.root?.random?.message}</p>
            <Field>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Update Blog
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};
export default EditBlog;
