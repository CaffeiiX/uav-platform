import { Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import { isSiderVisualAtom } from "../../store/view";
import { useRecoilState } from "recoil";
import "./visualSider.css";
import PieChart from "./pieChartVisual";
import UavAreaText from "./uavAreaText";
import EndPlanPath from './endPlanPath';
const VisualSider: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isSiderVisualAtom);
  return (
    <>
      <Sider
        collapsedWidth={0}
        collapsible
        collapsed={!visible}
        width={300}
        className="content-sider"
        zeroWidthTriggerStyle={{visibility: "hidden"}}
      >
        {visible ? (
          <>
            <article className="sider-article">
              <header className="sider-header">
                <div className="header-content">
                  <h3 className="heading">统计信息</h3>
                  <Button
                    className="close-button"
                    type="text"
                    onClick={() => setVisible(false)}
                  >
                    X
                  </Button>
                </div>
                <PieChart/>
                <hr/>
                <div>
                <UavAreaText/>
                </div>
                <hr/>
                <EndPlanPath/>
              </header>
            </article>
          </>
        ) : (
          <></>
        )}
        {/* {children} */}
        {visible ? children : (<></>)}
      </Sider>
    </>
  );
};
export default VisualSider;