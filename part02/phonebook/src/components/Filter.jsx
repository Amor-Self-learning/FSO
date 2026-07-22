const Filter = ({filter, setFilter}) => {
  return (
    <div>
        filter shown by : <input  value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>  
  )
}

export default Filter;