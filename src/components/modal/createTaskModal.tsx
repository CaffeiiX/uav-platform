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
import { getTaskUavList, postCreateTask } from "../../api/taskAPI";
import { IsCreateTaskContext } from "../../context/taskContext";
import { IsDrawPointType, PlatformUav} from "../../interface/taskType";
import { fliterUavList } from "../../utils/utils";
import PathPlanModal from "../modal/pathPlanModal";

const { Option } = Select;


const CreateTaskModal: React.FC<{
  onDrawClick: any;
  polygonRegion: Cartesian3[];
  isDrawPoint: IsDrawPointType;
  targetPoint: Cartesian3[];
  isPlatformPoint: IsDrawPointType;
  platformPoint: Cartesian3[];
}> = ({ onDrawClick, polygonRegion, targetPoint, isDrawPoint, isPlatformPoint, platformPoint}) => {
  const createTaskContext = useContext(IsCreateTaskContext);
  const [taskName, setTaskName] = useState<string>("");
  const [uavList, setUavList] = useState<string[]>(["1", "2", "3"]);
  const [selectUavList, setSetlectUavList] = useState<string[]>([]);
//   const [selectAreaList, setSetlectAreaList] = useState<string[]>([]);
  const [areaMode, setAreaMode] = useState(0);
  const [platformMode, setPlatformMode] = useState(0);
  //多选框的逻辑
  //每个无人机可选的无人机
  const [platformSelectUavList, setPlatformSelectUavList] = useState<PlatformUav>({});

  const [selectPlatform, setSelectPlatform] = useState<number>(-1);
  const [isPathPlanModalChecked, setIsPathPlanModalChecked] =
    useState<boolean>(false);

  const onAreaChange = (e: RadioChangeEvent) => {
    setAreaMode(e.target.value);
  };
  const onAreaClick = () => {
      if(areaMode === 0) {
          onDrawClick();
          createTaskContext.setIsCreateTaskModal(false);
      } else {
          /**导入文件的逻辑部分 */
      }
  }
  const onPlatformChange = (e: RadioChangeEvent) => {
    setPlatformMode(e.target.value);
  };
  const onPlatformClick = () => {
      if(platformMode === 0){
        createTaskContext.setIsCreateTaskModal(false);
        isPlatformPoint.setIsDrawPoint(true);
      } else {
          //导入文件部分逻辑
      }
  }
  const handleOnOk = async () => {
    if (
      taskName === "" ||
      selectUavList.length === 0 ||
      polygonRegion.length === 0
    ) {
      alert("请输入数据");
      return;
    }
    createTaskContext.setIsCreateTaskModal(false);
    const status = await postCreateTask({
      task_name: taskName,
      droneIds: selectUavList,
      task_bounary: polygonRegion,
      task_status: "1",
      task_type: "1",
    });
    //更新任务的状态
    if (status === "success") console.log("post create task success");
    isDrawPoint.setIsDrawPoint(false);
  };

  const handleOnPlaning = () => {
    createTaskContext.setIsCreateTaskModal(false);
    isDrawPoint.setIsDrawPoint(true);
  };
  
  useEffect(() => {
    //getUavList
    const fetchData = async () => {
      const data = await getTaskUavList();
      setUavList(data.map((item) => item.droneId));
      //初始化selected
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
      for(let i = 0; i < platformPoint.length; i ++) {
          setPlatformSelectUavList({
              ...platformSelectUavList,
              [i.toString()]: []
          });
      }
  }, [platformPoint])

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
          <Radio.Group onChange={onAreaChange} value={areaMode} disabled={polygonRegion.length > 0}>
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
            onClick={() => {onAreaClick()}}
            disabled={polygonRegion.length > 0}
          >
            确定
          </Button>
        </div>

        <div style={{ width: "100%", marginTop: 10 }}>
          <span>{"平台区位: "}</span>
          <Radio.Group onChange={onPlatformChange} value={platformMode} disabled={isPlatformPoint.isDrawPoint}>
            <Radio value={0}>绘制</Radio>
            <Radio value={1}>实时获取</Radio>
          </Radio.Group>
          <Button type="primary" style={{ marginTop: 20 }} onClick={() => {onPlatformClick()}} disabled={isPlatformPoint.isDrawPoint}>
            确定
          </Button>
        </div>
        <div>
          <span>{"指定区位: "}</span>
          <Select   
            style={{ width: "20%", marginTop: 5 }}
            onChange={(e) => {
              setSelectPlatform(e);
            }}
          >
              {
                  platformPoint.map((item, index) => { return(
                      <Option value={index} key={index}>{`平台区位${index}`}</Option>
                  )})
              }
          </Select>
          <span style={{marginLeft: '15%'}}>{"选择无人机："}</span>
          <Select
            mode="multiple"
            style={{ width: "20%", marginTop: 10 }}
            onChange={(e) => {
                setPlatformSelectUavList({
                    ...platformSelectUavList, 
                    [selectPlatform]: e
                })
            }}
            value={platformSelectUavList[String(selectPlatform)]}
          >
            {selectPlatform !== -1? (
            fliterUavList(uavList, platformSelectUavList, String(selectPlatform)).map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })) : (<></>)}
          </Select>
        </div>
        {/* <div>
        <span>{'无人机: '}</span>
        <Select mode="multiple" style={{width: '80%', marginTop: 10}} 
                onChange={(e) => {
                setSetlectUavList(e);}}>
            {uavList.map((item) => {
                return <Option value={item} key={item}>{item}</Option>
            })}
        </Select>
    </div> */}
        <div>
          {/* <Button type="primary" style={{marginTop: 20, marginLeft: '10%'}} onClick={() => {onDrawClick(); createTaskContext.setIsCreateTaskModal(false);}}>绘制区域</Button> */}
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
            <PathPlanModal></PathPlanModal>
          </>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default CreateTaskModal;
