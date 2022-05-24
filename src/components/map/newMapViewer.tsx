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
  Entity
} from "resium";
import { cameraLookAtAtom, drawPolygonRegionAtom, isClearMapEntitiesAtom, isDrawCreateTaskRegionAtom, isDrawPlatformAtom, isDrawTargetPointAtom, isPlatformPointShowAtom, isTargetPointShowAtom, platformPointColAtom, targetPointColAtom, uavPlanPathPointColAtom } from "../../store/map";
import { osm, osmStyle } from "./mapConfig";
import useMousePolygon from "../../hook/useMousePolygon";
// import useUpdatePointCol from "../../hook/useUpdatePointCol";
import { IsPointInPolygon } from "../../utils/utils";
import PlatformPoint from "./platformPoints";
import { isModalShowAtom, isShowCreateTaskModalAtom } from "../../store/modal";
import TargetPoints from "./targetPoints";
import { memo } from "react";
import { Color } from "cesium";
import ViewUavVisual from "./viewUavVisual";
import TaskBoundary from "./taskBoundary";
import SelectPlanArea from "./selectPlanArea";
import UavInTimePath from "./uavInTimePath";
import { selectUavIdAtom } from "../../store/uav";

const CameraFlyTo = memo(CesiumCameraFlyTo);
const ColorCol = [new Color(0,153/255,204/255),new Color(255.0/255.0,102/255,102/255), new Color(1,1,204/255), Color.WHITE];
const NewMapViewer: React.FC<{}> = () => {
  const cameraLookAt = useRecoilValue(cameraLookAtAtom);
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  const mouseHandlerRef = useRef<ScreenSpaceEventHandler | undefined>(
    undefined
  );
  useMousePolygon(viewerRef.current?.cesiumElement, mouseHandlerRef);
  //platform points
  const [isDrawPlatform,setIsDrawPlatform] = useRecoilState(isDrawPlatformAtom);
  const polygonRegion = useRecoilValue(drawPolygonRegionAtom);
  const setIsPlatformShow = useSetRecoilState(isPlatformPointShowAtom);
  const [platformPointCol, setPlatformColPoint] =
    useRecoilState(platformPointColAtom);
  //target points
  const [isDrawTarget, setIsDrawTarget] = useRecoilState(isDrawTargetPointAtom);
  const setIsTargetPointShow = useSetRecoilState(isTargetPointShowAtom);
  const [targetPointCol, setTargetPointCol] = useRecoilState(targetPointColAtom);
  //mouse event
  const setIsModalShow = useSetRecoilState(isModalShowAtom);
  //uav plan path
  const uavPlanPathPointCol = useRecoilValue(uavPlanPathPointColAtom);
  // create Task
  const setIsCreateTaskModalShow = useSetRecoilState(isShowCreateTaskModalAtom);
  const isDrawCreateTaskRegion = useRecoilValue(isDrawCreateTaskRegionAtom);
  const selectUavId = useRecoilValue(selectUavIdAtom);
  // const isClearMapEntities = useRecoilValue(isClearMapEntitiesAtom);
  const onLeftMouseClick = (event: CesiumMovementEvent) => {
    if(!viewerRef.current?.cesiumElement) return;
    const viewer = viewerRef.current.cesiumElement;
    if(!event.position) return;
    const ray = viewer.camera.getPickRay(event.position);
    if (isDrawPlatform) {
      setIsPlatformShow(true);
      const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (defined(earthPosition)) {
        if (earthPosition) {
          if (IsPointInPolygon(earthPosition, polygonRegion)) {
            setPlatformColPoint([...platformPointCol, earthPosition]);
          }
        }
      }
    };
    if(isDrawTarget){
      setIsTargetPointShow(true);
      const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (defined(earthPosition)) {
        if (earthPosition) {
          if (IsPointInPolygon(earthPosition, polygonRegion)) {
            setTargetPointCol([...targetPointCol, earthPosition]);
          }
        }
      }
    }
  };
  const onRightMouseClick = () => {
    if(isDrawPlatform){
      setIsModalShow(true);
      setIsDrawPlatform(false);
    }
    if(isDrawTarget){
      setIsModalShow(true);
      setIsDrawTarget(false);
    }
  }
  // useEffect(()=>{
  //   if(isClearMapEntities){
  //     viewerRef.current?.cesiumElement?.entities.removeAll();
  //   }
  // },[isClearMapEntities])
  return (
    <>
      <Viewer
        imageryProvider={osm}
        style={{ height: window.innerHeight }}
        onMouseDown={(e) => {}}
        infoBox={false}
        ref={viewerRef}
        onClick={onLeftMouseClick}
        onRightClick={onRightMouseClick}
      >
        <Clock multiplier={1} shouldAnimate={true}/>
        <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
        <CameraFlyTo destination={cameraLookAt}></CameraFlyTo>
        <PlatformPoint></PlatformPoint>
        <TargetPoints></TargetPoints>
        {
          uavPlanPathPointCol.length > 0 ? 
          uavPlanPathPointCol.map((item, index) => {
            return(
              <ViewUavVisual
              pathPositionCol={item}
              color={ColorCol[index]}>
              </ViewUavVisual>
            )
          }): (<></>)
        }
        {
          selectUavId === '' ? <></> : <UavInTimePath/>
        }
    {/* <UavInTimePath/> */}
      <TaskBoundary/>
      <SelectPlanArea/>
      </Viewer>
    </>
  );
};

export default NewMapViewer;
