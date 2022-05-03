import { Table } from "antd";
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { columns} from "../../mock/taskListData";
import { queryCurrentTaskList, selectTaskAtom, taskPageNumAtom} from "../../store/task";
import './pureTaskList.css'

const PureTaskList : React.FC<{}> = ({}) => {
    const setPageNum = useSetRecoilState(taskPageNumAtom);
    const taskListAble = useRecoilValueLoadable(queryCurrentTaskList);
    const [selectTask, setSelectTask] = useRecoilState(selectTaskAtom);
    switch(taskListAble.state){
        case 'hasValue':
            return (
                <>
                <Table className="table-task-list" size="small" dataSource={taskListAble.contents} columns={columns}
                       pagination={{pageSize: 3, total: 20, onChange: (e)=>{setPageNum(e)}}} 
                       onRow={record => {
                           return {
                               onClick: event => {},
                               onDoubleClick: event => {setSelectTask(record)},
                               onMouseEnter: event => {event.stopPropagation()}
                           }
                       }}
                       rowClassName={record => {
                           if(selectTask) return record.Id === selectTask.Id ? 'table-task-row' : '';
                           return '';
                       }} 
                       rowKey={record => record.Id}></Table>
                </>
            );
        case 'loading':
            return (
                <Table className="table-task-list" size="small" dataSource={[]} columns={columns}
                       pagination={{pageSize: 3, total: 20}} 
                ></Table>
            );
        case 'hasError':
            throw taskListAble.contents;
    }
    
}

export default PureTaskList;