import "antd/dist/antd.css";
import {Collapse, Layout, Menu } from "antd";
import React, { memo, useState } from "react";
import MapViewer from "./map/mapViewer";
import "./mainView.css"
import TaskControl from "./sider/taskControl";
import SubMenu from "antd/lib/menu/SubMenu";
import TaskList from "./sider/taskList";
import TaskInfo from "./sider/taskInfo";
import ControlPanel from "./top/controlPanel";


const { Content, Sider } = Layout;
const MapViewerMemo = memo(MapViewer);


const MainView: React.FC<{}> = () => {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
      {/* <Sider className="mainview-sider" collapsible collapsed={collapsed} onCollapse={()=> setCollapsed(!collapsed)} width={240}> */}
      <ControlPanel>

      </ControlPanel>
        <Layout>
        <Sider className="mainview-sider" width={240}>
          <TaskControl></TaskControl>
          <Menu mode="inline">
              <SubMenu title='任务列表' className="task-menu" key='sub1'>
                <TaskList></TaskList>
              </SubMenu>
              <SubMenu title='任务信息' className="task-menu" key='sub2'>
                <TaskInfo></TaskInfo>
              </SubMenu>
            </Menu>
        </Sider>
          <Content className="mainview-content">
            <MapViewerMemo />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainView;
