
import {Cartesian3} from "cesium";
import { useState } from "react";
import { Viewer, ImageryLayer, CameraFlyTo, CameraLookAt} from "resium";
import { osm,osmStyle } from "./mapConfig";

const NewMapViewer : React.FC<{}> = () => {
  const [cameraDestination, setCameraDestination] = useState<Cartesian3>(
    Cartesian3.fromDegrees(114.360734, 30.541093, 5000)
  );
  
  return (
    <>
    <Viewer
      imageryProvider={osm}
      style={{ height: window.innerHeight }}
      onMouseDown={(e) => {}}
      infoBox={false}
    >
      <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
      <CameraFlyTo destination={cameraDestination}></CameraFlyTo>
      {/* <CameraLookAt target={cameraDestination} offset={{x:20, y : 20,z:10} as any}></CameraLookAt> */}
    </Viewer>
    </>
  )
}

export default NewMapViewer;