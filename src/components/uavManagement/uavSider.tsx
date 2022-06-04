import { Button} from "antd";
import Sider from "antd/lib/layout/Sider";
import {isUavSiderVisualAtom} from "../../store/view";
import { useRecoilState } from "recoil";
import "./uavSider.css";
import EditableTable from "./uavManaTable"
import UavInfoTable from "./uavInfoTable"


const UavSider: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isUavSiderVisualAtom);
  return (
    <>
      <Sider
        collapsedWidth={0}
        collapsible
        collapsed={!visible}
        width={240}
        className="content-sider"
        zeroWidthTriggerStyle={{visibility:"hidden"}}
      >
        {visible ? (
          <>
            <article className="sider-article">
              <header className="sider-header">
                <div className="header-content">
                  <h3 className="heading">无人机信息</h3>
                  <Button
                    className="close-button"
                    type="text"
                    onClick={() => setVisible(false)}
                  >
                    X
                  </Button>
                </div>
              </header>
            </article>
            <EditableTable></EditableTable>
            <hr></hr>
            <UavInfoTable></UavInfoTable>
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
export default UavSider;