/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Cartesian3,
    Viewer as CesiumViewer,
    ScreenSpaceEventHandler,
    defined,
  } from "cesium";
  import { useEffect, useRef, useState } from "react";
  import { useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
  import {
    Viewer,
    ImageryLayer,
    CameraFlyTo as CesiumCameraFlyTo,
    CesiumComponentRef,
    CesiumMovementEvent,
    Clock,
  } from "resium";
import * as turf from "@turf/turf";
import { selectTaskAtom } from "../../../store/task";

const FireMapView: React.FC<{}> = () => {
  

  return(
    <></>
  );
}

export default FireMapView;