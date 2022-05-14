import { Button } from "antd";
import { useSetRecoilState } from "recoil";
import { isClearMapEntitiesAtom, uavPlanPathPointColAtom } from "../../store/map";
import { isSiderVisualAtom, isVisualItemAtom } from "../../store/view";
import { selectUavInPieAtom } from "../../store/visual";

const EndPlanPath: React.FC<{}> = () => {
  const setIsVisualItem = useSetRecoilState(isVisualItemAtom);
  const setSelectUavInPie = useSetRecoilState(selectUavInPieAtom);
  // const setIsClearMapEntities = useSetRecoilState(isClearMapEntitiesAtom);
  const setIsSiderVisual = useSetRecoilState(isSiderVisualAtom);
  const setUavPlanPathPointCol = useSetRecoilState(uavPlanPathPointColAtom);
  const onClearClick = () =>{
    setIsVisualItem(false);
    setSelectUavInPie('');
    // setIsClearMapEntities(true);
    setIsSiderVisual(false);
    setUavPlanPathPointCol([]);
  }
  return (<>
  <Button style={{fontSize: "16px", marginTop: '20px'}} onClick={onClearClick}>结束任务规划</Button>
  </>)
};

export default EndPlanPath;