export interface HeaderProps {
  name: string,
};

interface Part {
  name: string,
  exercises: number
};

export interface PartProps {
  part: Part
}

export interface ContentProps {
  parts: Part []
};