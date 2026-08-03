import { useAnecdoteActions } from '../store';

const Filter = () => {
  const { setFilter } = useAnecdoteActions();
  const addFilter = e => {
    e.preventDefault();
    setFilter(e.target.value);
  }
  return (
      <label style={{marginBottom: '1rem'}} htmlFor='filter'>Filter: 
        <input id='filter' type='text' onChange={addFilter} name='filter' />
      </label>
  )
}

export default Filter;