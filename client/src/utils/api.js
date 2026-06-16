import BASE_URL from "../config";

const api = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const { headers, ...restOptions } = options;
    const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
    const normalizedUrl = url.replace(/^\/+/, "");

    const config = {
        ...restOptions,
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`
            }),
            ...headers
        }
    };

    const response = await fetch(
        `${normalizedBaseUrl}/${normalizedUrl}`,
        config
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
};

export default api;
