import axios from "axios";

export const handleRegister = (data) => {
  axios
    .post("http://127.0.0.1:8000/api/register/", { ...data })
    .then((res) => console.log(res))
    .catch((err)=>console.log(err.response))
};