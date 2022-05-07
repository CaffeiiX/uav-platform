import { useRecoilValue } from "recoil";
import { Entity, BillboardGraphics} from "resium";
import { isPlatformPointShowAtom, platformPointColAtom } from "../../store/map";

const PlatformPoint: React.FC<{}> = () => {
  const isShowPlatform = useRecoilValue(isPlatformPointShowAtom);
  const platformColPoint = useRecoilValue(platformPointColAtom);
  switch (isShowPlatform) {
    case true:
      return (
        <>
          {platformColPoint.map((item) => {
            return (
              <Entity position={item}>
                <BillboardGraphics image={"./facility.gif"}></BillboardGraphics>
              </Entity>
            );
          })}
        </>
      );
    default:
      return <></>;
  }
};

export default PlatformPoint;
