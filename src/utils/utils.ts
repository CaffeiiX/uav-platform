import { Cartesian3, Cartographic, JulianDate, Math as CMath, SampledPositionProperty } from "cesium";
import { uavPositionAndTimeType } from "../interface/taskType";

const polygonToWKTString = (polygon: Cartesian3[]) => {
    let wktString = 'POLyGON((';
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

const computeFlight = (source: uavPositionAndTimeType[]) => {
    let property = new SampledPositionProperty();
    for(let i = 0;i < source.length; i ++) {
        let time = JulianDate.fromDate(new Date(source[i].time), new JulianDate());
        let position  = Cartesian3.fromDegrees(source[i].longtitude, source[i].latitute, source[i].height);
        property.addSample(time, position);
    }
    return property;
}

const Cartesian3ToDegrees = (point: Cartesian3) => {
    const pointCarto = Cartographic.fromCartesian(
        point
    );
    return [CMath.toDegrees(pointCarto.longitude), CMath.toDegrees(pointCarto.latitude)];
}

const IsPointInPolygon = (point: Cartesian3, polygon: Cartesian3[]) => {
    const pointCount = polygon.length;
    if(pointCount < 3) return false;
    let j = pointCount - 1;
    let zeroState = 0;
    let oddNodes = false;
    for(let k =0;  k < pointCount; k ++) {
        const ptK  = polygon[k];
        const ptJ = polygon[j];
        if (((ptK.y > point.y) !== (ptJ.y > point.y)) && (point.x < (ptJ.x - ptK.x) * (point.y - ptK.y) / (ptJ.y - ptK.y) + ptK.x)) {
            oddNodes = !oddNodes;
            if (ptK.y > ptJ.y) {
                zeroState++;
            }
            else {
                zeroState--;
            }
        }
        j = k;
    }
    return oddNodes;
}
export {polygonToWKTString, polygonCenter, getUuid, computeFlight, Cartesian3ToDegrees, IsPointInPolygon}