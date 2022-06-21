import { Cartesian3, JulianDate, PolylineGlowMaterialProperty, SampledPositionProperty } from "cesium";
import Color from "cesium/Source/Core/Color";
import ExtrapolationType from "cesium/Source/Core/ExtrapolationType";
import LinearApproximation from "cesium/Source/Core/LinearApproximation";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue} from "recoil";
import { Entity, useCesium,PathGraphics} from "resium";
import { selectUavIdAtom, uavInTimePathDictAtom, uavWebsocketJsonMessageSelector} from "../../store/uav";

const UavInTimePath: React.FC<{isTrack: boolean}> = ({isTrack}) => {
  // const uavWebscoketMessage = useRecoilValue(uavWebsocketMessageAtom);
  const uavPathProperty = useRef<SampledPositionProperty>(
    new SampledPositionProperty()
  );
  // const setCamerLookAt = useSetRecoilState(cameraLookAtAtom);
  const selectUavId = useRecoilValue(selectUavIdAtom);
  const uavWebsocketJsonMessage = useRecoilValue(uavWebsocketJsonMessageSelector);
  const cesiumRef = useCesium();
  const [uavInTimePathDict, setUavInTimePathDict] = useRecoilState(uavInTimePathDictAtom);
  //初始化property
  useEffect(() => {
    uavPathProperty.current.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: LinearApproximation
    });
    uavPathProperty.current.backwardExtrapolationType = ExtrapolationType.HOLD;
    uavPathProperty.current.forwardExtrapolationType = ExtrapolationType.HOLD;
  }, []);
  useEffect(() => {
    if(uavInTimePathDict.hasOwnProperty(selectUavId)){
      console.log(selectUavId);
      uavPathProperty.current = new SampledPositionProperty();
      for(let i = 0; i < uavInTimePathDict[selectUavId].time.length; i ++){
        uavPathProperty.current.addSample(uavInTimePathDict[selectUavId].time[i], uavInTimePathDict[selectUavId].position[i]);
      }
    }
  }, [selectUavId])
  useEffect(() => {
    if(uavWebsocketJsonMessage && selectUavId !== ''){
      let time = JulianDate.fromDate(
        new Date(uavWebsocketJsonMessage.UAV_time),
        new JulianDate()
      );
      let position = Cartesian3.fromDegrees(
        uavWebsocketJsonMessage.GPSPosition_longitude,
        uavWebsocketJsonMessage.GPSPosition_latitude,
        uavWebsocketJsonMessage.GPSPosition_altitude
      );
      // setCamerLookAt(position);
      if(uavWebsocketJsonMessage.UAV_id === selectUavId){
        uavPathProperty.current.addSample(time, position);
      }
      console.log(uavInTimePathDict);
      setUavInTimePathDict({
        ...uavInTimePathDict,
        [selectUavId]: {
          'time': [...uavInTimePathDict[selectUavId]['time'], time],
          'position': [...uavInTimePathDict[selectUavId]['position'], position]
        }
      });
      if(cesiumRef.cesiumWidget){
        cesiumRef.cesiumWidget.scene.postProcessStages.fxaa.enabled = true;
      }
    }
  }, [uavWebsocketJsonMessage]);
  return (
    <>
    <Entity
    position={uavPathProperty.current}
    model={{
      uri: './models/CesiumDrone.glb',
      minimumPixelSize: 128,
      maximumScale: 20000,
    }}
    show={true}
    viewFrom={new Cartesian3(-2080, -1715, 2000) as any}
    tracked={isTrack}
    >
      <PathGraphics
      show={true}
      leadTime={0}
      trailTime={60}
      resolution={1}
      material ={
        new PolylineGlowMaterialProperty({
          glowPower: 0.3,
          taperPower: 0.3,
          color: Color.PALEGOLDENROD
        })
      }
      width={10}
      />
    </Entity>
    </>
  )
};

export default UavInTimePath;