import { useRef } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const fileUploadRef = useRef();
  const { api } = useAxios();
  const initialName =
    state?.author?.firstName && state?.author?.firstName.charAt(0);

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `http://localhost:3000/profile/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data.user,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {state?.author?.avatar === null ? (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          <span className>{initialName}</span>
        </div>
      ) : (
        <img
          className="rounded-full"
          src={`http://localhost:3000/uploads/avatar/${state?.author?.avatar}`}
        />
      )}
      <form>
        <button
          onClick={handleImageUpload}
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input
          ref={fileUploadRef}
          type="file"
          name="avatar"
          id="avatar"
          hidden
        />
      </form>
    </div>
  );
};

export default ProfileImage;
