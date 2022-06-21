import React, { useEffect } from "react";
import { Entity, PointGraphics, PolygonGraphics, useCesium } from "resium";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isDrawSelectTaskBoundarySelector,
  selectTaskAtom,
} from "../../store/task";
import { Cartesian3, Color, ColorMaterialProperty } from "cesium";
import { cameraLookAtAtom } from "../../store/map";
const TaskBoundary: React.FC<{}> = () => {
  const selectTask = useRecoilValue(selectTaskAtom);
  const setCameraLookAt = useSetRecoilState(cameraLookAtAtom);
  const isDrawSelectTaskBoundary = useRecoilValue(
    isDrawSelectTaskBoundarySelector
  );
  useEffect(()=> {
    // cesiumRef.viewer?.entities.removeAll();
  }, [])
  useEffect(() => {
    if (selectTask.boundary.length > 0) {
      const centerPoint = [
        selectTask.boundary.reduce((prev, cur) => prev + cur[0], 0) /
          selectTask.boundary.length,
        selectTask.boundary.reduce((prev, cur) => prev + cur[1], 0) /
          selectTask.boundary.length,
      ];
      setCameraLookAt(
        Cartesian3.fromDegrees(centerPoint[0], centerPoint[1], 5000)
      );
    }
  }, [selectTask.Id]);
  return isDrawSelectTaskBoundary ? (
    <>
      <Entity>
        <PolygonGraphics
          hierarchy={
            Cartesian3.fromDegreesArray(selectTask.boundary.flat()) as any
          }
          height={0}
          material={new ColorMaterialProperty(Color.AZURE.withAlpha(0.7))}
        />
      </Entity>
      {selectTask.boundary.map((point) => {
        return(
        <Entity position={Cartesian3.fromDegrees(point[0], point[1], 0)}>
          <PointGraphics color={Color.WHITE} pixelSize={10} />
        </Entity>
        )
      })}
    </>
  ) : (
    <></>
  );
};

export default TaskBoundary;
