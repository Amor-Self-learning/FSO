import type { ContentProps } from "../types";

const Total = (props : ContentProps) => {
    return <p>Number of exercises {props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exerciseCount, 0)}</p>
}

export default Total;