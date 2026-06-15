import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({
            role: ROLES.ADMIN
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await User.create({
            name: "System Administrator",
            email: "admin@inventory.com",
            password: hashedPassword,
            role: ROLES.ADMIN,
            isActive: true
        });

        console.log("Admin account created successfully.");

        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

seedAdmin();