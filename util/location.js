const GOOGLE_API_KEY = "we dont have any API_KEY";

export const getMapPreview = (lat, lng) => {
    // get image url
    const imagePreviewUrl = `we dont have any url ${lat} , ${lng}`;
    return imagePreviewUrl;
};

export const getAddress = async () => {
    const url = "we dont have ";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch address");
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
};
