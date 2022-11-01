import axios from "axios";
// const BASEURL = "http://192.168.1.66:8000/";
const BASEURL = "http://127.0.0.1:8000/";
export const axiosInstanceGeneral = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const axiosAuthorizedInstance = axios.create({
  baseURL: BASEURL,
  timeout: 5000
});


