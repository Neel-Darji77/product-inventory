import api from "../utils/api";

export const loginUser = async (credentials) => {
    return await api("api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    });
};

export const getCurrentUser = async () => {
    return await api("api/auth/me");
};