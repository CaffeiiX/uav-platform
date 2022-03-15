// import ImageryProvider from "cesium/Source/Scene/ImageryProvider";
import MapboxStyleImageryProvider from "cesium/Source/Scene/MapboxStyleImageryProvider";
import OpenStreetMapImageryProvider from "cesium/Source/Scene/OpenStreetMapImageryProvider";
// import UrlTemplateImageryProvider from "cesium/Source/Scene/UrlTemplateImageryProvider";
import React, { useContext, useEffect, useRef, useState} from "react";
import { Viewer, ImageryLayer, CesiumComponentRef, CameraFlyTo, Entity as REntity, PolygonGraphics, PointGraphics} from "resium";
// import { Entity as REntity }  from "resium";
import { Cartesian3, Color, ColorMaterialProperty, ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer as CesiumViewer} from "cesium";
// import ViewerTestComponent from "./viewer";
import CesiumViewMouseEvent from "./cesiumViewMouseEvent";
import { IsCreateTaskContext, SelectTaskContext } from "../../context/taskContext";
import { polygonCenter } from "../../utils/utils";


type drawPolygonState = {
    isDrawPolygon: boolean;
    setIsDrwaPolygon: (c: boolean) => void;
  };
type drawPolygonRegion = {
    polygonRegion: Cartesian3 [];
    setPolygonRegion: (c: Cartesian3[]) => void;
};
const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
})
const osmStyle = new MapboxStyleImageryProvider({
    url: 'https://api.mapbox.com/styles/v1/',
    styleId: 'ckzmpncw3000g14tg92w137ya',
    username: 'caiw0421',
    accessToken: 'pk.eyJ1IjoiY2FpdzA0MjEiLCJhIjoiY2tyNTkycTdrMzA4MzJ1cWg5ajhmczhmOSJ9.BB9GKYcs2TrLbM_koPoIbQ'
})

const CamerFlyToMemo = React.memo(CameraFlyTo);
// const amap = new UrlTemplateImageryProvider({
//     url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
//     minimumLevel: 4,
//     maximumLevel: 18
// })
// const ampaMarker = new UrlTemplateImageryProvider({
//     url: 'https://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11',
//     minimumLevel: 4,
//     maximumLevel: 18
// });

const MapViewer : React.FC<{isDrawPolygon: drawPolygonState
                            drawPolygonRegion: drawPolygonRegion}> = ({isDrawPolygon, drawPolygonRegion}) => {
    const createTaskContext = useContext(IsCreateTaskContext);
    const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
    let mouseHandler= useRef<ScreenSpaceEventHandler| undefined>(undefined);
    const [cameraDestination, setCameraDestination] = useState<Cartesian3>(Cartesian3.fromDegrees(114.3, 30.5, 5000));
    const selectTaskContext = useContext(SelectTaskContext);
    // const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(true);
    //鼠标绘制事件
    useEffect(() => {
        if(ref.current?.cesiumElement && isDrawPolygon.isDrawPolygon){
            const mouseEvent = CesiumViewMouseEvent(ref.current?.cesiumElement, 
                                                    isDrawPolygon.setIsDrwaPolygon, 
                                                    createTaskContext.setIsCreateTaskModal,
                                                    drawPolygonRegion.setPolygonRegion,
                                                    mouseHandler);
            mouseEvent();
        } else{
            if(mouseHandler.current) {
                mouseHandler.current.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
                mouseHandler.current.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK);
                mouseHandler.current.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
            }
        }
    }, [isDrawPolygon.isDrawPolygon])
    useEffect(() => {
        const centerPoint = polygonCenter(selectTaskContext.selectTask.boundary);
        setCameraDestination(centerPoint);
    },[selectTaskContext.selectTask])
    return (
    <Viewer imageryProvider = {osm} style={{height: window.innerHeight}} 
            onClick={(e, Entity) => {}} 
            ref={ref} 
            onMouseDown={(e) => {}} 
            onRightClick={(e) => {}} infoBox={false}>
        <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
        <CamerFlyToMemo destination={cameraDestination}></CamerFlyToMemo>
        {
            selectTaskContext.selectTask.boundary.length > 0 ? 
            (
                <>
                <REntity name="TaskPolygon">
                    <PolygonGraphics
                    hierarchy={Cartesian3.fromDegreesArray(selectTaskContext.selectTask.boundary.flat()) as any}
                    height={0}
                    material={new ColorMaterialProperty(
                        Color.AZURE.withAlpha(0.7)
                    )}/>
                </REntity>
                {selectTaskContext.selectTask.boundary.map((point) => {
                    return(
                        <REntity
                            position={Cartesian3.fromDegrees(point[0],point[1],0)}>
                                <PointGraphics color={Color.WHITE} pixelSize={10}/>
                        </REntity>
                    )
                })}
                </>
            ) : (<></>)
        }
    </Viewer>
    )
}
export default MapViewer;