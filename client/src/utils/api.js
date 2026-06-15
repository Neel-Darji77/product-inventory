import BASE_URL from "../config";

const api = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...options.headers
        },
        ...options
    };

    const response = await fetch(`${BASE_URL}${url}`, config);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
};

export default api;