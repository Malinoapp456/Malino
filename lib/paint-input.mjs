/** Properties shared by brush, eraser, and magic brush for a single tap. */
export function dabStyle(tool, color, hue = 0) {
  if (tool === "eraser") {
    return { radius: 15, composite: "destination-out", fill: "#000000" };
  }
  if (tool === "magic") {
    return { radius: 9, composite: "source-over", fill: `hsl(${((hue % 360) + 360) % 360} 92% 58%)` };
  }
  return { radius: 8, composite: "source-over", fill: color };
}
