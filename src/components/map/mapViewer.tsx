// import ImageryProvider from "cesium/Source/Scene/ImageryProvider";
import MapboxStyleImageryProvider from "cesium/Source/Scene/MapboxStyleImageryProvider";
import OpenStreetMapImageryProvider from "cesium/Source/Scene/OpenStreetMapImageryProvider";
// import UrlTemplateImageryProvider from "cesium/Source/Scene/UrlTemplateImageryProvider";
import React, { useEffect, useRef, useState} from "react";
import { Viewer, ImageryLayer, CesiumComponentRef} from "resium";
// import { Entity as REntity }  from "resium";
import { Viewer as CesiumViewer} from "cesium";
// import ViewerTestComponent from "./viewer";
import CesiumViewMouseEvent from "./cesiumViewMouseEvent";

// function MapViewer() {
//     return (
//         <Viewer>
//         </Viewer>
//     )
// }

const osm = new OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
})
const osmStyle = new MapboxStyleImageryProvider({
    url: 'https://api.mapbox.com/styles/v1/',
    styleId: 'ckzmpncw3000g14tg92w137ya',
    username: 'caiw0421',
    accessToken: 'pk.eyJ1IjoiY2FpdzA0MjEiLCJhIjoiY2tyNTkycTdrMzA4MzJ1cWg5ajhmczhmOSJ9.BB9GKYcs2TrLbM_koPoIbQ'
})

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



const MapViewer : React.FC<{}> = () => {
    const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);
    const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(true);

    useEffect(() => {
        console.log(isDrawPolygon);
        if(ref.current?.cesiumElement){
            const mouseEvent = CesiumViewMouseEvent(ref.current?.cesiumElement, setIsDrawPolygon);
            mouseEvent();
        }
    }, [isDrawPolygon])
    
    return (
    <Viewer imageryProvider = {osm} style={{height: window.innerHeight}} 
            onClick={(e, Entity) => {}} 
            ref={ref} 
            onMouseDown={(e) => {}} 
            onRightClick={(e) => {}} infoBox={false}>
        <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
        {/* <CameraFlyTo destination={cameraDestination}></CameraFlyTo> */}
        {/* {pointsCols.map((position) => {
            const ray=ref.current?.cesiumElement?.camera.getPickRay(position);
            if(ray){
                return (
                    <REntity position={ref.current?.cesiumElement?.scene.globe.pick(ray, ref.current.cesiumElement.scene)} 
                            point={{pixelSize: 10, color: Color.WHITE, heightReference: HeightReference.CLAMP_TO_GROUND}}
                            >
                    </REntity>
                    )
            }
        })} */}
    </Viewer>
    )
}
export default MapViewer;