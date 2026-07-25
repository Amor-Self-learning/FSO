const Filter = ({filter, setFilter}) => {
  return (
    <div className="input-div">
        <label htmlFor="filter">Filter Shown By:</label>
        <input id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>  
  )
}

export default Filter;