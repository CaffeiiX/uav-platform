
import { Cartesian3, Cartographic, JulianDate, Math as CMath, SampledPositionProperty } from "cesium";
import { PlatformUav, uavPositionAndTimeType } from "../interface/taskType";
import irregularVoronoi from "./irregular-voronoi";
const polygonToWKTString = (polygon: Cartesian3[]) => {

    let wktString = 'POLYGON((';
    for (let point of polygon) {
        const pointDegree = Cartesian3ToDegrees(point);
        wktString += (String(pointDegree[0]) + ' ' + String(pointDegree[1]) + ',');
    }
    const pointDegree = Cartesian3ToDegrees(polygon[0]);
    wktString += (String(pointDegree[0]) + ' ' + String(pointDegree[1]) + '))');
    return wktString;
}

//计算多边形中心位置
const polygonCenter = (polygon: number[][]) => {
    if (polygon.length === 0) return Cartesian3.fromDegrees(114.3, 30.5, 5000);
    let [lon, lat] = [0, 0]
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
    for (let i = 0; i < source.length; i++) {
        let time = JulianDate.fromDate(new Date(source[i].time), new JulianDate());
        let position = Cartesian3.fromDegrees(source[i].longtitude, source[i].latitute, source[i].height);
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
    if (pointCount < 3) return false;
    let j = pointCount - 1;
    // let zeroState = 0;
    let oddNodes = false;
    for (let k = 0; k < pointCount; k++) {
        const ptK = polygon[k];
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
    for (let key in platformUavList) {
        if (key !== selectPlatform) {
            otherPlatUavList = [...otherPlatUavList, ...platformUavList[key]]
        }
    }
    return uavList.filter(item => otherPlatUavList.indexOf(item) === -1);
}
const getSelectUavList = (platformUav: PlatformUav) => {
    let uavList: string[] = [];
    for (let key in platformUav) {
        uavList = [...uavList, ...platformUav[key]];
    }
    return uavList;
};
const getUavPointList = (
    platformUav: PlatformUav,
    platformPointCol: Cartesian3[]
) => {
    let uavPointList: Cartesian3[] = [];
    let platformIndex: number = 0;
    for (let key in platformUav) {
        for (let _ of platformUav[key]) {
            uavPointList.push(platformPointCol[platformIndex]);
        }
        platformIndex += 1;
    }
    return uavPointList;
};
function feature(type: string, coordinates: any) {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            type,
            coordinates,
        },
    };
}
const findDroneInPolygonVoroni = (polygonRegion: number[][], uavPoint: number[][]) => {
    const polygon = feature('Polygon', [[...polygonRegion, polygonRegion[0]]]);

    const points =
        uavPoint.map((item) => {
            return feature("Point", item);
        })

    return irregularVoronoi(polygon, points);
}
const calculatePolygonVoroniArea = (polygonRegion: number[][], uavPoint: number[][], uavList: string[]) => {
    const polygon = feature('Polygon', [[...polygonRegion, polygonRegion[0]]]);

    const points =
        uavPoint.map((item) => {
            return feature("Point", item);
        })
    const voronoiPolygon = irregularVoronoi(polygon, points);
    const voronoiPolygonRegionList = voronoiPolygon.map((item) => {
        return item['geometry']['coordinates'];
    })
    let uavArea: any = []
    let uavBoundary: any = []
    for (let i = 0; i < uavPoint.length; i++) {
        // uavArea[uavList[i]] = calculatePolygonArea([uavPoint[i], ...voronoiPolygonRegionList[i][0]]);
        uavArea.push({ 'value': calculatePolygonArea([uavPoint[i], ...voronoiPolygonRegionList[i][0]]), 'name': uavList[i] })
        uavBoundary.push({'name': uavList[i], 'boundary': voronoiPolygonRegionList[i][0]});
    }
    return [uavArea,uavBoundary];
}
const calculateLength = (point1: number[], point2: number[]) => {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
}
const calculatePolygonArea = (pointList: number[][]) => {
    let area = 0.0;
    for (let i = 1; i < pointList.length - 1; i++) {
        area += calculateTriangle([pointList[0], pointList[i], pointList[i + 1]]);
    }
    return area;
}
const calculateTriangle = (triangle: number[][]) => {
    const a = calculateLength(triangle[0], triangle[1]) * 1000;
    const b = calculateLength(triangle[1], triangle[2]) * 1000;
    const c = calculateLength(triangle[2], triangle[0]) * 1000;
    const p = (a + b + c) / 2;
    console.log(Math.sqrt(p * (p - a) * (p - b) * (p - c)));
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}
export { polygonToWKTString, polygonCenter, getUuid, computeFlight, Cartesian3ToDegrees, IsPointInPolygon, fliterUavList, getSelectUavList, getUavPointList, findDroneInPolygonVoroni, calculatePolygonVoroniArea, calculatePolygonArea}
