import { Layout, Menu} from "antd";
import { useState } from "react";
import {
  ProfileFilled,
  PieChartFilled,
  ControlOutlined
} from "@ant-design/icons";
import "antd/dist/antd.dark.less";
import "@ant-design/aliyun-theme/index.less";
import "./newMainView.css";
import NewMapViewer from "./map/newMapViewer";
import SiderContent from "./siderContent";
import { useRecoilState, useRecoilValue} from "recoil";
import { isControlSiderVisualAtom, isSiderShow, isSiderVisualAtom, isVisualItemAtom } from "../store/view";
import PureTask from "./pureTask/pureTask";
import TaskModal from "./pureModal/taskModal";
import { memo } from "react";
import VisualItem from "./visual/visualSider";
import VisualSider from "./visual/visualSider";
import VisualChart from "./visual/visualChart";
import ControlSider from "./pureControl/controlSider";
const { SubMenu } = Menu;
const {Content, Sider } = Layout;
const MapViewer = memo(NewMapViewer);
const NewMainView: React.FC<{}> = () => {
  const [collapsed, setCollapse] = useState<boolean>(false);
  // const [visible, setVisible] = useState<boolean>(false);
  const [visible, setVisible] = useRecoilState(isSiderShow);
  const [visualVisible, setVisualVisible] = useRecoilState(isSiderVisualAtom);
  const [controlVisible, setControlVisible] = useRecoilState(isControlSiderVisualAtom);
  const isVisualItem = useRecoilValue(isVisualItemAtom);
  const onCollapse = () => {
    setCollapse(!collapsed);
  };
  const showDrawer = () => {
    setVisible(!visible);
    setVisualVisible(false);
    setControlVisible(false);
  };
  const showVisualSider = () => {
    setVisualVisible(!visualVisible);
    setVisible(false);
    setControlVisible(false);
  }
  const showControlSider = ()=>{
    setControlVisible(!controlVisible);
    setVisible(false);
    setVisualVisible(false);
  }
  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={150}>
          <div className="logo" >
            {/* <div style={{color: "white"}} >无人机平台</div> */}
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<ProfileFilled />} onClick={showDrawer}>
              任务信息
            </Menu.Item>
            <Menu.Item key="2" icon={<ControlOutlined />} onClick={showControlSider}>
              插件信息
            </Menu.Item>
            {
              isVisualItem ? (
                <Menu.Item key="3" icon={<PieChartFilled />} onClick={showVisualSider}>
                  统计信息
                </Menu.Item>
              ) : (<></>)
            }
          </Menu>
        </Sider>
        <SiderContent>
          <PureTask></PureTask>
        </SiderContent>
        <VisualSider>
          {/* <VisualChart isShowChart={visualVisible}></VisualChart> */}
        </VisualSider>
        <ControlSider>
          
        </ControlSider>
        <Layout className="site-layout">
          <Content style={{ margin: '0' }}>
            <MapViewer></MapViewer>
          </Content>
        </Layout>
        <TaskModal/>
      </Layout>
  );
};

export default NewMainView;
