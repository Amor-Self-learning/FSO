import type { ContentProps } from "../types.js";
import Part from "./Part.jsx";

const Content =  (props : ContentProps) => {
    const parts = props.parts;
    return (
      <>
        {parts.map(part => <Part part={part} />)}
      </>
    )
}

export default Content;