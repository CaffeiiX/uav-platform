/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Cartesian3,
    Viewer as CesiumViewer,
    ScreenSpaceEventHandler,
    defined,
    Transforms,
    HeadingPitchRoll,
    TranslationRotationScale,
    Quaternion,
    Matrix4,
    Color,
    Cartesian2,
    CircleEmitter,
    JulianDate,
} from "cesium";
import { JSXElementConstructor, ReactElement, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    Viewer,
    ImageryLayer,
    CameraFlyTo as CesiumCameraFlyTo,
    CesiumComponentRef,
    CesiumMovementEvent,
    Clock,
    Entity,
    ParticleSystem,
    CameraFlyTo,
} from "resium";
import { selectTaskAtom } from "../../../store/task";
import * as turf from "@turf/turf";
import { isFireAniShowAtom } from "../../../store/map";
import FireBillBoard from "./fireBillBoard";
import { selectFireTaskAtom } from "../../../store/fireTask";


const FireAniEntity: React.FC<{}> = () => {
    const dataDetail = useRecoilValue(selectFireTaskAtom);
    const aniVisible = useRecoilValue(isFireAniShowAtom);
    // const [predictCoor, setPredictCoor] = useState(dataDetail.nextFire);

    console.log(dataDetail);
    let rowFireRadius: string = '';
    let rowFireArea: string = '';
    // let predictCoor = [
    //     114.350167, 30.535468, 114.346287, 30.534504, 114.343448, 30.531674,
    //     114.344598, 30.528843, 114.347616, 30.52595, 114.351856, 30.527412,
    //     114.354911, 30.529372, 114.353797, 30.532265,
    // ];
    // console.log(dataDetail.nextFire);
    // console.log(predictCoor);
    // predictCoor.push(predictCoor[0]);
    // predictCoor.push(predictCoor[1]);

    let _predictCoor = dataDetail.nextFire;
    let predictCoor:number[]=[];
    for(let i=0;i<18;i++){
        predictCoor[i]=_predictCoor[i%16];
    }

    let originCoor = [[predictCoor[2], predictCoor[3]], [predictCoor[6], predictCoor[7]], [predictCoor[10], predictCoor[11]], [predictCoor[14], predictCoor[15]], [predictCoor[2], predictCoor[3]]]
    let polygon = turf.polygon([originCoor]);

    let center = turf.centroid(polygon).geometry.coordinates;
    let area = turf.area(polygon);
    let allDis = predictCoor
        .map((c, i) => (i % 2 ? null : [predictCoor[i], predictCoor[i + 1]]))
        .filter((arr) => arr)
        .map((item) =>
            turf.distance(turf.point(item!), turf.point(center), {
                units: "kilometers",
            })
        );
    let maxDis = Math.max(...allDis);
    console.log(allDis);
    console.log(maxDis);

    rowFireRadius = String((maxDis * 1000).toFixed(2)) + " m";
    rowFireArea = String(area.toFixed(2)) + " m<sup>2</sup>";
    let imageSize = maxDis * 100 * 2;
    let centerPosition = Cartesian3.fromDegrees(center[0], center[1]);
    const animEntity = { position: centerPosition };

    function computeModelMatrix(entity: any, time: any) {
        //var position = entity.position.getValue(time);
        let position = centerPosition;
        let modelMatrix = Transforms.eastNorthUpToFixedFrame(position);
        return modelMatrix;
    }
    function computeEmitterModelMatrix() {
        let hpr = HeadingPitchRoll.fromDegrees(0, 0, 0);
        let trs = new TranslationRotationScale();
        trs.translation = Cartesian3.fromElements(0, 0, 0);
        trs.rotation = Quaternion.fromHeadingPitchRoll(hpr);
        let result = Matrix4.fromTranslationRotationScale(trs);
        return result;
    }
    function wildFireApplyGravity(particle: any, dt: any) { }

    return (
        <>
            <ParticleSystem
                image={"./img/fire.png"}
                startColor={Color.RED.withAlpha(0.7)}
                endColor={Color.DARKORANGE.withAlpha(0.7)}
                startScale={0}
                endScale={10}
                minimumParticleLife={1}
                maximumParticleLife={6}
                minimumSpeed={1}
                maximumSpeed={4}
                minimumImageSize={new Cartesian2(imageSize, imageSize)}
                maximumImageSize={new Cartesian2(imageSize, imageSize)}
                emissionRate={4}
                lifetime={160.0}
                emitter={new CircleEmitter(5.0)}
                modelMatrix={computeModelMatrix(animEntity, JulianDate.now())}
                emitterModelMatrix={computeEmitterModelMatrix()}
                sizeInMeters={true}
                show={aniVisible}></ParticleSystem>
            <CameraFlyTo destination={Cartesian3.fromDegrees(center[0], center[1], 5000)}></CameraFlyTo>
        </>
    )
}

export default FireAniEntity;