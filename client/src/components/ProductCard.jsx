function ProductCard({ product, onDelete, onUpdateStock }) {
    return (
        <tr >
            <td> { product.name }  </td>
            <td style={{textAlign:"right"}}> { product.price } </td>
            <td> { product.category } </td>
            <td style={{textAlign:"right"}}> { product.stock } </td>
            <td><button onClick={() => (onDelete(product._id))}>Delete</button></td>
            <td><button onClick={() => {
                let newStock = Number(prompt(`Enrer new stock of ${product.name}`));
                if (!isNaN(newStock) && newStock >= 0){
                    onUpdateStock(product._id, newStock);
                }
            }}> Update Stock </button></td>
        </tr>
    )
}

export default ProductCard