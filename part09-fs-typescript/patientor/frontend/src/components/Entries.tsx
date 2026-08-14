import { apiBaseUrl } from '../constants.ts';
import type { Diagnosis, Entry } from '../types.ts';
import { useState, useEffect } from 'react';
import EntryElem from './Entry';

const Entries = ({entries} : {entries: Entry[] }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const res = await fetch(`${apiBaseUrl}/diagnosis`);
      setDiagnosis( await res.json());
    };
    fetchDiagnosis();
  }, []);
  const diagnosisString = (code : string) : string | undefined => {
    return diagnosis.find(d => d.code === code)?.name;
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