import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import Field from "../components/Field";
import useAxios from "../hooks/useAxios";
import useBlog from "../hooks/useBlog";

const NewBlog = () => {
  const imageUploadRef = useRef();
  const { dispatch } = useBlog();
  const { api } = useAxios();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    imageUploadRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async (formData) => {
    const formDataObj = new FormData();
    for (const file of imageUploadRef.current.files) {
      formDataObj.append("thumbnail", file);
    }
    formDataObj.append("title", formData.title);
    formDataObj.append("tags", formData.tags);
    formDataObj.append("content", formData.content);

    dispatch({ type: actions.blog.DATA_FETCHING });
    try {
      const response = await api.post(
        `http://localhost:3000/blogs`,
        formDataObj
      );

      if (response.status === 201) {
        dispatch({ type: actions.blog.BLOG_CREATED, data: response.data });
        navigate("/profile");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
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
                  <p onClick={handleImageUpload}>Upload Your Image</p>
                </div>
                <input
                  {...register("thumbnail")}
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  ref={imageUploadRef}
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            </Field>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="image"
                className="mx-auto justify-center min-h-[250px] max-h-[250px] min-w-[300px] max-w-[300px] rounded-md mb-6"
              />
            )}
            <Field error={errors.title}>
              <input
                {...register("title", { required: "Title is Required!" })}
                type="text"
                id="title"
                name="title"
                placeholder="Enter your blog title"
              />
            </Field>
            <Field error={errors.tags}>
              <input
                {...register("tags", { required: "Tags is Required!" })}
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />
            </Field>
            <Field error={errors.content}>
              <textarea
                {...register("content", { required: "Content is Required!" })}
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows={8}
                defaultValue={""}
              />
            </Field>
            <p>{errors?.root?.random?.message}</p>
            <Field>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Create Blog
              </button>
            </Field>
          </form>
        </div>
      </section>
    </main>
  );
};
export default NewBlog;
