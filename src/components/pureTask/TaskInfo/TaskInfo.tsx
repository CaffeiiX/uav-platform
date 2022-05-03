import { TaskInfoType, UavListInTaskType } from "../../../interface/taskType";
import { Input } from "antd";

const TaskInfo: React.FC<{selectTask: TaskInfoType | undefined, selectUavListInTask: UavListInTaskType[]}> = ({selectTask, selectUavListInTask}) => {
  return(
  <div className="task-info-panel">
        <Input
          addonBefore="任务名称"
          disabled={true}
          value={selectTask ? selectTask.name: '任务名'}
          className="task-input"
        ></Input>
        <Input
          addonBefore="无人机数"
          disabled={true}
          value={selectUavListInTask.length}
          className="task-input"
        ></Input>
        <Input
          addonBefore="任务时间"
          disabled={true}
          value={selectTask ? selectTask.date: '任务时间'}
          className="task-input"
        ></Input>
      </div>
  );
}

export default TaskInfo;