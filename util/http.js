import axios from "axios";

const STATE_URL = "https://iran-locations-api.vercel.app/api/v1/";

// get all the states
export const getAllStates = async () => {
    const response = await axios.get(`${STATE_URL}states`);
    const data = response.data;
    return data;
};

// get the cities of a state
export const getCities = async (state) => {
    const response = await axios.post(`${STATE_URL}cities?state=${state}`);
    const data = response.data;
    return data;
};
