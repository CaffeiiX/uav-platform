
import { Cartesian3, Cartographic, JulianDate, Math as CMath, SampledPositionProperty } from "cesium";
import { PlatformUav, uavPositionAndTimeType } from "../interface/taskType";

const polygonToWKTString = (polygon: Cartesian3[]) => {

    let wktString = 'POLyGON((';
    for(let point of polygon){
        const pointDegree = Cartesian3ToDegrees(point);
        wktString += (String(pointDegree[0]) + ' ' + String(pointDegree[1]) + ',');
    }
    const pointDegree = Cartesian3ToDegrees(polygon[0]);
    wktString += (String(pointDegree[0]) + ' ' + String(pointDegree[1]) + '))');
    return wktString;
}

//计算多边形中心位置
const polygonCenter = (polygon: number[][]) => {
    if(polygon.length === 0) return Cartesian3.fromDegrees(114.3, 30.5, 5000);
    let [lon, lat] = [0,0]
    polygon.map((point) => {
        lon += point[0];
        lat += point[1];
        return point;
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
    // let zeroState = 0;
    let oddNodes = false;
    for(let k =0;  k < pointCount; k ++) {
        const ptK  = polygon[k];
        const ptJ = polygon[j];
        if (((ptK.y > point.y) !== (ptJ.y > point.y)) && (point.x < (ptJ.x - ptK.x) * (point.y - ptK.y) / (ptJ.y - ptK.y) + ptK.x)) {
            oddNodes = !oddNodes;
            if (ptK.y > ptJ.y) {
                // zeroState++;
            }
            else {
                // zeroState--;
            }
        }
        j = k;
    }
    return oddNodes;
}
const fliterUavList = (uavList: string[], platformUavList: PlatformUav, selectPlatform: string) => {
    let otherPlatUavList: string[] = []
    for(let key in platformUavList){
        if(key !== selectPlatform){
            otherPlatUavList = [...otherPlatUavList, ...platformUavList[key]]
        }
    }
    return uavList.filter(item => otherPlatUavList.indexOf(item) === -1);
}
export {polygonToWKTString, polygonCenter, getUuid, computeFlight, Cartesian3ToDegrees, IsPointInPolygon, fliterUavList}