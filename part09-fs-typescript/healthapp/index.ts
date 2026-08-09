import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calclateExercises from './exerciseCalculator.ts';
import type { ExerciseReq } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (height && weight && !isNaN(Number(height)) && !isNaN(Number(weight))) {
    return res.json({
      height: Number(height),
      weight: Number(weight),
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } else {
    res.status(400).json({ error: 'malformatted parameters'});
  }
});

app.post("/exercises", (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'parameters missing' });
  const { daily_exercises, target } = req.body as ExerciseReq;
  if (!daily_exercises || !Array.isArray(daily_exercises) || ! target) return res.status(400).json({ error: 'parameters missing' });
  if (isNaN(Number(target))) return res.status(400).json({ error: 'malformatted parameters'});
  for (let i = 0; i < daily_exercises.length; i++){
    const num = Number(daily_exercises[i]);
    if (isNaN(num)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
    daily_exercises[i] = num;
  }
  return res.json(calclateExercises(daily_exercises as [number], Number(target)));
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
