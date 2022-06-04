import { Button } from "antd";
import {
  ClockRange,
  JulianDate,
  SampledPositionProperty,
  Math as CMath,
  Cartesian3,
  Color,
  PolylineGlowMaterialProperty,
  TimeIntervalCollection,
  TimeInterval,
} from "cesium";
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Entity, useCesium, PathGraphics, PointGraphics } from "resium";
import { uavPlanPathPointColAtom } from "../../store/map";

const ColorCol = [
  new Color(0, 153 / 255, 204 / 255),
  new Color(255.0 / 255.0, 102 / 255, 102 / 255),
  new Color(1, 1, 204 / 255),
  Color.WHITE,
];
function computePathFlight(
  start: JulianDate,
  pathPositionCol: number[],
  viewer: Viewer,
  color: Color
) {
  console.log(pathPositionCol);
  const property = new SampledPositionProperty();
  for (let i = 0; i < pathPositionCol.length; i += 2) {
    const time = JulianDate.addSeconds(start, i * 20, new JulianDate());
    const position = Cartesian3.fromDegrees(
      pathPositionCol[i],
      pathPositionCol[i + 1],
      100
    );
    property.addSample(time, position);
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: color,
        // color: Color.TRANSPARENT,
        // outlineColor: color,
        // outlineWidth: 3,
      },
    });
  }
  return property;
}

const ViewUavVisual: React.FC<{ pathPositionCol: number[]; color: Color }> = ({
  pathPositionCol,
  color,
}) => {
  const cesium = useCesium();
  const [positionProperty, setPositionProperty] =
    useState<SampledPositionProperty>();
  const start = JulianDate.fromDate(new Date(2015, 2, 25, 16));
  const stop = JulianDate.addSeconds(
    start,
    pathPositionCol.length * 20,
    new JulianDate()
  );
  const positionCol: Cartesian3[] = [];
  for (let i = 0; i < pathPositionCol.length; i += 2) {
    positionCol.push(
      Cartesian3.fromDegrees(pathPositionCol[i], pathPositionCol[i + 1], 100)
    );
  }
  useEffect(() => {
    if (cesium.viewer) {
      cesium.viewer.clock.startTime = start.clone();
      cesium.viewer.clock.stopTime = stop.clone();
      cesium.viewer.clock.currentTime = start.clone();
      cesium.viewer.clock.clockRange = ClockRange.LOOP_STOP; //Loop at the end
      cesium.viewer.clock.multiplier = 10;
      cesium.viewer.timeline.zoomTo(start, stop);
      setPositionProperty(
        computePathFlight(start, pathPositionCol, cesium.viewer, color)
      );
    }
  }, []);
  return (
    <>
      <Entity
        position={positionProperty}
        model={{
          uri: "./models/Quadcopter.glb",
          minimumPixelSize: 128,
          maximumScale: 20000,
        }}
        show={true}
        viewFrom={new Cartesian3(-2080, -1715, 2000) as any}
        availability={
          new TimeIntervalCollection([
            new TimeInterval({
              start: start,
              stop: stop,
            }),
          ])
        }
        // orientation={new VelocityOrientationProperty(positionProperty)}
        description={"hello"}
      >
        <PathGraphics show={true} resolution={1} material={color} width={2} />
      </Entity>
    </>
  );
};

const ViewUavVisualCol: React.FC<{}> = ({}) => {
  const uavPlanPathPointCol = useRecoilValue(uavPlanPathPointColAtom);
  return (
    <>
      {uavPlanPathPointCol.length > 0 ? (
        uavPlanPathPointCol.map((item, index) => {
          return (
            <ViewUavVisual
              pathPositionCol={item}
              color={ColorCol[index]}
            ></ViewUavVisual>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewUavVisualCol;
