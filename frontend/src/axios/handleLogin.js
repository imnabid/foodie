import axios from "axios";

// this is for normal custom login

const BASEURL = "http://127.0.0.1:8000/";
const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const handleCustomLogin = (username, password) => {
  axiosInstance
    .post("auth/token/", {
      grant_type: "password",
      username: username,
      password: password,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    })
    .then((res) => {
      console.log(res);
      if ((res.status = 200)) {
        const data = res.data;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
      }
    })
    .catch((err) => console.log("error occurred"));
};

export const handleGoogleLogin = (accessToken) => {
  axios
    .post("http://127.0.0.1:8000/auth/convert-token", {
      token: accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    })
    .then((res) => {
      console.log(res);
      if ((res.status = 200)) {
        const data = res.data;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
      }
    })
    .catch((err) => console.log('error occured',err));
};

