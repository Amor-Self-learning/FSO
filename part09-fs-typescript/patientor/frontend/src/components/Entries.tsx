import { apiBaseUrl } from '../constants.ts';
import type { Diagnosis, Entry } from '../types.ts';
import { useState, useEffect } from 'react';
import EntryElem from './Entry';

const Entries = ({entries} : {entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const res = await fetch(`${apiBaseUrl}/diagnoses`);
      setDiagnoses( await res.json());
    };
    fetchDiagnoses();
  }, []);
  const diagnosisString = (code : string) : string | undefined => {
    return diagnoses.find(d => d.code === code)?.name;
  };

  return (
    <>
    <h3>Entries:</h3>
      {entries.map(entry => (
        <div key={entry.id}>
          <EntryElem entry={entry} diagnosisString={diagnosisString}/>
        </div>
      ))}
    </>
  );
};

export default Entries;