import {Cartesian3, CallbackProperty, 
        ScreenSpaceEventHandler, Color, 
        ColorMaterialProperty, HeightReference, 
        PolygonHierarchy, ScreenSpaceEventType, 
        Viewer as CesiumViewer, defined, 
        ConstantPositionProperty } from "cesium";
// import Entity from "cesium/Source/DataSources/Entity";
import { CesiumMovementEvent } from "resium";
// import { ScreenSpaceEventHandler } from "resium";

const createPointEntity = (viewer: CesiumViewer, worldPosition: 
    ConstantPositionProperty | Cartesian3 | undefined) => {
    const point = viewer.entities.add( {
        position: worldPosition,
        point: {
            color: Color.WHITE,
            pixelSize: 5,
            heightReference: HeightReference.CLAMP_TO_GROUND,
        }
    });
    
    return point;
}

const createPolygonEntity = (viewer: CesiumViewer ,positionData: any) => {
    const polygon = viewer.entities.add({
        polygon: {
            hierarchy: positionData,
            material: new ColorMaterialProperty(Color.WHITE.withAlpha(0.7))
        }
    });
    return polygon;
}

function CesiumViewMouseEvent(viewer: CesiumViewer, 
                              setIsDrawPolygon: any, 
                              setIsCreateModal: any,
                              setPolygonRegion: (c: Cartesian3[]) => void, 
                              handler: any) {
    let activePolygonPoints : Cartesian3 [] = [];
    let activePolygon : any = undefined;
    let floatingPoint : any = undefined;
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    return function () {
        handler.current = new ScreenSpaceEventHandler(viewer.canvas);
        handler.current.setInputAction((event: CesiumMovementEvent) => {
            if(event.position){
                const ray=viewer.camera.getPickRay(event.position);
                const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
                if(defined(earthPosition)) {
                    if(activePolygonPoints.length === 0){
                        floatingPoint = createPointEntity(viewer, earthPosition);
                        if(earthPosition) activePolygonPoints.push(earthPosition);
                        const dynamicPositions = new CallbackProperty(function() {
                            return new PolygonHierarchy(activePolygonPoints);
                        }, false);
                        activePolygon = createPolygonEntity(viewer, dynamicPositions);
                    }
                    if(earthPosition){
                        activePolygonPoints.push(earthPosition);
                        createPointEntity(viewer, earthPosition)
                    }
                }
            }
        }, ScreenSpaceEventType.LEFT_CLICK);
        handler.current.setInputAction((event : CesiumMovementEvent) => {
            if(event.endPosition){
                if(defined(floatingPoint)){
                    const ray=viewer.camera.getPickRay(event.endPosition);
                    const newPosition = viewer.scene.globe.pick(ray, viewer.scene);
                    if(floatingPoint){
                        floatingPoint.position.setValue(newPosition);
                        activePolygonPoints.pop();
                        if(newPosition){
                            activePolygonPoints.push(newPosition);
                        }
                    }
                }
            }
        }, ScreenSpaceEventType.MOUSE_MOVE);
        handler.current.setInputAction((event : CesiumMovementEvent) => {
            activePolygonPoints.pop();
            createPolygonEntity(viewer, activePolygonPoints);
            viewer.entities.remove(floatingPoint);
            viewer.entities.remove(activePolygon);
            console.log(activePolygonPoints);
            setPolygonRegion(activePolygonPoints);
            floatingPoint = undefined;
            activePolygon = undefined;
            activePolygonPoints = [];
            setIsDrawPolygon(false);
            setIsCreateModal(true);
        }, ScreenSpaceEventType.RIGHT_CLICK);
    }
}

export default CesiumViewMouseEvent;
