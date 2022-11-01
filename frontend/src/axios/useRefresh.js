import { axiosAuthorizedInstance } from "./axios";

function useRefresh() {
  const refresh = async () => {
    const res = await axiosAuthorizedInstance.post("auth/token/", {
      grant_type: "refresh_token",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
    return res;
  };
  return refresh;
}

export default useRefresh;
