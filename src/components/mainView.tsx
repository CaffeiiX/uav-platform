import "antd/dist/antd.css";
import { Layout } from "antd";
import React, { memo, useState } from "react";
import MapViewer from "./map/mapViewer";
import "./mainView.css";
import CreateTaskModal from "./modal/createTaskModal";
import Control from "./control/control";
import {
  IsCreateTaskContext,
} from "../context/taskContext";
import Task from "./task/task";
import Cartesian3 from "cesium/Source/Core/Cartesian3";

const { Content, Sider } = Layout;
const MapViewerMemo = memo(MapViewer);


const MainView: React.FC<{}> = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const [isCreateTaskModalShow, setCreateTaskModalShow] =
    useState<boolean>(false);
  const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(false);
  const [drawPolygonRegion, setDrawPolygonRegion] = useState<Cartesian3[]>([]);
  // const [isDrawTaskPolygon, setIsDrawTaskPolygon] = useState<boolean>(false);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Control></Control>
        {/* <Sider className="mainview-sider" collapsible collapsed={collapsed} onCollapse={()=> setCollapsed(!collapsed)} width={240}> */}

        <IsCreateTaskContext.Provider
          value={{
            isCreateTaskModal: isCreateTaskModalShow,
            setIsCreateTaskModal: setCreateTaskModalShow,
          }}
        >
          <CreateTaskModal
            onDrawClick={() => {
              setIsDrawPolygon(true);
            }}
            polygonRegion={drawPolygonRegion}
          ></CreateTaskModal>
        </IsCreateTaskContext.Provider>

        <Layout>
          <Sider className="mainview-sider" width={240}>
            <IsCreateTaskContext.Provider
              value={{
                isCreateTaskModal: isCreateTaskModalShow,
                setIsCreateTaskModal: setCreateTaskModalShow,
              }}
            >
              <Task></Task>
            </IsCreateTaskContext.Provider>
          </Sider>
          <Content className="mainview-content">
            <IsCreateTaskContext.Provider
              value={{
                isCreateTaskModal: isCreateTaskModalShow,
                setIsCreateTaskModal: setCreateTaskModalShow,
              }}
            >
              {/* <MapViewerMemo isDrawPolygon={[isDrawPolygon,setIsDrawPolygon]}/> */}
              <MapViewerMemo
                isDrawPolygon={{
                  isDrawPolygon: isDrawPolygon,
                  setIsDrwaPolygon: setIsDrawPolygon,
                }}
                drawPolygonRegion = {{
                  polygonRegion: drawPolygonRegion,
                  setPolygonRegion: setDrawPolygonRegion
                }}
              />
            </IsCreateTaskContext.Provider>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainView;
