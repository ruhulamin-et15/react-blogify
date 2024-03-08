import { useRef, useState } from "react";
import Field from "../Field";

const BlogImageUpload = ({ register }) => {
  const imageUploadRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (e) => {
    e.preventDefault();
    imageUploadRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Field>
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded Thumbnail" className="h-full" />
        ) : (
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
        )}
        <input
          {...register("thumbnail", { required: "Blog Photo is Required!" })}
          type="file"
          name="thumbnail"
          id="thumbnail"
          ref={imageUploadRef}
          hidden
          onChange={handleImageChange}
        />
      </div>
    </Field>
  );
};

export default BlogImageUpload;
