import { Input, Switch, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { SelectUavIdContext } from "../../context/taskContext";
import {
  SelectUavIdType,
  TaskInfoType,
  UavInfoType,
  uavPositionAndTimeType,
} from "../../interface/taskType";
import "./taskInfo.css";

const { Option } = Select;

const TaskInfo: React.FC<{
  taskInfo: TaskInfoType;
  uavInfo: UavInfoType[];
  uavMessage: uavPositionAndTimeType | undefined;
  selectedUavList: string[];
  selectUavId: SelectUavIdType
}> = ({ taskInfo, uavInfo, uavMessage, selectedUavList, selectUavId}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  
  useEffect(() => {
    if(uavMessage){
      setIsChecked(true);
    }
  }, [uavMessage])
  return (
    <>
      <div>
        <Input
          addonBefore="任务名称"
          disabled={true}
          value={taskInfo.name}
          className="task-input"
        ></Input>
        <Input
          addonBefore="无人机数"
          disabled={true}
          value={uavInfo.length}
          className="task-input"
        ></Input>
        <Input
          addonBefore="任务时间"
          disabled={true}
          value={taskInfo.date}
          className="task-input"
        ></Input>
      </div>

      <div style={{ marginTop: "10px", marginBottom: "8px" }}>
        <div style={{ display: "inline-block", width: "160px" }}>
          <span className="span">无人机状态：</span>
          <Switch disabled={false} checked={isChecked}></Switch>
        </div>
        <Select
          defaultValue={selectUavId.selectUavId}
          onChange={(e) => {
            selectUavId.setSelectUavId(e);
          }}
        >
          {selectedUavList.map((item) => {
            return (
              <Option value={item} key={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </div>
      <div>
        {uavMessage === undefined ? (
          <>
            <Input
              addonBefore="经度"
              disabled={true}
              value={"名称"}
              className="task-input"
            ></Input>
            <Input
              addonBefore="纬度"
              disabled={true}
              value={"数量"}
              className="task-input"
            ></Input>
            <Input
              addonBefore="高程"
              disabled={true}
              value={"时间"}
              className="task-input"
            ></Input>
          </>
        ) : (
          <>
            <Input
              addonBefore="经度"
              disabled={true}
              value={uavMessage.longtitude}
              className="task-input"
            ></Input>
            <Input
              addonBefore="纬度"
              disabled={true}
              value={uavMessage.latitute}
              className="task-input"
            ></Input>
            <Input
              addonBefore="高程"
              disabled={true}
              value={uavMessage.latitute}
              className="task-input"
            ></Input>
          </>
        )}
      </div>
    </>
  );
};
export default TaskInfo;
