import { useRef, useState } from "react"

function AddProductForm({ onAdd }) {

    const [error, setError] = useState("");

    const nameRef = useRef(null);
    const priceRef = useRef(0);
    const categoryRef = useRef(null);
    const stockRef = useRef(0);

    function handleSubmit(e){
        e.preventDefault();
        let name = nameRef.current.value;
        let price = priceRef.current.value;
        let category = categoryRef.current.value;
        let stock = stockRef.current.value;

        if( name.trim() === "" || category.trim() === "" || isNaN(price) || isNaN(stock) || price < 0 || stock < 0){
            setError("Enter valid product's description.")
            return;
        }
        onAdd(name, price, category, stock);

        nameRef.current.value = "";
        priceRef.current.value = "";
        categoryRef.current.value = "";
        stockRef.current.value = "";
        setError("");
    }

    return (
        <>
            <form  onSubmit={handleSubmit}>
                <label htmlFor="name">Name : </label>
                <input type="text" ref={nameRef} name="name" placeholder="Enter Product Name"/>
                <label htmlFor="price" style={{marginLeft:"4%"}}>Price : </label>
                <input type="number" ref={priceRef} name="price" placeholder="Enter Price"/>
                <label htmlFor="category" style={{marginLeft:"4%"}}>Category : </label>
                <input type="text" ref={categoryRef} name="category" placeholder="Enter Category"/>
                <label htmlFor="stock" style={{marginLeft:"4%"}}>Stock : </label>
                <input type="number" ref={stockRef} name="stock" placeholder="Number of item of product which you have"/>
                <button type="submit" style={{marginLeft:"4%"}}>Add</button>
                {error && <p style={{color:"red"}}>{error}</p>}
            </form>
        </>
    )
}

export default AddProductForm