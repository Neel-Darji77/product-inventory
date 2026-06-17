import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from "dotenv/config";
import productsRouter from './routes/products.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import analyticsRoutes from "./routes/analyticsRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));


async function startServer() {
   try{
        await connectDB();
        console.log(`Server is runnig at http://localhost:${PORT}`);
   } catch (error) {
        console.error(`Failed to start server : ${error.message}`);
        process.exit(1);
   }
}

startServer()

// connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRouter);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.url} not found` });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✓ Server running at http://localhost:${PORT}`);
  });
}

export default app;