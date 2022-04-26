import {
  Button,
  Checkbox,
  Input,
  Modal,
  Select,
  Radio,
  RadioChangeEvent,
} from "antd";
import { Cartesian3 } from "cesium";
import { useContext, useEffect, useState } from "react";
import {
  getTaskUavList,
  postCreateTask,
  PostFetchNormalPathAPI,
  PostNormalPathAPI,
  PostPathPlanDataAPI,
} from "../../api/taskAPI";
import { IsCreateTaskContext } from "../../context/taskContext";
import { IsDrawPointType, PlatformUav } from "../../interface/taskType";
import {
  calculatePolygonVoroniArea,
  Cartesian3ToDegrees,
  findDroneInPolygonVoroni,
  fliterUavList,
} from "../../utils/utils";
import PathPlanModal from "../modal/pathPlanModal";
import MethodModal from "./methodModal";
const { Option } = Select;

const getUavList = (platformUav: PlatformUav) => {
  let uavList: string[] = [];
  for (let key in platformUav) {
    uavList = [...uavList, ...platformUav[key]];
  }
  return uavList;
};
const getUavPointList = (
  platformUav: PlatformUav,
  platformPointCol: Cartesian3[]
) => {
  let uavPointList: Cartesian3[] = [];
  let platformIndex: number = 0;
  for (let key in platformUav) {
    for (let _ of platformUav[key]) {
      uavPointList.push(platformPointCol[platformIndex]);
    }
    platformIndex += 1;
  }
  return uavPointList;
};
const CreateTaskModal: React.FC<{
  onDrawClick: any;
  polygonRegion: Cartesian3[];
  isDrawPoint: IsDrawPointType;
  targetPoint: Cartesian3[];
  isPlatformPoint: IsDrawPointType;
  platformPoint: Cartesian3[];
  setPlanPathCol: (c: number[][]) => void;
  setIsShowChart: (c: boolean) => void;
  selectMethods: string;
  setSelectMethods: (c: string) => void;
}> = ({
  onDrawClick,
  polygonRegion,
  targetPoint,
  isDrawPoint,
  isPlatformPoint,
  platformPoint,
  setPlanPathCol,
  setIsShowChart,
  selectMethods,
  setSelectMethods
}) => {
  const createTaskContext = useContext(IsCreateTaskContext);
  const [taskName, setTaskName] = useState<string>("");
  const [uavList, setUavList] = useState<string[]>(["1", "2", "3"]);
  //   const [selectAreaList, setSetlectAreaList] = useState<string[]>([]);
  const [areaMode, setAreaMode] = useState(0);
  // const [platformMode, setPlatformMode] = useState(0);
  //多选框的逻辑
  //每个无人机可选的无人机
  const [platformSelectUavList, setPlatformSelectUavList] =
    useState<PlatformUav>({});
  // const [selectPlatform, setSelectPlatform] = useState<number>(-1);
  // const [isPathPlanModalChecked, setIsPathPlanModalChecked] =
  //   useState<boolean>(false);
  //无人机方案选择
  // const [selectMethods, setSelectMethods] = useState<string>("");
  const onAreaChange = (e: RadioChangeEvent) => {
    setAreaMode(e.target.value);
  };
  const onAreaClick = () => {
    if (areaMode === 0) {
      onDrawClick();
      createTaskContext.setIsCreateTaskModal(false);
    } else {
      /**导入文件的逻辑部分 */
    }
  };
  // const onPlatformChange = (e: RadioChangeEvent) => {
  //   setPlatformMode(e.target.value);
  // };
  // const onPlatformClick = () => {
  //   if (platformMode === 0) {
  //     createTaskContext.setIsCreateTaskModal(false);
  //     isPlatformPoint.setIsDrawPoint(true);
  //   } else {
  //     //导入文件部分逻辑
  //   }
  // };
  const handleOnOk = async () => {
    //根据是否选择路径规划部分
    const uavList = getUavList(platformSelectUavList);
    console.log(selectMethods);
    if (selectMethods === "") {
      alert("请选择无人机方案");
      return;
    }
    if (selectMethods === "1") {
      if (
        taskName === "" ||
        uavList.length === 0 ||
        polygonRegion.length === 0
      ) {
        alert("请输入数据");
        return;
      } else {
        const status = await postCreateTask({
          task_name: taskName,
          droneIds: uavList,
          task_bounary: polygonRegion,
          task_status: "1",
          task_type: "1",
        });
        //更新任务的状态
        if (status === "success") console.log("post create task success");
      }
    }
    if (selectMethods === "2" || selectMethods === "3") {
      if (
        taskName === "" ||
        uavList.length === 0 ||
        polygonRegion.length === 0
      ) {
        alert("请输入数据");
        return;
      } else {
        // const targetPointList = targetPoint.map(item => Cartesian3ToDegrees(item));
        const polygonRegionList = polygonRegion.map((item) =>
          Cartesian3ToDegrees(item)
        );
        const uavPointList = getUavPointList(
          platformSelectUavList,
          platformPoint
        ).map((item) => Cartesian3ToDegrees(item));
        const uavVoronoiArea = calculatePolygonVoroniArea(polygonRegionList, uavPointList, uavList);
        // console.log(uavVoronoiArea);
        const responseNormal = await PostNormalPathAPI(
          polygonRegionList,
          uavPointList
        );
        setPlanPathCol(responseNormal);
        setIsShowChart(true);
      }
    }
    if (selectMethods === "4") {
      if (
        taskName === "" ||
        uavList.length === 0 ||
        polygonRegion.length === 0 ||
        targetPoint.length === 0
      ) {
        alert("请输入数据");
        return;
      } else {
        const targetPointList = targetPoint.map((item) =>
          Cartesian3ToDegrees(item)
        );
        const polygonRegionList = polygonRegion.map((item) =>
          Cartesian3ToDegrees(item)
        );
        const uavPointList = getUavPointList(
          platformSelectUavList,
          platformPoint
        ).map((item) => Cartesian3ToDegrees(item));

        const response = await PostPathPlanDataAPI(
          uavList.length,
          targetPointList,
          polygonRegionList,
          uavPointList
        );
        // const responseNormal = await PostNormalPathAPI(polygonRegionList, uavPointList);
        setPlanPathCol(response);
        setIsShowChart(true);
      }
    }
    createTaskContext.setIsCreateTaskModal(false);
    isDrawPoint.setIsDrawPoint(false);
    isPlatformPoint.setIsDrawPoint(false);
  };

  useEffect(() => {
    //getUavList
    const fetchData = async () => {
      const data = await getTaskUavList();
      setUavList(data.map((item) => item.droneId));
      //初始化selected
      // console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    for (let i = 0; i < platformPoint.length; i++) {
      setPlatformSelectUavList({
        ...platformSelectUavList,
        [i.toString()]: [],
      });
    }
  }, [platformPoint]);

  return (
    <>
      <Modal
        visible={createTaskContext.isCreateTaskModal}
        onCancel={() => createTaskContext.setIsCreateTaskModal(false)}
        onOk={handleOnOk}
        title={"创建任务"}
      >
        <div>
          <span>{"任务名: "}</span>
          <Input
            style={{ width: "86%" }}
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></Input>
        </div>
        <div style={{ width: "100%", marginTop: 10 }}>
          <span>{"指定区域: "}</span>
          <Radio.Group
            onChange={onAreaChange}
            value={areaMode}
            disabled={polygonRegion.length > 0}
          >
            <Radio value={0} key="drawRadio">
              绘制
            </Radio>
            <Radio value={1} key="import">
              导入
            </Radio>
          </Radio.Group>
          <Button
            type="primary"
            style={{ marginTop: 20, marginLeft: "6%" }}
            onClick={() => {
              onAreaClick();
            }}
            disabled={polygonRegion.length > 0}
          >
            确定
          </Button>
        </div>
        <div style={{ width: "100%", marginTop: 10 }}>
          <span>选择方案：</span>
          <Select
            style={{ width: "80%", marginTop: 5 }}
            onChange={(e) => {
              setSelectMethods(e);
            }}
            defaultValue={""}
          >
            <Option value={"1"}>无无人机规划方案</Option>
            <Option value={"2"}>单无人机平扫方案</Option>
            <Option value={"3"}>多无人机平扫方案</Option>
            <Option value={"4"}>多无人机多目标方案</Option>
          </Select>
        </div>
        <MethodModal
          method={selectMethods}
          isPlatformPoint={isPlatformPoint}
          platformPoint={platformPoint}
          uavList={uavList}
          isDrawPoint={isDrawPoint}
          platformSelectUavList={platformSelectUavList}
          setPlatformSelectUavList={setPlatformSelectUavList}
        ></MethodModal>

        {/* <div>
          <Button type="primary" style={{marginTop: 20, marginLeft: '10%'}} onClick={() => {onDrawClick(); createTaskContext.setIsCreateTaskModal(false);}}>绘制区域</Button>
          <Checkbox
            onChange={(e) => setIsPathPlanModalChecked(e.target.checked)}
            checked={isPathPlanModalChecked}
            style={{ marginTop: 10 }}
          >
            路径规划
          </Checkbox>
        </div>
        {isPathPlanModalChecked ? (
          <>
            <PathPlanModal isDrawPoint={isDrawPoint}></PathPlanModal>
          </>
        ) : (
          <></>
        )} */}
      </Modal>
    </>
  );
};

export default CreateTaskModal;
