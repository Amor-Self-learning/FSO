import express, { type Response } from 'express';
import { getNonSensitivePatients }  from '../services/patientsService.ts';
import type { NonSensitivePatientEntry } from '../types.ts';
import { NewPatientSchema } from '../utils.ts';
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

export default patientsRouter;