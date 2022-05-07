import { Color } from "cesium";
import { useRecoilValue } from "recoil";
import { Entity, PointGraphics} from "resium";
import {  isTargetPointShowAtom,  targetPointColAtom } from "../../store/map";

const TargetPoints: React.FC<{}> = () => {
  const isShowPlatform = useRecoilValue(isTargetPointShowAtom);
  const targetColPoint = useRecoilValue(targetPointColAtom);
  switch (isShowPlatform) {
    case true:
      return (
        <>
          {targetColPoint.map((item) => {
            return (
              <Entity position={item}>
                <PointGraphics color={Color.WHITE} pixelSize={10} />
              </Entity>
            );
          })}
        </>
      );
    default:
      return <></>;
  }
};

export default TargetPoints;
