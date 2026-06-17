import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";

function ProductList({
    products,
    onDeleteClick,
    onUpdateClick,
}) 
{
    return (
        <div className="p-5">
            <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {
                        products.map((product) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: 100,
                                }}
                                transition={{
                                    duration: .25,
                                }}
                            >
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onDeleteClick={onDeleteClick}
                                    onUpdateClick={onUpdateClick}
                                />
                            </motion.div>
                        ))
                    }
                </div>
            </AnimatePresence>
        </div>
    );
}

export default ProductList;