import express from "express";
// import { products, getNextId } from "../data/products.js";
import Product from "../models/Product.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorise.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", 
    authorize(
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.VIEWER
    ),
    async (req, res) => {
    // let active = products.filter(p => p.isActive);
    try { 
        const active = await Product.find({ isActive: true });
        res.json(active);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

function getTotalCategory(active) {
    return active.reduce((result, product) => {
        result[product.category] = (result[product.category] || 0) + product.stock;
        return result;
    }, {});
}

router.get("/stats", 
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER),
    async (req, res) => {
    // let active = products.filter(p => p.isActive);

    try { 
        const active = await Product.find({ isActive: true });

        let stats = {
            total: active.length,
            lowStock: active.filter(a => a.stock <= 5).length,
            totalCategory: getTotalCategory(active)
        };
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.get("/:id", 
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER),
    async (req, res) => {
    // let product = products.find(p => p.isActive && String(p.id) === req.params.id);
    try { 
        let product = await Product.findById(req.params.id);
        if (!product || !product.isActive) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.post("/", 
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    async (req, res) => {
    try { 
        let { name, price, category, stock } = req.body;
        let product = await Product.create({
            name,
            price: Number(price),
            category,
            stock: Number(stock),
            isActive: true,
        });
        // products.push(product);

        res.status(201).json({ message: "Product created", data: product });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.patch("/:id", 
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    async (req, res) => {
    try { 
        const { name, price, category, stock } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, stock },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // products[index] = { ...products[index], ...req.body };

        res.json({ message: "Product updated", data: product });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.patch("/:id/stock", 
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    async (req, res) => {
    try { 
        const { stock } = req.body;
        if (stock === undefined) {
            return res.status(400).json({ error: "Product's stock not found" });
        }
        if (stock < 0) {
            return res.status(400).json({ error: "Product's stock is not nagetive" });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { stock },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // products[index].stock = req.body.stock;
    
        res.json({ message: "Product's stock updated", data: product.stock });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

router.delete("/:id", 
    authorize(ROLES.ADMIN),
    async (req, res) => {
    try { 
        
        // products[index].isActive = false;
        const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
})

export default router;


/*
get     /api/products/          all products + filter
get     /api/products/stats     stats
get     /api/products/:id       one product                
post    /api/products/          new product
patch   /api/products/:id       update product
patch   /api/products/:id/stock update stock of product
delete  /api/products/:id       delete product
*/