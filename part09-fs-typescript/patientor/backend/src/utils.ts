import { GenderValues, type Gender } from './types.ts';

const isString = (text: unknown) : text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param : string): param is Gender => {
  return (Object.values(GenderValues) as string[]).includes(param);
};

const parseGender = (value: unknown) : string => {
  if (isString(value) && isGender(value)) {
    return value;
  };
  throw new Error (`Invalid gender ${value}`);
};

const parseString = (value: unknown) : string => {
  if (isString(value)) return value;
  throw new Error(`Invalid String ${value}`);
};

const parseDate = (value: unknown) : string => {
  if (isString(value) && !Number.isNaN(Date.parse(value))) return value;
  throw new Error (`Invalid date ${value}`);
};

export { parseGender, parseDate, parseString };
