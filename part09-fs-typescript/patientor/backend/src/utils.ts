import { z } from 'zod';
const Gender = ['male', 'female', 'other'];
const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
};
const HealthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk),
]);
export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(['HealthCheck', 'OccupationalHealthcare', 'Hospital'])
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: HealthCheckRatingSchema
});

export const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string()
});

export const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date()
});

export const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional()
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: DischargeSchema
});