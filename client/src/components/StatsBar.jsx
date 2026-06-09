function StatsBar({ stats }) {
    if(!stats || !stats.totalCategory){
        return <p>Loading stats...</p>
    }

    return (
        <>
            <p>Total Products : {stats.total}</p>
            <p>Number of product which stock is low : {stats.lowStock}</p>
            <ul>
                {Object.keys(stats.totalCategory).map(key => (
                    <li key={key}>{key} {stats.totalCategory[key]}</li>
                ))}
            </ul>
        </>
    )
}

export default StatsBar