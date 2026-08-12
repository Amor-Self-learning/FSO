import type { PartProps } from "../types";

const Part = (props: PartProps) => {
  return <p>{props.part.name} {props.part.exercises}</p>
}

export default Part;