import axios from "axios";


const instance = axios.create({
    baseURL:`https://ave-dating-site.herokuapp.com`,
    // baseURL:`http://localhost:8000`,
    timeout:10000,
});

export default instance; 