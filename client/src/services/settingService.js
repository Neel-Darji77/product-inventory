import api from "../utils/api";

export const getSettings = async () => {
    return await api("/api/settings");
};

export const updateSettings = async (settingsData) => {
    return await api("/api/settings", {
        method: "PATCH",
        body: JSON.stringify(settingsData)
    });
};