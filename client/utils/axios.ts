import axios from "axios";

const instance = axios.create({
    baseURL:`https://ave-dating-site.herokuapp.com`
});

export default instance; 