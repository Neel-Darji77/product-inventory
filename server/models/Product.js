import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        stock: {
            type: Number,
            required: [true, "Stock is required"],
            default: 0
        },
        description: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
 
export default mongoose.model("Product", productSchema);