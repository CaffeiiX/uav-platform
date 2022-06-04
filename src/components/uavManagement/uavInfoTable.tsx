import { useRecoilValue, useRecoilValueLoadable,useRecoilState } from "recoil";
import { Table, Input, InputNumber, Popconfirm, Form, Typography,Button } from 'antd';
import { selectUavAtom, querySelectUavInfoList } from "../../store/uavMana";
import { taskInfoOfUavCol} from "../../mock/uavListData";
// import './uavInfoTable.css';
import  styles from "./uavInfoTable.module.less"
import { selectTaskAtom} from "../../store/task";


const UavInfoTable : React.FC<{}> = ({}) => {
    const selectUav = useRecoilValue(selectUavAtom);
    const [selectTask, setSelectTask] = useRecoilState(selectTaskAtom);
    const taskListOfUavAble = useRecoilValueLoadable(querySelectUavInfoList);
    switch(taskListOfUavAble.state){
        case 'hasValue':
            return (
                <>
                <div className={styles.boxW}>
                <Table size="small" dataSource={taskListOfUavAble.contents} columns={taskInfoOfUavCol}
                       pagination={{pageSize: 3}} 
                       onRow={record => {
                        return {
                            onClick: event => {},
                            onDoubleClick: event => {setSelectTask({Id:record.taskId,date:record.taskTime,name:record.taskName,status:record.taskStatus,boundary:record.taskBounary})},
                            onMouseEnter: event => {event.stopPropagation()}
                        }
                        }}
                        rowClassName={record => {
                            if(selectTask) return record.taskId === selectTask.Id ? styles.tableDbClick : '';
                            return '';
                        }} 
                        rowKey={record => record.taskId}
                    //    scroll={{y:240}}
                ></Table>
                </div>
                </>
            );
        case 'loading':
            return (
                <Table className="table-task-list" size="small" dataSource={[]} columns={[]}
                       pagination={{pageSize: 3, total: 20}} 
                ></Table>
            );
        case 'hasError':
            throw taskListOfUavAble.contents;
    }
    
}

export default UavInfoTable;