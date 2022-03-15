import { Table } from "antd";
import { useEffect, useState } from "react";
import { getTaskInfo } from "../../api/taskAPI";
import { TaskInfoType } from "../../interface/taskType";
import { columns} from "../../mock/taskListData";
import './taskList.css'
const TaskList : React.FC<{select: (task: TaskInfoType) => void, selectedTask: TaskInfoType}> = ({select, selectedTask}) => {

    const [pageNum, setPageNum] = useState(1);
    const [taskList, setTaskList] = useState<TaskInfoType[]>([]);
    // const [selectTask, setSelectTask] = useState<TaskInfoType>();
    useEffect(() => {
        const fetchTaskData = async () => { 
            const taskData = await getTaskInfo(pageNum, 3, 1);
            setTaskList(taskData);
        };
        fetchTaskData();
    }, [pageNum])
    return (
        <>
        <Table className="table-task-list" size="small" dataSource={taskList} columns={columns} 
               pagination={{pageSize: 3, total: 20, onChange: (e)=>{setPageNum(e)}}} 
               onRow={record => {
                   return {
                       onClick: event => {},
                       onDoubleClick: event => {select(record)},
                       onMouseEnter: event => {event.stopPropagation()}
                   }
               }}
               rowClassName={record => {
                   return record.Id === selectedTask.Id ? 'table-task-row' : '';
               }} ></Table>
        </>
    )
}

export default TaskList;