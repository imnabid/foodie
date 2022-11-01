import { useEffect } from "react";
import { axiosAuthorizedInstance } from "./axios";
import useRefresh from "./useRefresh";
function useAxiosAuth() {
  const refresh = useRefresh();

  useEffect(() => {

    // const requestInterceptor = axiosAuthorizedInstance.interceptors.request.use(
    //   config=>{
    //     if(!config.headers['Authorization']){
    //       config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
    //     }
    //     return config;
    //   },(error)=>Promise.reject(error)
    // );

    const responseInterceptor = axiosAuthorizedInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          
          const prevRequest = error?.config;
          if (error.response.status === 401 && localStorage.getItem('access_token')) {
            const newResponse = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newResponse.data.access_token}`
            return axiosAuthorizedInstance(prevRequest);
          }
          return Promise.reject(error);
        }
      );

    return ()=>{
      axiosAuthorizedInstance.interceptors.response.eject(responseInterceptor);
      // axiosAuthorizedInstance.interceptors.request.eject(requestInterceptor);
    }
  },[refresh]);

  return axiosAuthorizedInstance;
}

export default useAxiosAuth;
