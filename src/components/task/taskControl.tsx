import { Button, Radio } from "antd";
import { useState } from "react";
import 'antd/dist/antd.css';
import './taskControl.css';
const TaskControl : React.FC<{onCreateTaskShowModal: () => void }> = ({onCreateTaskShowModal}) => {
    const [value, setValue] = useState(0);
    return (
        <>
        <div className="header">
            无人机任务平台
        </div>
        <Radio.Group onChange={(e)=>{setValue(e.target.value)}} value={value}>
            <Radio className="radio" value={0} key={'static'}>静态任务</Radio>
            <Radio className="radio" value={1} key={'dynamic'}>动态任务</Radio>
        </Radio.Group>
        <Button className="task-button" disabled={value === 0 ? false: true} onClick={onCreateTaskShowModal}>
            创建任务
        </Button>
        <Button className="task-button" disabled={true}>
            结束任务
        </Button>
        </>
    )
}

export default TaskControl;