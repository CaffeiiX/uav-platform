import { ReactElement } from "react";
import PlatformPoint from "../map/platformPoints";

type controlComponentProperty = {
  key : string, //compoent 
  visual: boolean,
  track: boolean,
  clock: boolean,
  component: ReactElement
}

const MapVisualControl: React.FC<{}> = ({}) => {
  //组件可视化结构
  const mapComponentProperty: controlComponentProperty[] = [
    {
      key: 'platformPointComponent',
      visual: false,
      track: false,
      clock: false,
      component: <PlatformPoint/>
    }
  ]
  return (
    <>
    {mapComponentProperty[0].component}
    </>
  )
};
export default MapVisualControl;