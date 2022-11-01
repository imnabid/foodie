import { axiosInstanceGeneral } from "./axios";

export const handleRegister = (data) => {
  axiosInstanceGeneral
    .post("api/register/", { ...data })
    .then((res) => console.log(res))
    .catch((err)=>console.log(err.response))
};