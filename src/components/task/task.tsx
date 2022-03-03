import TaskControl from "./taskControl";
import SubMenu from "antd/lib/menu/SubMenu";
import TaskList from "./taskList";
import TaskInfo from "./taskInfo";
import {Menu} from "antd";
import { useContext } from "react";
import { IsCreateTaskContext } from "../../context/taskContext";
import './task.css';
const Task : React.FC<{}> = () => {
    const createTaskContext = useContext(IsCreateTaskContext);

    return (
        <>
        <TaskControl onCreateTaskShowModal={() => {createTaskContext.setIsCreateTaskModal(true)}}></TaskControl>
          <Menu mode="inline">
              <SubMenu title='任务列表' className="task-menu" key='sub1'>
                <TaskList></TaskList>
              </SubMenu>
              <SubMenu title='任务信息' className="task-menu" key='sub2'>
                <TaskInfo></TaskInfo>
              </SubMenu>
            </Menu>
        </>
    );
}

export default Task;
