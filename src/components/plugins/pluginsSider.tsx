import { Layout, Menu } from "antd";
import { useState } from "react";
import { FireOutlined, FireFilled} from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firePluginsMapAtom, isFireInfoSiderShowAtom ,isFireSimulationShowAtom} from "../../store/plugins";
const { Sider } = Layout;
const PluginsSider = () => {
  const [collapsed, setCollapse] = useState<boolean>(true);
  const firePluginsMap = useRecoilValue(firePluginsMapAtom);
  const onCollapse = () => {
    setCollapse(!collapsed);
  };
  const setIsFireInfoSiderShow = useSetRecoilState(isFireInfoSiderShowAtom);
  const setIsFireSimulationShow = useSetRecoilState(isFireSimulationShowAtom);


  
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      reverseArrow={true}
      onCollapse={onCollapse}
      width={150}
    >
      <div className="logo">
        {/* <div style={{color: "white"}} >无人机平台</div> */}
      </div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {firePluginsMap[0].checkable ? (
          <Menu.Item key="1" icon={<FireOutlined />} onClick={() => {
            setIsFireInfoSiderShow(true);
            setIsFireSimulationShow(false);
            }}>
            火灾信息
          </Menu.Item>
        ) : (
          <></>
        )}
        {firePluginsMap[1].checkable ? (
          <Menu.Item key="2" icon={<FireFilled />} onClick={() => {
            setIsFireSimulationShow(true);
            setIsFireInfoSiderShow(false);
          }}>
            火灾模拟
          </Menu.Item>
        ) : (
          <></>
        )}
      </Menu>
    </Sider>
  );
};

export default PluginsSider;
