import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../GlobalContext";
import useAxiosAuth from "./useAxiosAuth";

function useUserInfo() {
  const { user, setShowOwnerPage, setFetchUserInfo, setUser } =
    useContext(UserContext);
  const axiosAuthorized = useAxiosAuth();
  const navigate = useNavigate();
  const fetchData = async (fromCus,fromOwn) => {
    axiosAuthorized
      .get("api/user-info/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.data.is_staff) {
          if (!localStorage.getItem("owner"))
            localStorage.setItem("owner", true);
          setShowOwnerPage(true);
          setFetchUserInfo(false);
          setUser(res.data);
          return true;
        }
        setUser(res.data);
        setFetchUserInfo(false);
      })
      .then(owner=>{
        if(owner) navigate(fromOwn || '/')
        else navigate(fromCus)
      })
      .catch((err) => {
        setFetchUserInfo(false);
      });
  };
  return fetchData;
}

export default useUserInfo;
