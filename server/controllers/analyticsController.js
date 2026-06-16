import Product from "../models/Product.js";
import User from "../models/User.js";
import Setting from "../models/Setting.js";

export const getDashboardAnalytics = async (req, res) => {
    try {
        const settings = await Setting.findOne();
        const lowStockThreshold = settings ? settings.lowStockThreshold : 5;

        const activeProductsQuery = {
            isActive: true
        };
        const lowStockQuery = {
            ...activeProductsQuery,
            stock: {
                $lte: lowStockThreshold
            }
        };

        const totalProducts = await Product.countDocuments(activeProductsQuery);
        const totalUsers = await User.countDocuments();
        const lowStockProducts = await Product.countDocuments(lowStockQuery);
        const categories = await Product.aggregate([
            {
                $match: activeProductsQuery
            },
            {
                $group: {
                    _id: "$category",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);
        const lowStockItems = await Product.find(lowStockQuery)
            .select("name stock category")
            .sort({
                stock: 1
            })
            .limit(5);
        return res.status(200).json({
            success: true,
            message: "Analytics fetched successfully.",
            data: {
                totalUsers,
                totalProducts,
                lowStockProducts,
                categories,
                lowStockItems
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
