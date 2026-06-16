import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
            default: "Product Inventory Dashboard"
        },
        lowStockThreshold: {
            type: Number,
            required: true,
            default: 10
        },
        currency: {
            type: String,
            required: true,
            default: "INR"
        },
        theme: {
            type: String,
            enum: [
                "light",
                "dark"
            ],
            default: "light"
        },
        autoLogoutMinutes: {
            type: Number,
            default: 30
        }
    },
    {
        timestamps: true
    }
);

const Setting = mongoose.model(
    "Setting",
    settingSchema
);

export default Setting;