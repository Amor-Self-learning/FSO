import diagnosis from '../../data/diagnoses.ts';
import type { DiagnosisEntry, NonSensitiveDiagnosisEntries } from '../types.ts';

const getAll = () : DiagnosisEntry [] => {
  return diagnosis;
};

const getNonSensitiveDiagnosis = () : NonSensitiveDiagnosisEntries [] => {
  return diagnosis.map(({ code, name }) => ({
    code, name
  }));
};

export {
  getAll,
  getNonSensitiveDiagnosis
};