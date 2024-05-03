export function pointsToPairs(points: number[]) {
  const pairs = [];
  for (let i = 0; i < points.length; i += 2) {
    pairs.push([points[i], points[i + 1]]);
  }
  return [pairs];
}

export function pairsToPoints(pairs: number[][]) {
  const points = [];
  for (const pair of pairs) {
    points.push(pair[0], pair[1]);
  }
  return points;
}
