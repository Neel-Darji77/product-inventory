import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import connectDB from './config/db.js';
import dotenv from "dotenv/config";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


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
app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.url} not found` });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✓ Server running at http://localhost:${PORT}`);
  });
}

