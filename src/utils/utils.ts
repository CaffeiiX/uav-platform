import { Cartesian3 } from "cesium";

const polygonToWKTString = (polygon: Cartesian3[]) => {
    let wktString = 'POLYGON((';
    for(let point of polygon){
        wktString += (String(point.x) + ' ' + String(point.y) + ',');
    }
    wktString += (String(polygon[0].x) + ' ' + String(polygon[0].y) + '))');
    return wktString;
}

//计算多边形中心位置
const polygonCenter = (polygon: number[][]) => {
    if(polygon.length === 0) return Cartesian3.fromDegrees(114.3, 30.5, 5000);
    let [lon, lat] = [0,0]
    polygon.map((point) => {
        lon += point[0];
        lat += point[1];
    })
    return Cartesian3.fromDegrees(lon / polygon.length, lat / polygon.length, 10000);
}

// 获取websocket的唯一标识符
const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}
export {polygonToWKTString, polygonCenter, getUuid}