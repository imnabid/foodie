import React, { useContext } from "react";
import { UserContext } from "../GlobalContext";
import { axiosAuthorizedInstance } from "./axios";

function useFetchUserInfo() {
  const { setUser, setFetchUserInfo } = useContext(UserContext);
  const fetchInfo = async () => {
    const res = await axiosAuthorizedInstance.get("api/user-info/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    setUser(res.data);
    setFetchUserInfo(false);
  };
  return fetchInfo;
}

export default useFetchUserInfo;
