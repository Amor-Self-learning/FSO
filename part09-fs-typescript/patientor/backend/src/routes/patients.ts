import express, { type Response } from 'express';
import { getNonSensitivePatients, getPatientById }  from '../services/patientsService.ts';
import type { NonSensitivePatientEntry } from '../types.ts';
import { HealthCheckEntrySchema, HospitalEntrySchema, NewPatientSchema, OccupationalHealthcareSchema } from '../utils.ts';
import { v4 as uuid } from 'uuid';
import { ZodError } from 'zod';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res : Response<NonSensitivePatientEntry []>) => {
  res.json(getNonSensitivePatients());
});

patientsRouter.post('/', (req, res ) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    return res.json({
      id: uuid(),
      ...newPatient,
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).send({ error: e.issues});
    } else {
      return res.status(400).send({ error: 'unkown error'});
    }
  }
});

patientsRouter.get('/:id', (req, res) => {
  const patient = getPatientById(req.params.id);
  if (patient) return res.json(patient);
  return res.status(404).json({ error: 'Patient Not found'});
});

patientsRouter.post('/:id/entries', (req, res) => {
  const patient = getPatientById(req.params.id);
  const body = req.body as unknown;
  if (!patient) {
    res.status(400).json({
      error: 'Invalid Patient Id',
    });
  } else if (!body || typeof body !== 'object') {
      res.status(400).json({
        error: 'Missing Body'
      });
      console.error(body);
  } else if ('type' in body && typeof body.type === 'string') {
    if (body.type === 'HealthCheck') {
      try {
        const data = HealthCheckEntrySchema.parse({id: uuid(), ...body});
        res.json(data);
      } catch (e) {
        if (e instanceof ZodError) {
          res.status(400).json({
            error: e.issues
          });
        } else {
          res.status(400).json({
            error: 'Unknown Error'
          });
          console.error(body, e);
        }
      }
    }
    else if (body.type === 'OccupationalHealthCare') {
      try {
        const data = OccupationalHealthcareSchema.parse({id: uuid(), ...body});
        res.json(data);
      } catch (e) {
        if (e instanceof ZodError) {
          res.status(400).json({
            error: e.issues
          });
        } else {
          res.status(400).json({
            error: 'Unknown Error'
          });
        }
      }
    }
    else if (body.type === 'Hospital') {
      try {
        const data = HospitalEntrySchema.parse({id: uuid(), ...body});
        res.json(data);
      } catch (e) {
        if (e instanceof ZodError) {
          res.status(400).json({
            error: e.issues
          });
        } else {
          res.status(400).json({
            error: 'Unknown Error'
          });
        }
      }
    } else {
      res.status(400).json({
        error: `Unknown Entry Type ${body.type}`
      });
    }
  }
});

export default patientsRouter;