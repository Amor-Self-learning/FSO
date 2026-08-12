import type { DiaryEntry } from '../../../backend/src/types.ts';

const Diaries = ({ diaries } : { diaries: DiaryEntry[] }) => {
  return(
    <ol>
      {diaries.map((diary) =>
        <li key={diary.id}>
          <ul>
            <li>Date: {diary.date}</li>
            <li>Visibility: {diary.visibility}</li>
            <li>Weather: {diary.weather}</li>
          </ul>
        </li>
      )}
    </ol>
  )
}
export default Diaries;