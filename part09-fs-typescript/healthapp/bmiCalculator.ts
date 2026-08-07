const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / (height / 100.0)**2;
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Range';
  if (bmi < 30) return 'Overweight';
  else return 'Obese';
}

if (process.argv.length !== 4) {
  console.error('Invalid number of arguments.');
  process.exit(1);
}

let height: number, weight: number;
try {
  height = Number(process.argv[2]);
  weight = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch (error : unknown) {
  console.error(`Something went wrong. `, error instanceof Error ? error.message: '');
  process.exit(2);
}