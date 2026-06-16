import Setting from "../models/Setting.js";

export const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();

        if (!settings) {
            settings = await Setting.create({
                companyName:
                    "Product Inventory Dashboard"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Settings fetched successfully.",
            data: settings
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateSettings = async (
    req,
    res
) => {
    try {
        const { _id, __v, createdAt, updatedAt, ...updateData } = req.body;
        let settings = await Setting.findOne();

        if (!settings) {
            settings = await Setting.create(
                updateData
            );
        } else {
            settings = await Setting.findByIdAndUpdate(
                settings._id,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Settings updated successfully.",
            data: settings
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};