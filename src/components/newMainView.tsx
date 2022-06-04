import { Layout, Menu} from "antd";
import { Children, useState } from "react";
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
import { isControlSiderVisualAtom, isSiderShow, isSiderVisualAtom, isVisualItemAtom,isUavSiderVisualAtom } from "../store/view";
import PureTask from "./pureTask/pureTask";
import TaskModal from "./pureModal/taskModal";
import { memo } from "react";
// import VisualItem from "./visual/visualSider";
import VisualSider from "./visual/visualSider";
// import VisualChart from "./visual/visualChart";
import ControlSider from "./pureControl/controlSider";
import PluginsSider from "./plugins/pluginsSider";
import { isShowPluginSiderSelector } from "../store/plugins";
import FireInfoSider from "./plugins/fire/fireInfoSider";
import WebsocketInfo from "./common/websocketInfo";
import DynamicTaskModal from "./pureModal/dynamicTaskModal";
import CreateTaskModal from "./pureModal/createTaskModal";
import RelateTaskModal from "./pureModal/relateTaskModal";
import FireSimulationSider from "./plugins/fire/fireSimulationSider";
import UavSider from "./uavManagement/uavSider";
const { SubMenu } = Menu;
const {Content, Sider } = Layout;
const MapViewer = memo(NewMapViewer);
const NewMainView: React.FC<{}> = () => {
  const [collapsed, setCollapse] = useState<boolean>(false);
  // const [visible, setVisible] = useState<boolean>(false);
  const [visible, setVisible] = useRecoilState(isSiderShow);
  const [visualVisible, setVisualVisible] = useRecoilState(isSiderVisualAtom);
  const [controlVisible, setControlVisible] = useRecoilState(isControlSiderVisualAtom);
  const [uavManageVisible, setUavManageVisible] = useRecoilState(isUavSiderVisualAtom);
  const isVisualItem = useRecoilValue(isVisualItemAtom);
  const isShowPluginSider = useRecoilValue(isShowPluginSiderSelector);
  // const isShowDynamicTaskCreateModal = useRecoilValue(isShowDynamicTaskCreateModalSelector);
  const onCollapse = () => {
    setCollapse(!collapsed);
  };
  const showDrawer = () => {
    setVisible(!visible);
    setVisualVisible(false);
    setControlVisible(false);
    setUavManageVisible(false);
  };
  const showVisualSider = () => {
    setVisualVisible(!visualVisible);
    setVisible(false);
    setControlVisible(false);
    setUavManageVisible(false);
  }
  const showControlSider = ()=>{
    setControlVisible(!controlVisible);
    setVisible(false);
    setVisualVisible(false);
    setUavManageVisible(false);
  }
  const showUavManaSider = ()=>{
    setUavManageVisible(!uavManageVisible);
    setVisible(false);
    setVisualVisible(false);
    setControlVisible(false);
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
            <Menu.Item key="3" icon={<ControlOutlined />} onClick={showUavManaSider}>
              无人机信息
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
          <WebsocketInfo/>
        </SiderContent>
        <VisualSider/>
          {/* <VisualChart isShowChart={visualVisible}></VisualChart> */}
        <ControlSider/>
        <UavSider/>
        <Layout className="site-layout">
          <Content style={{ margin: '0' }}>
            <MapViewer/>
          </Content>
        </Layout>
        {/* <FireInfoSider/> */}
        {
          isShowPluginSider? <FireInfoSider/> : <></>
        }
        {/* <FireSimulationSider/> */}
        {
          isShowPluginSider? <FireSimulationSider/> : <></>
        }
        {
          isShowPluginSider? <PluginsSider/> : <></>
        }
        <TaskModal/>
        <DynamicTaskModal/>
        <CreateTaskModal/>
        <RelateTaskModal/>
      </Layout>
  );
};

export default NewMainView;
