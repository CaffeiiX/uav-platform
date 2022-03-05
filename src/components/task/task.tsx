import TaskControl from "./taskControl";
import SubMenu from "antd/lib/menu/SubMenu";
import TaskList from "./taskList";
import TaskInfo from "./taskInfo";
import {Menu} from "antd";
import { useContext, useEffect, useState } from "react";
import { IsCreateTaskContext } from "../../context/taskContext";
import './task.css';
import { TaskInfoType, UavInfoType } from "../../interface/taskType";
import { getTaskUavInfo } from "../../api/taskAPI";


const Task : React.FC<{}> = () => {
    const createTaskContext = useContext(IsCreateTaskContext);
    const [selectedTask, setSelectedTask] = useState<TaskInfoType>({
      'name': '名称',
      'Id': '',
      'date': '时间',
      'status': '',
      'boundary': []
    });
    const [uavList, setUavList] = useState<UavInfoType[]>([])
    // let uavList: UavInfoType[] = [];
    useEffect(()=>{
      const fetchData = async (taskId: string) => {
        const data = await getTaskUavInfo(taskId);
        setUavList(data);
      }
      if(selectedTask.Id !== "") fetchData(selectedTask.Id);
      // else setUavList([]);
    }, [selectedTask.Id])
    return (
        <>
        <TaskControl onCreateTaskShowModal={() => {createTaskContext.setIsCreateTaskModal(true)}}></TaskControl>
          <Menu mode="inline">
              <SubMenu title='任务列表' className="task-menu" key='sub1'>
                <TaskList select={(task: TaskInfoType) => setSelectedTask(task)} selectedTask = {selectedTask}></TaskList>
              </SubMenu>
              <SubMenu title='任务信息' className="task-menu" key='sub2'>
                <TaskInfo taskInfo = {selectedTask} uavInfo = {uavList}></TaskInfo>
              </SubMenu>
            </Menu>
        </>
    );
}

export default Task;
