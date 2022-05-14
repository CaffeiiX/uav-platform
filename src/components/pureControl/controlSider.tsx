import { Button, Checkbox, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import {isControlSiderVisualAtom} from "../../store/view";
import { useRecoilState } from "recoil";
import "./controlSider.css";
import { center } from "@turf/turf";
import FireControl from "./fireControl";
const ControlSider: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isControlSiderVisualAtom);
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
                  <h3 className="heading">插件信息</h3>
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
            <div>
            <Menu mode="inline">
                <Menu.Item style={{textAlign: 'center'}}>插件集合</Menu.Item>
                <Menu.SubMenu title='基础组件'>
                  <Checkbox disabled={true} checked={true} style={{marginTop:'10px', marginLeft: '10px', marginBottom: '10px'}}>任务信息</Checkbox>
                </Menu.SubMenu>
                <Menu.SubMenu title='火灾组件'>
                <FireControl/>
                </Menu.SubMenu>
              </Menu>
            </div>
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
export default ControlSider;