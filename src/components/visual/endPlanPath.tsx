import { Button } from "antd";
import { useSetRecoilState, useRecoilState} from "recoil";
import { isClearMapEntitiesAtom, uavPlanPathPointColAtom, entitiesPropertiesAtom} from "../../store/map";
import { isSiderVisualAtom, isVisualItemAtom } from "../../store/view";
import { selectUavInPieAtom } from "../../store/visual";

const EndPlanPath: React.FC<{}> = () => {
  const setIsVisualItem = useSetRecoilState(isVisualItemAtom);
  const setSelectUavInPie = useSetRecoilState(selectUavInPieAtom);
  // const setIsClearMapEntities = useSetRecoilState(isClearMapEntitiesAtom);
  const setIsSiderVisual = useSetRecoilState(isSiderVisualAtom);
  const setUavPlanPathPointCol = useSetRecoilState(uavPlanPathPointColAtom);
  const [entitiesProperties, setEntitiesProperties] = useRecoilState(entitiesPropertiesAtom)
  const onClearClick = () =>{
    setIsVisualItem(false);
    setSelectUavInPie('');
    // setIsClearMapEntities(true);
    setIsSiderVisual(false);
    setUavPlanPathPointCol([]);
    setEntitiesProperties({
      ...entitiesProperties,
      clockIsCurrent: true,
      entitiesProperties: entitiesProperties.entitiesProperties.map(item=>
       item.key === 'taskBoundaryComponent' ? {...item, 'visual': true} : {...item, 'visual': false})
  })
  }
  return (<>
  <Button style={{fontSize: "16px", marginTop: '20px'}} onClick={onClearClick}>结束任务规划</Button>
  </>)
};

export default EndPlanPath;