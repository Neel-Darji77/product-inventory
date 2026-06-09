import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);

        console.log(`MongoDB Connected : ${conn.connection.host}`);

        mongoose.connection.on("disconnected", () => {
            console.error("✗ MongoDB disconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.error(`✗ MongoDB error: ${err.message}`);
        });

        mongoose.connection.on("reconnected", () => {
            console.log("✓ MongoDB reconnected");
        });
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;