export interface HeaderProps {
  name: string,
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescription extends CoursePartBase{
  description: string
}
interface CoursePartBasic extends CourseWithDescription {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CourseWithDescription {
  requirements: string [],
  kind: 'special'
};

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


export interface ContentProps {
  parts:  CoursePart []
};