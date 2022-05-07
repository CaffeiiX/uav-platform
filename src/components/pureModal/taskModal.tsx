import { Modal, Input, Button, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getTaskUavList, postCreateTask, PostNormalPathAPI, PostPathPlanDataAPI } from "../../api/taskAPI";
import { drawPolygonRegionAtom, isDrawPolygonAtom, platformPointColAtom, targetPointColAtom, uavPlanPathPointColAtom } from "../../store/map";
import { isModalShowAtom } from "../../store/modal";
import { platformSelectUavListAtom, uavListAtom } from "../../store/uav";
import { isVisualItemAtom } from "../../store/view";
import { Cartesian3ToDegrees, getSelectUavList, getUavPointList } from "../../utils/utils";
import MethodModal from "./methodModal";
const { Option } = Select;
const TaskModal: React.FC<{}> = ({}) => {
  const [taskName, setTaskName] = useState("");
  const [areaMode, setAreaMode] = useState(0);
  const [methodMode, setMethodMode] = useState("");
  const [isModalShow, setIsModalShow] = useRecoilState(isModalShowAtom);
  const setUavList = useSetRecoilState(uavListAtom);
  const polygonRegion = useRecoilValue(drawPolygonRegionAtom);
  const platformSelectUavList = useRecoilValue(platformSelectUavListAtom);
  const platformPointCol = useRecoilValue(platformPointColAtom);
  const setUavPlanPathPointCol = useSetRecoilState(uavPlanPathPointColAtom);
  const targetPointCol = useRecoilValue(targetPointColAtom);
  const setIsVisualItem = useSetRecoilState(isVisualItemAtom);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTaskUavList();
      setUavList(data.map((item) => item.droneId));
    };
    fetchData();
  }, []);

  const setIsDrawPolygon = useSetRecoilState(isDrawPolygonAtom);
  const onButtonOk = async () => {
    const selectUavList = getSelectUavList(platformSelectUavList);
    if (taskName === "") {
      alert("请选择无人机方案");
      return;
    }
    if (polygonRegion.length === 0) {
      alert("请绘制任务区域");
      return;
    }
    if (selectUavList.length === 0) {
      alert("请选择无人机");
      return;
    }
    console.log(methodMode);
    if(methodMode === '1'){
      const status = await postCreateTask({
        task_name: taskName,
        droneIds: selectUavList,
        task_bounary: polygonRegion,
        task_status: "1",
        task_type: "1",
      });
      console.log(status);
      return;
    }
    if(methodMode === '2' || methodMode === '3'){
      const polygonRegionDegreesList = polygonRegion.map((item) => Cartesian3ToDegrees(item));
        const uavPointList = getUavPointList(platformSelectUavList, platformPointCol).map(item => Cartesian3ToDegrees(item));
        console.log(uavPointList);
        const responseNormal = await PostNormalPathAPI(
          polygonRegionDegreesList,
          uavPointList
        );
        setUavPlanPathPointCol(responseNormal);
        setIsVisualItem(true);
        return;
    }
    if(methodMode === '4'){
      if(targetPointCol.length === 0) {
        alert("请输入目标点");
        return;
      }
      const targetPointList = targetPointCol.map((item) => Cartesian3ToDegrees(item));
      const polygonRegionList = polygonRegion.map((item) => Cartesian3ToDegrees(item));
      const uavPointListNew = getUavPointList(platformSelectUavList, platformPointCol).map(item => Cartesian3ToDegrees(item));
      const response = await PostPathPlanDataAPI(
        selectUavList.length,
        targetPointList,
        polygonRegionList,
        uavPointListNew
      );
      console.log(response);
      return;
    }
  };
  return (
    <div>
      <Modal
        visible={isModalShow}
        onCancel={() => {
          setIsModalShow(false);
        }}
        onOk={() => {
          onButtonOk();
          setIsModalShow(false);
        }}
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
            onChange={(e) => {
              setAreaMode(e.target.value);
            }}
            value={areaMode}
            disabled={false}
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
              setIsModalShow(false);
              setIsDrawPolygon(true);
            }}
            disabled={false}
          >
            确定
          </Button>
        </div>
        <div style={{ width: "100%", marginTop: 10 }}>
          <span>选择方案：</span>
          <Select
            style={{ width: "80%", marginTop: 5 }}
            onChange={(e) => {
              setMethodMode(e);
            }}
            defaultValue={""}
          >
            <Option value={"1"}>无无人机规划方案</Option>
            <Option value={"2"}>单无人机平扫方案</Option>
            <Option value={"3"}>多无人机平扫方案</Option>
            <Option value={"4"}>多无人机多目标方案</Option>
          </Select>
        </div>
        <MethodModal methodMode={methodMode} />
      </Modal>
    </div>
  );
};

export default TaskModal;
