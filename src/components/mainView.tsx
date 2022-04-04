import "antd/dist/antd.css";
import { Layout } from "antd";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MapViewer from "./map/mapViewer";
import "./mainView.css";
import CreateTaskModal from "./modal/createTaskModal";
import Control from "./control/control";
import { IsCreateTaskContext, SelectTaskContext } from "../context/taskContext";
import Task from "./task/task";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import {
  TaskInfoType,
  UavWsDataType,
  uavPositionAndTimeType,
} from "../interface/taskType";
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
    name: "名称",
    Id: "",
    date: "时间",
    status: "",
    boundary: [],
  });
  // const [targetPointStatus, setTargetPointStatus] = useState<TargetPointType>();
  // 绘制目标点内容
  const [isDrawPoint, setIsDrawPoint] = useState<boolean>(false);
  const [targetPointCol, setTargetPointCol] = useState<Cartesian3[]>([]);
  const [isDrawPlatformPoint, setIsDrawPlatformPoint] = useState<boolean>(false);
  const [platformPointCol, setPlatformPointCol] = useState<Cartesian3[]>([]);
  // websocket部分
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [readyState, setReadyState] = useState("正在链接中");

  // 任务对应的无人机列表
  const [selectUavList, setSelectUavList] = useState<string[]>([]);
  const [uavPosition, setUavPosition] = useState<uavPositionAndTimeType>();
  // 选择的无人机信息
  const [selectUavId, setSelectUavId] = useState<string>("");
  //path
  const [planPathCol, setPlanPathCol] = useState<number[][]>([[]]);

  useEffect(() => {
    const fetchData = async (taskId: string) => {
      const data = await getUavListInTask(taskId);
      setSelectUavList(data.map((item) => item.droneId));
    };
    fetchData(selectTask.Id);
  }, [selectTask.Id]);

  // const [isDrawTaskPolygon, setIsDrawTaskPolygon] = useState<boolean>(false);
  // WebSocket

  const webSocketInit = useCallback(() => {
    const stateArr = [
      "正在链接中",
      "已经链接并且可以通讯",
      "连接正在关闭",
      "连接已关闭或者没有链接成功",
    ];
    if (!ws.current || ws.current.readyState === 3) {
      ws.current = new WebSocket(
        `ws://192.168.61.91:30094/web/websocket/${getUuid()}`
      );
      ws.current.onopen = (_e) =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onclose = (_e) =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onerror = (_e) =>
        setReadyState(stateArr[ws.current?.readyState ?? 0]);
      ws.current.onmessage = (e) => {
        // setMessage(e.data);
        if (e.data.length > 4) {
          setMessage(e.data);
        }
      };
    }
  }, [ws]);

  useLayoutEffect(() => {
    webSocketInit();
    return () => {
      ws.current?.close();
    };
  }, [ws, webSocketInit]);

  useEffect(() => {
    if (message.length > 4) {
      const wsData: UavWsDataType = JSON.parse(
        message.slice(0, message.length - 1)
      );
      if (wsData.UAV_id === selectUavId) {
        setUavPosition({
          longtitude: wsData.GPSPosition_longitude,
          latitute: wsData.GPSPosition_latitude,
          height: wsData.GPSPosition_altitude,
          time: wsData.UAV_time * 1000,
        });
      }
    }
  }, [message, selectUavId]);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Control></Control>
        {/* <Sider className="mainview-sider" collapsible collapsed={collapsed} onCollapse={()=> setCollapsed(!collapsed)} width={240}> */}
        {/* <TargetPointContext.Provider
          value={{
            targetPointStatus: targetPointStatus,
            setTargetPointStatus: setTargetPointStatus,
          }}
        > */}
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
            isDrawPoint={{
              isDrawPoint: isDrawPoint,
              setIsDrawPoint: setIsDrawPoint,
            }}
            targetPoint={targetPointCol}
            isPlatformPoint={{
              isDrawPoint: isDrawPlatformPoint,
              setIsDrawPoint: setIsDrawPlatformPoint
            }}
            platformPoint={
              platformPointCol
            }
            setPlanPathCol={setPlanPathCol}
          ></CreateTaskModal>
        </IsCreateTaskContext.Provider>
        {/* </TargetPointContext.Provider> */}
        <Layout>
          <Sider className="mainview-sider" width={240}>
            <SelectTaskContext.Provider
              value={{
                selectTask: selectTask,
                setSelectTask: setSelectTask,
              }}
            >
              <IsCreateTaskContext.Provider
                value={{
                  isCreateTaskModal: isCreateTaskModalShow,
                  setIsCreateTaskModal: setCreateTaskModalShow,
                }}
              >
                <Task
                  uavMessage={uavPosition}
                  selectedUavList={selectUavList}
                  selectUavId={{
                    selectUavId: selectUavId,
                    setSelectUavId: setSelectUavId,
                  }}
                ></Task>
              </IsCreateTaskContext.Provider>
            </SelectTaskContext.Provider>
          </Sider>
          <Content className="mainview-content">
            <SelectTaskContext.Provider
              value={{
                selectTask: selectTask,
                setSelectTask: setSelectTask,
              }}
            >
              <IsCreateTaskContext.Provider
                value={{
                  isCreateTaskModal: isCreateTaskModalShow,
                  setIsCreateTaskModal: setCreateTaskModalShow,
                }}
              >
                {/* <MapViewerMemo isDrawPolygon={[isDrawPolygon,setIsDrawPolygon]}/> */}
                {
                  <MapViewerMemo
                    isDrawPolygon={{
                      isDrawPolygon: isDrawPolygon,
                      setIsDrwaPolygon: setIsDrawPolygon,
                    }}
                    drawPolygonRegion={{
                      polygonRegion: drawPolygonRegion,
                      setPolygonRegion: setDrawPolygonRegion,
                    }}
                    uavMessage={uavPosition}
                    targetPointCol={{
                      targetPoint: targetPointCol,
                      setTargetPoint: setTargetPointCol,
                    }}
                    isDrawPoint={{
                      isDrawPoint: isDrawPoint,
                      setIsDrawPoint: setIsDrawPoint,
                    }}
                    planPathCol={planPathCol}
                    isDrawPlatform={{
                      isDrawPoint: isDrawPlatformPoint,
                      setIsDrawPoint: setIsDrawPlatformPoint
                    }}
                    platformPointCol={{
                      targetPoint: platformPointCol,
                      setTargetPoint: setPlatformPointCol
                    }}
                  />
                }
              </IsCreateTaskContext.Provider>
            </SelectTaskContext.Provider>
            {/* </TargetPointContext.Provider> */}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainView;
