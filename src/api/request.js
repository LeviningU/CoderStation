import axios from "axios";

const service = axios.create({
    timeout: 5000
});

service.interceptors.request.use(
    config => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    }
);

service.interceptors.response.use(
    response => {
        return response.data;
    }
);

export default service;