import diagnosis from '../../data/diagnoses.ts';
import type { DiagnosisEntry, NonSensitiveDiagnosisEntry } from '../types.ts';

const getAll = () : DiagnosisEntry [] => {
  return diagnosis;
};

const getNonSensitiveDiagnosis = () : NonSensitiveDiagnosisEntry [] => {
  return diagnosis.map(({ code, name }) => ({
    code, name
  }));
};

export {
  getAll,
  getNonSensitiveDiagnosis
};