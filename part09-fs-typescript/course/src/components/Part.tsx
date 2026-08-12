import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = (props: { part: CoursePart}) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p>{props.part.description}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p>Project Exercises {props.part.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p>{props.part.description}</p>
          <p>{props.part.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p>{props.part.description}</p>
          <p>{props.part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(props.part);
  }
}

export default Part;