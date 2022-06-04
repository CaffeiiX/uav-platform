/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cartesian3 } from "cesium";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { BillboardCollection, Billboard } from "resium";
import { selectFireTaskAtom } from "../../../store/fireTask";
import { isFireBillBoardShowAtom } from "../../../store/map";
const FireBillBoard: React.FC<{}> = () => {
  const billBoardVisible = useRecoilValue(isFireBillBoardShowAtom);
  const dataDetail = useRecoilValue(selectFireTaskAtom);
  useEffect(() => {
    console.log(billBoardVisible);
    console.log(dataDetail);
  }, [billBoardVisible]);

  return billBoardVisible ? (
    <BillboardCollection>
      <Billboard
        id={"billboardFire"}
        position={Cartesian3.fromDegrees(
          dataDetail.nextFire[0],
          dataDetail.nextFire[1],
          0
        )}
        image={"./img/fire_icon.png"}
        sizeInMeters={true}
        width={50}
        height={50}
        show={billBoardVisible}
      ></Billboard>
    </BillboardCollection>
  ) : (
    <></>
  );
};

export default FireBillBoard;
