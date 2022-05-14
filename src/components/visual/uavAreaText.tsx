import { useRecoilValue } from "recoil";
import { planPathMethodAtom } from "../../store/task";
import { selectUavBoundarySelector, selectUavInPieAtom, uavPlanPathAreaAtom, uavPlanPathBoundaryAtom } from "../../store/visual";
import { calculatePolygonArea } from "../../utils/utils";

const totalArea = (item: any[]) => {
  return item.reduce((fre, cur) => {
    return fre + cur.value;
  },0)
}
const getMethodString = (method: string) => {
  let methodString = '';
  switch(method){
    case '2':
      methodString = '单无人机规划方案';
      break;
    case '3':
      methodString = '多无人机平扫方案';
      break;
    case '4':
      methodString = '多无人机多目标方案';
      break;
    default:
      methodString = '';
      break;
  }
  return methodString;
}
const UavAreaText: React.FC<{}> = () =>{
  const selectUavBoundary = useRecoilValue(selectUavBoundarySelector);
  const selectUavInPie = useRecoilValue(selectUavInPieAtom);
  const uavPlanPathArea = useRecoilValue(uavPlanPathAreaAtom);
  // const uavPlanPathBoundary = useRecoilValue(uavPlanPathBoundaryAtom);
  const planPathMethod = useRecoilValue(planPathMethodAtom);
  if(selectUavBoundary.length === 0) {
    return(
      <div>
        <h1 style={{fontSize: '24px',textAlign:'center'}}>无人机规划信息</h1>
        <h1 style={{fontSize: '16px'}}>规划方案：{getMethodString(planPathMethod)}</h1>
        <h1 style={{fontSize: '16px'}}>无人机数目：{uavPlanPathArea.length}</h1>
        <h1 style={{fontSize: '16px'}}>总面积：{totalArea(uavPlanPathArea)}</h1>
        <h1 style={{fontSize: '16px'}}>总覆盖率：{totalArea(uavPlanPathArea) / totalArea(uavPlanPathArea)}</h1>
      </div>
    )
  } else {
    return(
      <div>
        <div>
        <h1 style={{fontSize: '24px',textAlign:'center'}}>无人机规划信息</h1>
        <h1 style={{fontSize: '16px'}}>规划方案：{getMethodString(planPathMethod)}</h1>
        <h1 style={{fontSize: '16px'}}>无人机名：{selectUavInPie}</h1>
        <h1 style={{fontSize: '16px'}}>覆盖面积：{calculatePolygonArea(selectUavBoundary)}</h1>
        <h1 style={{fontSize: '16px'}}>覆盖占比：{calculatePolygonArea(selectUavBoundary) / totalArea(uavPlanPathArea)}</h1>
      </div>
      </div>
    )
  }
}

export default UavAreaText