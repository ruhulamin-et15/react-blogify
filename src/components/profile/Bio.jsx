import { useState } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.author?.bio);
  const [editMode, setEditMode] = useState(false);

  const { api } = useAxios();

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(`http://localhost:3000/profile`, {
        bio,
      });
      console.log(response.data.user.bio);
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data.user.bio,
        });
      }
      setEditMode(false);
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.author?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 text-gray-600 lg:text-lg rounded-md "
            value={bio}
            defaultValue={state?.author?.bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Bio;
