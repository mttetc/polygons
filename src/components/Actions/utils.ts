import { Polygon } from '@/protobuf/polygon_pb';
import { nanoid } from '@reduxjs/toolkit';

// my attempt with the algorith, I couldn't get it to be 100% working
export function mergePolygons(polygon1: Polygon, polygon2: Polygon) {
  const mergedPoints = [...polygon1.points, ...polygon2.points];

  const uniquePoints = removeIntersectingPoints(mergedPoints, [
    polygon1,
    polygon2,
  ]);

  const closedPolygon = closePolygon(uniquePoints);

  return {
    id: nanoid(),
    name: `Polygon merged`,
    points: closedPolygon,
    isSelected: false,
  };
}

export function removeIntersectingPoints(
  points: number[],
  polygons: Polygon[],
) {
  // Calculate the center of the points
  let centerX = 0;
  let centerY = 0;
  for (let i = 0; i < points.length; i += 2) {
    centerX += points[i];
    centerY += points[i + 1];
  }
  centerX /= points.length / 2;
  centerY /= points.length / 2;

  // Create an array of points and their angles
  const pointsWithAngles = [];
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i];
    const y = points[i + 1];
    const angle = Math.atan2(y - centerY, x - centerX);
    pointsWithAngles.push({ x, y, angle });
  }

  // Sort the points by their angle
  pointsWithAngles.sort((a, b) => a.angle - b.angle);

  // Remove intersecting points
  const outlinePoints: number[] = [];
  pointsWithAngles.forEach(({ x, y }) => {
    const point = [x, y];
    if (!polygons.every((polygon) => isInsidePolygon(point, polygon.points))) {
      outlinePoints.push(x, y);
    }
  });

  return outlinePoints;
}

function isInsidePolygon(point: number[], polygonPoints: number[]) {
  const epsilon = 0.0001;
  const randomOffset = [Math.random() * epsilon, Math.random() * epsilon];
  const offsetPoint = [point[0] + randomOffset[0], point[1] + randomOffset[1]];

  let inside = false;
  for (
    let i = 0, j = polygonPoints.length - 2;
    i < polygonPoints.length;
    j = i, i += 2
  ) {
    const xi = polygonPoints[i];
    const yi = polygonPoints[i + 1];
    const xj = polygonPoints[j];
    const yj = polygonPoints[j + 1];
    const intersect =
      yi > offsetPoint[1] !== yj > offsetPoint[1] &&
      offsetPoint[0] < ((xj - xi) * (offsetPoint[1] - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function closePolygon(points: number[]) {
  return [...points, points[0], points[1]];
}
