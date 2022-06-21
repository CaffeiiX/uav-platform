import {
  Cartesian3, CallbackProperty,
  ScreenSpaceEventHandler, Color,
  ColorMaterialProperty, HeightReference,
  PolygonHierarchy, ScreenSpaceEventType,
  Viewer as CesiumViewer, defined,
  ConstantPositionProperty
} from "cesium";
import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
// import Entity from "cesium/Source/DataSources/Entity";
import { CesiumMovementEvent } from "resium";
import { TaskInfoType } from "../interface/taskType";
import { drawPolygonRegionAtom, isDrawPolygonAtom, entitiesPropertiesAtom } from "../store/map";
import { isCreateTaskModalAtom, isModalShowAtom, isShowCreateTaskModalAtom } from "../store/modal";
import { selectTaskAtom } from "../store/task";
import { entitiesControlType } from "../types/Entity";
import { Cartesian3ToDegrees, getUuid } from "../utils/utils";

// import { ScreenSpaceEventHandler } from "resium";

const createPointEntity = (viewer: CesiumViewer, worldPosition:
  ConstantPositionProperty | Cartesian3 | undefined) => {
  const point = viewer.entities.add({
    position: worldPosition,
    point: {
      color: Color.WHITE,
      pixelSize: 5,
      heightReference: HeightReference.CLAMP_TO_GROUND,
    }
  });

  return point;
}

const createPolygonEntity = (viewer: CesiumViewer, positionData: any) => {
  const polygon = viewer.entities.add({
    polygon: {
      hierarchy: positionData,
      material: new ColorMaterialProperty(Color.WHITE.withAlpha(0.7))
    }
  });
  return polygon;
}

// const useMousePolygon = (viewer: CesiumViewer | undefined, mouseHandler: any) => {
//   const setIsShowModal = useSetRecoilState(isModalShowAtom);
//   const [isDrawPolygon, setIsDrawPolygon] = useRecoilState(isDrawPolygonAtom);
//   const setPolygonRegion = useSetRecoilState(drawPolygonRegionAtom);

//   const activePolygonPoints = useRef<Cartesian3[]>([]);
//   const activePolygon = useRef<any>(undefined);
//   const floatingPoint = useRef<any>(undefined);
//   // const [activePolygonPoints, setActivePolygonPoints] = useState<Cartesian3[]>([]);
//   // const [activePolygon, setActivePolygon] = useState<any>(undefined);
//   // const [floatingPoint, setFloatingPoint] = useState<any>(undefined);
//   useEffect(() => {
//     if (isDrawPolygon) {
//       mouseMoveMent();
//     }
//   }, [isDrawPolygon])
//   if (!viewer) return;
//   viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
//     ScreenSpaceEventType.LEFT_DOUBLE_CLICK
//   );
//   const mouseMoveMent = () => {
//     mouseHandler.current = new ScreenSpaceEventHandler(viewer.canvas);
//     mouseHandler.current.setInputAction((event: CesiumMovementEvent) => {
//       if (event.position) {
//         const ray = viewer.camera.getPickRay(event.position);
//         const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
//         if (defined(earthPosition)) {
//           if (activePolygonPoints.current.length === 0) {
//             floatingPoint.current = createPointEntity(viewer, earthPosition);
//             if (earthPosition) activePolygonPoints.current.push(earthPosition);
//             const dynamicPositions = new CallbackProperty(function () {
//               return new PolygonHierarchy(activePolygonPoints.current);
//             }, false);
//             activePolygon.current = createPolygonEntity(viewer, dynamicPositions);
//           }
//           if (earthPosition) {
//             activePolygonPoints.current.push(earthPosition);
//             createPointEntity(viewer, earthPosition)
//           }
//         }
//       }
//     }, ScreenSpaceEventType.LEFT_CLICK);
//     mouseHandler.current.setInputAction((event: CesiumMovementEvent) => {
//       if (event.endPosition) {
//         if (defined(floatingPoint)) {
//           const ray = viewer.camera.getPickRay(event.endPosition);
//           const newPosition = viewer.scene.globe.pick(ray, viewer.scene);
//           if (floatingPoint) {
//             floatingPoint.current.position.setValue(newPosition);
//             activePolygonPoints.current.pop();
//             if (newPosition) {
//               activePolygonPoints.current.push(newPosition);
//             }
//           }
//         }
//       }
//     }, ScreenSpaceEventType.MOUSE_MOVE);
//     mouseHandler.current.setInputAction((event: CesiumMovementEvent) => {
//       activePolygonPoints.current.pop();
//       createPolygonEntity(viewer, activePolygonPoints);
//       console.log(activePolygonPoints);
//       viewer.entities.remove(floatingPoint.current);
//       viewer.entities.remove(activePolygon.current);
//       setPolygonRegion(activePolygonPoints.current);
//       floatingPoint.current = undefined;
//       activePolygon.current = undefined;
//       activePolygonPoints.current = [];
//       setIsDrawPolygon(false);
//       setIsShowModal(true);
//     }, ScreenSpaceEventType.RIGHT_CLICK);
//   }

// }

function CesiumViewMouseEvent(viewer: CesiumViewer,
  handler: any,
  setIsDrawPolygon: (c: boolean) => void,
  setIsShowModal: (c: boolean) => void,
  setPolygonRegion: (c: Cartesian3[]) => void,
  setPolygonBoundary: (c: TaskInfoType) => void,
  entitiesProperties: entitiesControlType,
  setEntitiesProperties: (c: entitiesControlType) => void
) {
  let activePolygonPoints: Cartesian3[] = [];
  let activePolygon: any = undefined;
  let floatingPoint: any = undefined;
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  return function () {
    handler.current = new ScreenSpaceEventHandler(viewer.canvas);
    handler.current.setInputAction((event: CesiumMovementEvent) => {
      if (event.position) {
        const ray = viewer.camera.getPickRay(event.position);
        const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
        if (defined(earthPosition)) {
          if (activePolygonPoints.length === 0) {
            floatingPoint = createPointEntity(viewer, earthPosition);
            if (earthPosition) activePolygonPoints.push(earthPosition);
            const dynamicPositions = new CallbackProperty(function () {
              return new PolygonHierarchy(activePolygonPoints);
            }, false);
            activePolygon = createPolygonEntity(viewer, dynamicPositions);
          }
          if (earthPosition) {
            activePolygonPoints.push(earthPosition);
            createPointEntity(viewer, earthPosition)
          }
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
    handler.current.setInputAction((event: CesiumMovementEvent) => {
      if (event.endPosition) {
        if (defined(floatingPoint)) {
          const ray = viewer.camera.getPickRay(event.endPosition);
          const newPosition = viewer.scene.globe.pick(ray, viewer.scene);
          if (floatingPoint) {
            floatingPoint.position.setValue(newPosition);
            activePolygonPoints.pop();
            if (newPosition) {
              activePolygonPoints.push(newPosition);
            }
          }
        }
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);
    handler.current.setInputAction((event: CesiumMovementEvent) => {
      activePolygonPoints.pop();
      createPolygonEntity(viewer, activePolygonPoints);
      console.log(activePolygonPoints);
      // viewer.entities.remove(floatingPoint);
      // viewer.entities.remove(activePolygon);
      // viewer.entities.removeAll();
      setPolygonBoundary({
        Id: getUuid(),
        name: 'random',
        status: "0",
        date: '日期',
        boundary: activePolygonPoints.map(item => Cartesian3ToDegrees(item))
      });
      setEntitiesProperties({
        ...entitiesProperties,
        entitiesProperties: entitiesProperties.entitiesProperties.map(item =>
          item.key === 'taskBoundaryComponent' ? { ...item, 'visual': true } : item)
      });
      setPolygonRegion(activePolygonPoints);
      floatingPoint = undefined;
      // activePolygon = undefined;
      activePolygonPoints = [];
      setIsDrawPolygon(false);
      setIsShowModal(true);
    }, ScreenSpaceEventType.RIGHT_CLICK);
  }
}
const useMousePolygon = (viewer: CesiumViewer | undefined, mouseHandler: any) => {
  const isDrawPolygon = useRecoilValue(isDrawPolygonAtom);
  const setIsShowModal = useSetRecoilState(isModalShowAtom);
  const setIsDrawPolygon = useSetRecoilState(isDrawPolygonAtom);
  const setPolygonRegion = useSetRecoilState(drawPolygonRegionAtom);
  const isCreateTaskModal = useRecoilValue(isCreateTaskModalAtom);
  const setIsShowCreateTaskModal = useSetRecoilState(isShowCreateTaskModalAtom);
  const setSelectTask = useSetRecoilState(selectTaskAtom);
  const [entitiesProperties, setEntitiesProperties] = useRecoilState(entitiesPropertiesAtom);
  useEffect(() => {
    if (isDrawPolygon && viewer) {
      viewer.entities.removeAll();
      if (isCreateTaskModal) {
        const a = CesiumViewMouseEvent(viewer, mouseHandler, setIsDrawPolygon, setIsShowCreateTaskModal, setPolygonRegion, setSelectTask, entitiesProperties, setEntitiesProperties);
        a();
      } else {
        const a = CesiumViewMouseEvent(viewer, mouseHandler, setIsDrawPolygon, setIsShowModal, setPolygonRegion, setSelectTask, entitiesProperties, setEntitiesProperties);
        a();
      }
    } else {
      if (mouseHandler.current) {
        mouseHandler.current.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
        mouseHandler.current.removeInputAction(
          ScreenSpaceEventType.RIGHT_CLICK
        );
        mouseHandler.current.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
      }
    }
  }, [isDrawPolygon])
}
export default useMousePolygon;

