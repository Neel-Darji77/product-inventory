import api from "../utils/api";

export const getUsers = async () => {
    return await api("/api/users");
};

export const createUser = async (userData) => {
    return await api("/api/users", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const updateUserRole = async (userId, role) => {
    return await api(`/api/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role })
    });
};

export const toggleUserStatus = async (userId) => {
    return await api(`/api/users/${userId}/status`, {
        method: "PATCH"
    });
};

export const deleteUser = async (userId) => {
    return await api(`/api/users/${userId}`, {
        method: "DELETE"
    });
};