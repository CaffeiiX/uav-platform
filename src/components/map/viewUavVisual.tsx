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
import { useEffect, useState } from "react";
import { Entity, useCesium, PathGraphics } from "resium";

function computeCirclularFlight(
  start: JulianDate,
  lon: number,
  lat: number,
  radius: number,
  viewer: Viewer
) {
  const property = new SampledPositionProperty();
  for (let i = 0; i <= 360; i += 45) {
    const radians = CMath.toRadians(i);
    const time = JulianDate.addSeconds(start, i, new JulianDate());
    const position = Cartesian3.fromDegrees(
      lon + radius * 1.5 * Math.cos(radians),
      lat + radius * Math.sin(radians),
      CMath.nextRandomNumber() * 500 + 1750
    );
    property.addSample(time, position);

    //Also create a point for each sample we generate.
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Color.TRANSPARENT,
        outlineColor: Color.YELLOW,
        outlineWidth: 3,
      },
    });
  }
  return property;
}

function computePathFlight(
  start: JulianDate,
  pathPositionCol: number[],
  viewer: Viewer,
  color: Color
) {
  // console.log(pathPositionCol);
  const property = new SampledPositionProperty();
  for (let i = 0; i < pathPositionCol.length; i += 2) {
    const time = JulianDate.addSeconds(start, i * 20, new JulianDate());
    if(isNaN(pathPositionCol[i])){
      continue;
    }
    const position = Cartesian3.fromDegrees(
      pathPositionCol[i],
      pathPositionCol[i + 1],
      CMath.nextRandomNumber() * 100 + 300
    );
    property.addSample(time, position);
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Color.TRANSPARENT,
        outlineColor: color,
        outlineWidth: 3,
      },
    });
  }
  return property;
}

const ViewUavVisual: React.FC<{ pathPositionCol: number[],
color: Color}> = ({
  pathPositionCol, color
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
          uri: "./models/CesiumDrone.glb",
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
        description={'hello'}
      >
        <PathGraphics
          show={true}
          material={
            new PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: color,
            })
          }
          width={10}
        />
      </Entity>
    </>
  );
};

export default ViewUavVisual;
