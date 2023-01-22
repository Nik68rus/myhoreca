export const getColor = (colorNum: number, colors: number) => {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return 'hsl(' + ((colorNum * (360 / colors)) % 360) + ',100%,50%)';
};
