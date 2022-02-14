// import ImageryProvider from "cesium/Source/Scene/ImageryProvider";
import MapboxStyleImageryProvider from "cesium/Source/Scene/MapboxStyleImageryProvider";
import OpenStreetMapImageryProvider from "cesium/Source/Scene/OpenStreetMapImageryProvider";
import UrlTemplateImageryProvider from "cesium/Source/Scene/UrlTemplateImageryProvider";
import React from "react";
import { Viewer, ImageryLayer} from "resium";


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
// })

const MapViewer : React.FC<{}> = () => {
    return (
    <Viewer imageryProvider = {osm}>
        <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
    </Viewer>
    )
}
export default MapViewer;