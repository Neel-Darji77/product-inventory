import api from "../utils/api";

export const getDashboardAnalytics = async () => {
    return await api("/api/analytics/dashboard");
};