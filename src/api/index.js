import axios from "axios"

const rawURL = 'https://bisi-capstone-project-2023.azurewebsites.net';
const baseURL = `${rawURL}/backend`;

export default {
    healthCheck: {
        get: () => axios({
            method: 'get',
            url: `${baseURL}/health-check/`,
            timeout: 5000,
            signal: AbortSignal.timeout(5000),
        })
    },
    extract: () => axios.get(`${baseURL}/extract/`),
    ml: () => axios.get(`${baseURL}/ml-cache/`),
    runMml: () => axios.get(`${baseURL}/ml/`),
    eda: () => axios.get(`${baseURL}/eda/`),
    edaFile: () => axios.get(`${rawURL}/static/output.html`),
    weatherForecast: () => axios.get(`${baseURL}/weather-forecast/`),
};
