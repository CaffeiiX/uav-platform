import { Table } from "antd";
import { columns, dataSource } from "../../mock/taskListData";
const TaskList : React.FC<{}> = () => {
    return (
        <>
        <Table dataSource={dataSource} columns={columns}></Table>
        </>
    )
}

export default TaskList;