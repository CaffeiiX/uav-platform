import {
  Viewer as CesiumViewer,
  ScreenSpaceEventHandler,
  defined,
} from "cesium";
import { useEffect, useRef} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
  Viewer,
  ImageryLayer,
  CameraFlyTo as CesiumCameraFlyTo,
  CesiumComponentRef,
  CesiumMovementEvent,
  Clock
} from "resium";
import { cameraLookAtAtom, drawPolygonRegionAtom, entitiesPropertiesAtom, isClearMapEntitiesAtom, isDrawCreateTaskRegionAtom, isDrawPlatformAtom, isDrawTargetPointAtom, isPlatformPointShowAtom, isTargetPointShowAtom, platformPointColAtom, targetPointColAtom, uavPlanPathPointColAtom } from "../../store/map";
import { osm, osmStyle } from "./mapConfig";
import useMousePolygon from "../../hook/useMousePolygon";
// import useUpdatePointCol from "../../hook/useUpdatePointCol";
import { IsPointInPolygon } from "../../utils/utils";
import { isModalShowAtom} from "../../store/modal";
import { memo } from "react";
import { selectUavIdAtom } from "../../store/uav";
import CommonEntity from "../common/commonEntity";

const CameraFlyTo = memo(CesiumCameraFlyTo);
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
  // create Task
  // const setIsCreateTaskModalShow = useSetRecoilState(isShowCreateTaskModalAtom);
  // const isDrawCreateTaskRegion = useRecoilValue(isDrawCreateTaskRegionAtom);
  const [isClearMapEntities, setIsClearMapEntities] = useRecoilState(isClearMapEntitiesAtom);
  const [entitiesProperties, setEntitiesProperties] = useRecoilState(entitiesPropertiesAtom);
  const onLeftMouseClick = (event: CesiumMovementEvent) => {
    if(!viewerRef.current?.cesiumElement) return;
    const viewer = viewerRef.current.cesiumElement;
    if(!event.position) return;
    const ray = viewer.camera.getPickRay(event.position);
    if (isDrawPlatform) {
      setEntitiesProperties({
        ...entitiesProperties,
        entitiesProperties: entitiesProperties.entitiesProperties.map(item=>
         item.key === 'platformPointsComponent' ? {...item, 'visual': true} : item)
    });
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
      setEntitiesProperties({
        ...entitiesProperties,
        entitiesProperties: entitiesProperties.entitiesProperties.map(item=>
         item.key === 'targetPointsComponent' ? {...item, 'visual': true} : item)
    });
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
  useEffect(()=>{
    if(isClearMapEntities){
      viewerRef.current?.cesiumElement?.entities.removeAll();
      setIsClearMapEntities(false);
    }
  },[isClearMapEntities])
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
        <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
        <CameraFlyTo destination={cameraLookAt}></CameraFlyTo>
        {
          entitiesProperties.clockIsCurrent ? <Clock multiplier={1} shouldAnimate={true}/> : <></>
        }
        {
          entitiesProperties.entitiesProperties.map(item => <CommonEntity entitiesProperties={item}/>)
        }
        {/* <FireAniEntity/>
        <FireBillBoard/>
        <PlatformPoint></PlatformPoint>
        <TargetPoints></TargetPoints>
        <ViewUavVisualCol/>
        {
          selectUavId === '' ? <></> : <UavInTimePath isTrack={false}/>
        } */}
    {/* <UavInTimePath/> */}
      {/* <TaskBoundary/>
      <SelectPlanArea/> */}
      </Viewer>
    </>
  );
};

export default NewMapViewer;
