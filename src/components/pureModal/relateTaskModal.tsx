import { Modal, Select } from "antd";
import { useEffect, useRef} from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { getInUseUavListAPI, PostAddUavToTaskAPI } from "../../api/taskAPI";
// import { TaskInfoType } from "../../interface/taskType";
import {
  isShowRelateTaskModalAtom,
  isStopReceiveMessageAtom,
} from "../../store/modal";
import {
  forceUpdateTaskAtom,
  queryAllDynamicTaskListSelector,
} from "../../store/task";
import { inUseUavListAtom } from "../../store/uav";
const { Option } = Select;
const RelateTaskModal: React.FC<{}> = () => {
  const taskList = useRecoilValueLoadable(queryAllDynamicTaskListSelector);
  const [uavList, setUavList] = useRecoilState(inUseUavListAtom);
  // const [selectTask, setSelectTask] = useState<string>("");
  const selectTask = useRef("");
  const setForceUpdateTask = useSetRecoilState(forceUpdateTaskAtom);
  const setIsStopReceiveMessage = useSetRecoilState(isStopReceiveMessageAtom);
  // const selectTaskId = useRef(null);
  const [isShowRelateTaskModal, setIsShowRelateTaskModal] = useRecoilState(
    isShowRelateTaskModalAtom
  );
  const onButtonOk =() => {
    setIsShowRelateTaskModal(false);
    setIsStopReceiveMessage(false);
  };
  const onButtonCancel = () => {
    setIsShowRelateTaskModal(false);
    setIsStopReceiveMessage(false);
    setUavList([...uavList.slice(0, uavList.length - 1)]);
  };
  useEffect(() => {
    setForceUpdateTask(Math.random());
  }, [isShowRelateTaskModal]);
  switch (taskList.state) {
    case "hasValue":
      const addUavToTask = async (taskId: string, uavId: string) => {
        await PostAddUavToTaskAPI(taskId, uavId);
        const newUavList = await getInUseUavListAPI();
        console.log(newUavList);
        setUavList(newUavList.map(item => item.droneId));
      };
      return (
        <Modal
          visible={isShowRelateTaskModal}
          title="关联任务"
          onCancel={onButtonCancel}
          onOk={() => {
            onButtonOk();
            console.log(selectTask.current);
            console.log(uavList);
            addUavToTask(selectTask.current, uavList[uavList.length - 1]);
          }}
        >
          <span style={{ marginRight: "30%" }}>
            无人机名：{`${uavList[uavList.length - 1]}`}
          </span>
          <span>任务选择</span>
          <Select
            style={{ marginLeft: "10px", width: "100px" }}
            onChange={(e) => {
              selectTask.current = e;
            }}
            defaultValue={selectTask.current}
          >
            {taskList.contents.map((item) => {
              return (
                <Option value={item.Id} key={item.Id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Modal>
      );
    case "loading":
      return (
        <Modal visible={isShowRelateTaskModal} title="关联任务">
          <span style={{ marginRight: "30%" }}>无人机名：</span>
          <span>任务选择</span>
          <Select
            style={{ marginLeft: "10px", width: "100px" }}
            defaultValue={""}
          ></Select>
        </Modal>
      );
    case "hasError":
      throw taskList.contents;
  }
};

export default RelateTaskModal;
