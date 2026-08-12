import patients from '../../data/patients.ts';
import type { PatientEntry, NonSensitivePatientEntry } from '../types.ts';
import { v4 as uuid } from 'uuid';
import { parseString, parseGender, parseDate } from '../utils.ts';

const getAll = () : PatientEntry [] => {
  return patients;
};

const getNonSensitivePatients = () : NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const createPatient = (obj : unknown) : PatientEntry => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data.');
  }
  const id = uuid();
  if ('name' in obj && 'ssn' in obj &&'dateOfBirth' in obj && 'gender' in obj && 'occupation' in obj) {
    return ({
      id,
      name: parseString(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseString(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseString(obj.occupation)
    });
  } else {
    throw new Error('Invalid data or some fields are missing.');
  }
};

export {
  getAll,
  getNonSensitivePatients,
  createPatient
};