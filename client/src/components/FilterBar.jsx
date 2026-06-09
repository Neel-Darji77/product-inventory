function FilterBar({ search, onSearch, category, onCategory }) {
    return (
        <>  
            <label htmlFor="search">Search : </label>
            <input type="text" name="search" id="search" value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Product Name" />
            <label htmlFor="category" style={{marginLeft:"4%"}}>Category : </label>
            <select name="category" id="category" value={category} onChange={(e) => onCategory(e.target.value)}>
                <option value="all">all</option>
                <option value="Electronics">Electronics</option>
                <option value="Stationery">Stationery</option>
                <option value="Furniture">Furniture</option>
            </select>
        </>
    )
}

export default FilterBar