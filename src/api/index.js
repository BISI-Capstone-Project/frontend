import axios from "axios"

const rawURL = 'https://bisi-capstone-project-2023.azurewebsites.net';
const baseURL = `${rawURL}/backend`;

export default {
    healthCheck: {
        get: () => axios.get(
            `${baseURL}/health-check/`,
        ),
    },
    extract: () => axios.get(`${baseURL}/extract/`),
    ml: () => axios.get(`${baseURL}/ml/`),
    eda: () => axios.get(`${baseURL}/eda/`),
    edaFile: () => axios.get(`${rawURL}/static/output.html`),
};
