import { z } from 'zod';
import { Gender, type NewPatientEntry } from './types.ts';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export const parseNewPatient = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};