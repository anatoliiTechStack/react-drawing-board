enum Tool {
  Select = 'Select',
  Stroke = 'Stroke',
  Shape = 'Shape',
  Text = 'Text',
}

export enum ShapeType {
  Rectangle = 'Rectangle',
  Oval = 'Oval',
} 

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const strokeSize = [2, 4, 6];

export const strokeColor = ['#4a4a4a', '#f55b6c', '#f7c924', '#63d321', '#50e3c2', '#59b9ff', '#bd10e0', '#ffffff'];

export const defaultToolOption = {
  strokeSize: strokeSize[1],
  strokeColor: strokeColor[0],
  shapeType: ShapeType.Rectangle,
  shapeBorderColor: strokeColor[0],
  shapeBorderSize: 4,
  textColor: strokeColor[0],
} 

export type ToolOption = {
  strokeSize: number,
  strokeColor: string,
  shapeType: ShapeType,
  shapeBorderColor: string,
  shapeBorderSize: number,
  textColor: string,
};

export default Tool;