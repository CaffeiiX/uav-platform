import { entityPropertiesType } from "../../types/Entity";
import PlatformPoint from "../map/platformPoints";
import SelectPlanArea from "../map/selectPlanArea";
import TargetPoints from "../map/targetPoints";
import TaskBoundary from "../map/taskBoundary";
import UavInTimePath from "../map/uavInTimePath";
import ViewUavVisualCol from "../map/viewUavVisual";
import FireAniEntity from "../plugins/fire/fireAniEntity";
import FireBillBoard from "../plugins/fire/fireBillBoard";

const CommonEntity: React.FC<{entitiesProperties:entityPropertiesType}> = ({entitiesProperties}) => {
  if(entitiesProperties.visual === false){
    return <></>
  }else{
    switch(entitiesProperties.key){
      case 'taskBoundaryComponent':
        return <TaskBoundary/>
      case 'platformPointsComponent':
        return <PlatformPoint/>
      case 'targetPointsComponent':
        return <TargetPoints/>
      case 'uavInTimePathComponent':
        return <UavInTimePath isTrack={entitiesProperties.track}/>
      case 'selectPlanAreaComponent':
        return <SelectPlanArea/>
      case 'viewUavVisualColComponent':
        return <ViewUavVisualCol/>
      case 'fireAniEntityComponent':
        return <FireAniEntity/>
      case 'fireBillBoard':
        return <FireBillBoard/>
      default:
        return <></>;
    }
  }
};

export default CommonEntity;