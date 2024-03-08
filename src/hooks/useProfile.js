import { useContext } from "react";
import { ProfileContext } from "../context";

const useProfile = () => {
  return useContext(ProfileContext);
};

export default useProfile;
