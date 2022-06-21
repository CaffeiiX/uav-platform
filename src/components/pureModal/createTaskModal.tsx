import { useState } from "react";
import { Modal, Input, Radio, Button} from "antd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isCreateTaskModalAtom, isShowCreateTaskModalAtom, isStopReceiveMessageAtom } from "../../store/modal";
import { drawPolygonRegionAtom, isDrawPolygonAtom } from "../../store/map";
import { postCreateTask,getInUseUavListAPI } from "../../api/taskAPI";
import { inUseUavListAtom, } from "../../store/uav";
import { forceUpdateTaskAtom, taskStatusAtom } from "../../store/task";
const CreateTaskModal: React.FC<{}> = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [isModalShow,setIsModalShow] = useRecoilState(isShowCreateTaskModalAtom);
  const [areaMode, setAreaMode] = useState<number>(0);
  const setIsDrawPolygon = useSetRecoilState(isDrawPolygonAtom);
  const setIsCreateTaskModal = useSetRecoilState(isCreateTaskModalAtom);
  const [uavList,setUavList] = useRecoilState(inUseUavListAtom);
  const [polygonRegion, setPolygonRegion] = useRecoilState(drawPolygonRegionAtom);
  const taskStatus = useRecoilValue(taskStatusAtom);
  const setForceUpdateTask = useSetRecoilState(forceUpdateTaskAtom);
  const setIsStopReceiveMessage = useSetRecoilState(isStopReceiveMessageAtom);
  
  const onButtonOk = async () => {
    setIsModalShow(false);
    setIsCreateTaskModal(false);
    const status = await postCreateTask({
      task_name: taskName,
      droneIds: [uavList[uavList.length - 1]],
      task_bounary: polygonRegion,
      task_status: '1',
      task_type: String(taskStatus),
    });
    const newUavList =await getInUseUavListAPI();
    setUavList(newUavList.map(item => item.droneId));
    setForceUpdateTask(Math.random());
      if(status === 'success'){
        alert('无人机任务创建成功');
      }
    setIsStopReceiveMessage(false);
    return;
  }
  const clearCreateTask = () => {
    setTaskName('');
    setPolygonRegion([]);
  }
  const onCancelOk = () => {
    setUavList([...uavList.slice(0, uavList.length - 1)]);
    setIsModalShow(false);
    setIsCreateTaskModal(false);
    setIsStopReceiveMessage(false);
    clearCreateTask();
    return;
  }
  return (
    <>
      <div>
        <Modal
          visible={isModalShow}
          onCancel={onCancelOk}
          onOk={onButtonOk}
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
        </Modal>
      </div>
    </>
  );
};

export default CreateTaskModal;
