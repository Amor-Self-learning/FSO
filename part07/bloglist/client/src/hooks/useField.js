import { useState } from 'react';

const useField = (type, label, name) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };
  return {
    data: {
      type,
      label,
      name,
      value,
      onChange,
    },
    reset,
  };
};

export default useField;
