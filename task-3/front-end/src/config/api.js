import Axios from "axios";
export const axios = Axios.create({
    baseURL: process.env.REACT_APP_DOG_REALM_API
});
