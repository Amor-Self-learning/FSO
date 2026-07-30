const ToggleButton = ({ options, value, setValue }) => {
  const handleToggle = () => {
    setValue(!value);
  };
  return <button className='small-btn' onClick={handleToggle}>{value ? options[0] : options[1]}</button>;
};

export default ToggleButton;