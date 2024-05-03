import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addPolygon } from '@/store/slices/polygon';
import { nanoid } from '@reduxjs/toolkit';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useState } from 'react';

export const useDrawing = () => {
  const dispatch = useAppDispatch();
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<number[]>([]);

  const polygons = useAppSelector((state) => state.polygons);

  const createPolygon = () => {
    if (points.length <= 4) return;
    const polygonPoints = [...points, points[0], points[1]];
    dispatch(
      addPolygon({
        id: nanoid(),
        name: `Polygon ${polygons.length + 1}`,
        points: polygonPoints,
        isSelected: false,
      }),
    );
    setPoints([]);
  };

  const handleEvent = (
    e: KonvaEventObject<MouseEvent | TouchEvent>,
    isDrawing: boolean,
  ) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;
    if (isDrawing) {
      setPoints((prevPoints) => [
        ...prevPoints,
        pointerPosition.x,
        pointerPosition.y,
      ]);
    } else {
      setPoints([pointerPosition.x, pointerPosition.y]);
    }
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target instanceof Konva.Line) return;
    setIsDrawing(true);
    handleEvent(e, false);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target instanceof Konva.Line) return;
    if (!isDrawing) return;
    handleEvent(e, true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    createPolygon();
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
    createPolygon();
  };

  const handleTouchStart = (e: KonvaEventObject<TouchEvent>) => {
    if (e.target instanceof Konva.Line) return;
    setIsDrawing(true);
    handleEvent(e, false);
  };

  const handleTouchMove = (e: KonvaEventObject<TouchEvent>) => {
    if (e.target instanceof Konva.Line) return;
    if (!isDrawing) return;
    handleEvent(e, true);
  };

  return {
    isDrawing,
    points,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchMove,
    handleTouchStart,
  };
};
