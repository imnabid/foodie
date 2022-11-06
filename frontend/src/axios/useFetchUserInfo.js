import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../GlobalContext";
import { axiosAuthorizedInstance } from "./axios";

function useFetchUserInfo() {
  const { setUser, setFetchUserInfo, setShowOwnerPage} = useContext(UserContext);
  const navigate = useNavigate();
  const fetchInfo = async () => {
    const res = await axiosAuthorizedInstance.get("api/user-info/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    setUser(res.data);
    if (res.data.is_staff) {
      setShowOwnerPage(true);
      setFetchUserInfo(false);
      navigate("/");
      return;
    }
    navigate('/');
    setFetchUserInfo(false);
  };
  return fetchInfo;
}

export default useFetchUserInfo;
