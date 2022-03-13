import axios from "axios";

const BASE_URL = "https://api.openweathermap.org";

const config = {
    baseURL: BASE_URL,
    params: {
        appid: "18a5ebbc1e1b01c77ea84300e20979c8",
    },
};

const api = axios.create(config);

export default api;
