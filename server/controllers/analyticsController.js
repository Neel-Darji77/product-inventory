import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardAnalytics = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const lowStockProducts = await Product.countDocuments({
            stock: {
                $lte: 10
            }
        });
        const categories = await Product.aggregate([
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
        const lowStockItems = await Product.find({
            stock: {
                $lte: 10
            }
        })
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