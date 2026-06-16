import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StatCard from "../components/analytics/StatCard";

import { getDashboardAnalytics } from "../services/analyticsService";

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response =
                await getDashboardAnalytics();
            setAnalytics(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-gray-500">
                    Loading analytics...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Analytics Dashboard
                </h1>
                <p className="mt-2 text-gray-500">
                    Inventory overview and statistics
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Products"
                    value={analytics.totalProducts}
                />
                <StatCard
                    title="Total Users"
                    value={analytics.totalUsers}
                />
                <StatCard
                    title="Low Stock"
                    value={analytics.lowStockProducts}
                />
                <StatCard
                    title="Categories"
                    value={
                        analytics.categories.length
                    }
                />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold">
                        Category Distribution
                    </h2>
                    <div className="space-y-5">
                        {analytics.categories.map(
                            (category) => (
                                <div key={category._id}>
                                    <div className="mb-2 flex justify-between">
                                        <span>
                                            {category._id}
                                        </span>
                                        <span>
                                            {category.count}
                                        </span>
                                    </div>
                                    <div className="h-3 rounded-full bg-gray-200">
                                        <div
                                            className="h-3 rounded-full bg-green-500"
                                            style={{
                                                width: `${category.count * 5}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold">
                        Low Stock Products
                    </h2>
                    <div className="space-y-4">
                        {analytics.lowStockItems.map(
                            (product) => (
                                <div
                                    key={product._id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {product.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {product.category}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                                        {product.stock}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;