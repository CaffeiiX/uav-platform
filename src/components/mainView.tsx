import "antd/dist/antd.css";
import { Layout } from "antd";
import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import MapViewer from "./map/mapViewer";
import "./mainView.css";
import CreateTaskModal from "./modal/createTaskModal";
import Control from "./control/control";
import {
  IsCreateTaskContext, SelectTaskContext,
} from "../context/taskContext";
import Task from "./task/task";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import { TaskInfoType, UavWsDataType } from "../interface/taskType";
import { getUuid } from "../utils/utils";
import { getUavListInTask } from "../api/taskAPI";

const { Content, Sider } = Layout;

const MapViewerMemo = memo(MapViewer);
const MainView: React.FC<{}> = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const [isCreateTaskModalShow, setCreateTaskModalShow] =
    useState<boolean>(false);
  const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(false);
  const [drawPolygonRegion, setDrawPolygonRegion] = useState<Cartesian3[]>([]);
  const [selectTask, setSelectTask] = useState<TaskInfoType>({
      'name': '名称',
      'Id': '',
      'date': '时间',
      'status': '',
      'boundary': []
  });
  // 任务对应的无人机列表
  const [selectUavList, setSelectUavList] = useState<string[]>([]);
  useEffect(() => {
    const fetchData =async (taskId: string) => {
      const data = await getUavListInTask(taskId);
      setSelectUavList(data);
    }
    fetchData(selectTask.Id);
  }, [selectTask.Id])

  // const [isDrawTaskPolygon, setIsDrawTaskPolygon] = useState<boolean>(false);
  // WebSocket
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const [readyState, setReadyState] = useState('正在链接中');

  const webSocketInit = useCallback(() => {
    const stateArr = [
      '正在链接中',
      '已经链接并且可以通讯',
      '连接正在关闭',
      '连接已关闭或者没有链接成功',
    ];
    if(!ws.current || ws.current.readyState === 3){
      ws.current = new WebSocket(`ws://192.168.61.91:30094/web/websocket/${getUuid()}`);
      ws.current.onopen = _e => setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onclose = _e => setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onerror = _e => setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onmessage = e => {
        setMessage(e.data);
        const wsData: UavWsDataType = JSON.parse(message.slice(0, message.length - 1));
        
        console.log(wsData);
      };
    }
  }, [ws])

  useLayoutEffect(() => {
    webSocketInit();
    return() => {
      ws.current?.close();
    };
  }, [ws, webSocketInit]);


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
            <SelectTaskContext.Provider
            value={{
              selectTask: selectTask,
              setSelectTask: setSelectTask
            }}>
            <IsCreateTaskContext.Provider
              value={{
                isCreateTaskModal: isCreateTaskModalShow,
                setIsCreateTaskModal: setCreateTaskModalShow,
              }}
            >
              <Task></Task>
            </IsCreateTaskContext.Provider>
            </SelectTaskContext.Provider>
          </Sider>
          <Content className="mainview-content">
            <SelectTaskContext.Provider
            value={{
              selectTask: selectTask,
              setSelectTask: setSelectTask
            }}>
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
            </SelectTaskContext.Provider>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainView;
