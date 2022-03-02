import "antd/dist/antd.css";
import {Layout, Menu, Modal } from "antd";
import React, { memo, useState } from "react";
import MapViewer from "./map/mapViewer";
import "./mainView.css"
import TaskControl from "./task/taskControl";
import SubMenu from "antd/lib/menu/SubMenu";
import TaskList from "./task/taskList";
import TaskInfo from "./task/taskInfo";
import CreateTaskModal from "./modal/createTaskModal";
import Control from "./control/control";


const { Content, Sider } = Layout;
const MapViewerMemo = memo(MapViewer);


const MainView: React.FC<{}> = () => {
  // const [collapsed, setCollapsed] = useState(false);

  const [isCreateTaskModalShow, setCreateTaskModalShow] = useState<boolean>(false);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
      <Control></Control>
      {/* <Sider className="mainview-sider" collapsible collapsed={collapsed} onCollapse={()=> setCollapsed(!collapsed)} width={240}> */}
      <Modal title="创建任务" visible={isCreateTaskModalShow} onCancel={()=>{setCreateTaskModalShow(false)}} onOk={()=>setCreateTaskModalShow(false)}>
        <CreateTaskModal></CreateTaskModal>
      </Modal>
        <Layout>
        <Sider className="mainview-sider" width={240}>
          <TaskControl onCreateTaskShowModal={() => {setCreateTaskModalShow(true)}}></TaskControl>
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
