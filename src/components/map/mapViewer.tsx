// import ImageryProvider from "cesium/Source/Scene/ImageryProvider";
import MapboxStyleImageryProvider from "cesium/Source/Scene/MapboxStyleImageryProvider";
import OpenStreetMapImageryProvider from "cesium/Source/Scene/OpenStreetMapImageryProvider";
// import UrlTemplateImageryProvider from "cesium/Source/Scene/UrlTemplateImageryProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Viewer,
  ImageryLayer,
  CesiumComponentRef,
  CameraFlyTo,
  Entity as REntity,
  PolygonGraphics,
  PointGraphics,
  Clock,
  PathGraphics,
  CesiumMovementEvent,
  PolylineGraphics,
  BillboardGraphics,
  EntityDescription,
} from "resium";
// import { Entity as REntity }  from "resium";
import {
  Cartesian3,
  Color,
  ColorMaterialProperty,
  defined,
  ExtrapolationType,
  JulianDate,
  LinearApproximation,
  PolylineGlowMaterialProperty,
  SampledPositionProperty,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Viewer as CesiumViewer,
} from "cesium";
// import ViewerTestComponent from "./viewer";
import CesiumViewMouseEvent from "./cesiumViewMouseEvent";
import {
  IsCreateTaskContext,
  SelectTaskContext,
} from "../../context/taskContext";
import { IsPointInPolygon, polygonCenter } from "../../utils/utils";
import {
  IsDrawPointType,
  TargetPointColType,
  uavPositionAndTimeType,
} from "../../interface/taskType";
import ViewUavVisual from "./viewUavVisual";
import Entity from "cesium/Source/DataSources/Entity";

type drawPolygonState = {
  isDrawPolygon: boolean;
  setIsDrwaPolygon: (c: boolean) => void;
};
type drawPolygonRegion = {
  polygonRegion: Cartesian3[];
  setPolygonRegion: (c: Cartesian3[]) => void;
};
const osm = new OpenStreetMapImageryProvider({
  url: "https://a.tile.openstreetmap.org/",
});
const osmStyle = new MapboxStyleImageryProvider({
  url: "https://api.mapbox.com/styles/v1/",
  styleId: "ckzmpncw3000g14tg92w137ya",
  username: "caiw0421",
  accessToken:
    "pk.eyJ1IjoiY2FpdzA0MjEiLCJhIjoiY2tyNTkycTdrMzA4MzJ1cWg5ajhmczhmOSJ9.BB9GKYcs2TrLbM_koPoIbQ",
});
const ColorCol = [Color.RED, Color.BLUE, Color.YELLOW, Color.WHITE];
const CamerFlyToMemo = React.memo(CameraFlyTo);
const EntityMemo = React.memo(REntity);
const PolygonGraphicsMemo = React.memo(PolygonGraphics);
const MapViewer: React.FC<{
  isDrawPolygon: drawPolygonState;
  drawPolygonRegion: drawPolygonRegion;
  uavMessage: uavPositionAndTimeType | undefined;
  targetPointCol: TargetPointColType;
  isDrawPoint: IsDrawPointType;
  planPathCol: number[][];
  isDrawPlatform: IsDrawPointType;
  platformPointCol: TargetPointColType;
  selectMethods: string
}> = ({
  isDrawPolygon,
  drawPolygonRegion,
  uavMessage,
  targetPointCol,
  isDrawPoint,
  planPathCol,
  isDrawPlatform,
  platformPointCol,
  selectMethods
}) => {
  const createTaskContext = useContext(IsCreateTaskContext);
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
  let mouseHandler = useRef<ScreenSpaceEventHandler | undefined>(undefined);
  const [cameraDestination, setCameraDestination] = useState<Cartesian3>(
    Cartesian3.fromDegrees(114.3, 30.5, 5000)
  );
  const selectTaskContext = useContext(SelectTaskContext);
  //???????????????????????????
  const property = useRef<SampledPositionProperty>(
    new SampledPositionProperty()
  );
  //??????????????????
  
  const handleOnClick = (event: CesiumMovementEvent) => {
    if (
      isDrawPoint.isDrawPoint &&
      event.position &&
      ref.current?.cesiumElement
    ) {
      const viewer = ref.current.cesiumElement;
      const ray = viewer.camera.getPickRay(event.position);
      const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (defined(earthPosition)) {
        if (earthPosition) {
          if (
            IsPointInPolygon(earthPosition, drawPolygonRegion.polygonRegion)
          ) {
            targetPointCol.setTargetPoint([
              ...targetPointCol.targetPoint,
              earthPosition,
            ]);
          }
        }
      }
    }
    if (
      isDrawPlatform.isDrawPoint &&
      event.position &&
      ref.current?.cesiumElement &&
      !isDrawPoint.isDrawPoint
    ) {
      const viewer = ref.current.cesiumElement;
      const ray = viewer.camera.getPickRay(event.position);
      const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (defined(earthPosition)) {
        if (earthPosition) {
          if (
            IsPointInPolygon(earthPosition, drawPolygonRegion.polygonRegion)
          ) {
            platformPointCol.setTargetPoint([
              ...platformPointCol.targetPoint,
              earthPosition,
            ]);
            if(selectMethods === '2'){
              createTaskContext.setIsCreateTaskModal(true);
            }
          }
        }
      }
    }
  };
  const handleRightButton = () => {
    if (isDrawPoint.isDrawPoint) {
      createTaskContext.setIsCreateTaskModal(true);
      // isDrawPoint.setIsDrawPoint(false);
      //????????????????????????
    }
    if (isDrawPlatform.isDrawPoint) {
      createTaskContext.setIsCreateTaskModal(true);
      // isDrawPlatform.setIsDrawPoint(false);
    }
  };
  // const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(true);
  //????????????????????????
  useEffect(() => {
    if (ref.current?.cesiumElement && isDrawPolygon.isDrawPolygon) {
      const mouseEvent = CesiumViewMouseEvent(
        ref.current?.cesiumElement,
        isDrawPolygon.setIsDrwaPolygon,
        createTaskContext.setIsCreateTaskModal,
        drawPolygonRegion.setPolygonRegion,
        mouseHandler
      );
      mouseEvent();
    } else {
      if (mouseHandler.current) {
        mouseHandler.current.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
        mouseHandler.current.removeInputAction(
          ScreenSpaceEventType.RIGHT_CLICK
        );
        mouseHandler.current.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
      }
    }
  }, [isDrawPolygon.isDrawPolygon]);
  //?????????????????????????????????????????????
  useEffect(() => {
    const centerPoint = polygonCenter(selectTaskContext.selectTask.boundary);
    setCameraDestination(centerPoint);
  }, [selectTaskContext.selectTask]);
  //?????????property
  useEffect(() => {
    property.current.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: LinearApproximation,
    });
    property.current.backwardExtrapolationType = ExtrapolationType.HOLD;
    property.current.forwardExtrapolationType = ExtrapolationType.HOLD;
  }, []);
  useEffect(() => {
    if (uavMessage) {
      let time = JulianDate.fromDate(
        new Date(uavMessage.time),
        new JulianDate()
      );
      let position = Cartesian3.fromDegrees(
        uavMessage.longtitude,
        uavMessage.latitute,
        uavMessage.height
      );
      setCameraDestination(
        Cartesian3.fromDegrees(uavMessage.longtitude, uavMessage.latitute, 1000)
      );
      property.current.addSample(time, position);
      if(ref.current?.cesiumElement){
        ref.current.cesiumElement.scene.postProcessStages.fxaa.enabled = true;
      }
    }
  }, [uavMessage]);
  return (
    <Viewer
      imageryProvider={osm}
      style={{ height: window.innerHeight }}
      onClick={(e) => {
        handleOnClick(e);
      }}
      ref={ref}
      onMouseDown={(e) => {}}
      onRightClick={handleRightButton}
      infoBox={false}
    >
      <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
      <CamerFlyToMemo destination={cameraDestination}></CamerFlyToMemo>
      {selectTaskContext.selectTask.boundary.length > 0 ? (
        <>
          <EntityMemo name="TaskPolygon">
            <PolygonGraphicsMemo
              hierarchy={
                Cartesian3.fromDegreesArray(
                  selectTaskContext.selectTask.boundary.flat()
                ) as any
              }
              height={0}
              material={new ColorMaterialProperty(Color.AZURE.withAlpha(0.7))}
            />
          </EntityMemo>
          {selectTaskContext.selectTask.boundary.map((point) => {
            return (
              <REntity position={Cartesian3.fromDegrees(point[0], point[1], 0)}>
                <PointGraphics color={Color.WHITE} pixelSize={10} />
              </REntity>
            );
          })}
        </>
      ) : (
        <></>
      )}
      <Clock multiplier={1} shouldAnimate={true} />
      <REntity
        id="random"
        position={property.current}
        // position={Cartesian3.fromDegrees(114.3, 30.5, 100)}
        model={{
          uri: "./models/CesiumDrone.glb",
          minimumPixelSize: 128,
          maximumScale: 20000,
        }}
        show={true}
        viewFrom={new Cartesian3(-2080, -1715, 2000) as any}
      >
        <PathGraphics
          show={true}
          leadTime={0}
          trailTime={60}
          resolution={1}
          material={
            new PolylineGlowMaterialProperty({
              glowPower: 0.3,
              taperPower: 0.3,
              color: Color.PALEGOLDENROD,
            })
          }
          width={10}
        />
      </REntity>
      {isDrawPoint.isDrawPoint ? (
        <>
          {targetPointCol.targetPoint.map((point) => {
            return (
              <REntity position={point}>
                <PointGraphics color={Color.WHITE} pixelSize={10} />
              </REntity>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {/* {planPathCol.length > 0 && planPathCol[0].length > 0 ? (
        <>
          {planPathCol.map((item, index) => {
            return (
              <REntity>
                <PolylineGraphics
                  positions={Cartesian3.fromDegreesArray(item)}
                  width={5}
                  material={
                    new PolylineGlowMaterialProperty({
                      color: ColorCol[index],
                    })
                  }
                />
              </REntity>
            );
          })}
        </>
      ) : (
        <></>
      )} */}
      {isDrawPlatform.isDrawPoint ? (
        <>
          {platformPointCol.targetPoint.map((item) => {
            return (
              <REntity position={item}>
                <BillboardGraphics image={"./facility.gif"}></BillboardGraphics>
              </REntity>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {planPathCol.length > 0 && planPathCol[0].length > 0 ? (
        // <ViewUavVisual pathPositionCol={planPathCol[0]} />

        planPathCol.map((item, index) => {
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
    </Viewer>
  );
};
export default MapViewer;
