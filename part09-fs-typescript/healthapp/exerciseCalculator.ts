interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calclateExercises = (days: number[], target: number): Result => {
  let trainingDays = 0;
  let success = false;
  let total = 0;

  for (const day of days) {
    if (day !== 0) trainingDays++;
    total += day;
  }
  const average = total / days.length;
  let rating = 0;
  let ratingDescription = 'Too Bad';
  if (average >= target) {
    success = true;
    rating = 3;
    ratingDescription = 'Good Performance';
  } else if (3 * average >= 2 * target) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else if (2 * average >= target) {
    rating = 1;
    ratingDescription = 'Poor Performance';
  }
  return {
    periodLength: days.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv[1] === import.meta.filename) {
  if (process.argv.length < 4) {
    console.error('Invalid number of arguments.');
    process.exit(1);
  }

  let target: number;
  let days: number[];

  try {
    target = Number(process.argv[2]);
    days = process.argv.slice(3,).map(day => Number(day));
    console.log(calclateExercises(days, target));
  } catch (error : unknown) {
    console.error(`Something went wrong. `, error instanceof Error ? error.message: '');
    process.exit(2);
  }
}

export interface ExerciseReq {
  daily_exercises: [string] | [number],
  target: string | number,
}

export default calclateExercises;