import axios from "axios"

const baseURL = 'https://bisi-capstone-project-2023.azurewebsites.net/backend';

export default {
    healthCheck: {
        get: () => axios.get(
            `${baseURL}/health-check/`,
        ),
    },
};
