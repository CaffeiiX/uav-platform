import { Input, Switch, Select} from "antd";
import './taskInfo.css'

const {Option} = Select;

const uavList = ['1','2','3'];
const TaskInfo : React.FC<{}> = () => {
    return (
        <>
        <div>
        <Input addonBefore="任务名称" disabled={true} value={'名称'} className='task-input'></Input>
        <Input addonBefore="无人机数" disabled={true} value={'数量'} className='task-input'></Input>
        <Input addonBefore="任务时间" disabled={true} value={'时间'} className='task-input'></Input>
        </div>
        
        <div style={{marginTop: '10px', marginBottom: '8px'}}>
            <div style={{display: 'inline-block', width: '160px'}}>
            <span style={{color: 'blue'}}>无人机状态：</span>
            <Switch></Switch>
        </div>
        <Select defaultValue={uavList[0]}>
            {uavList.map((item) => {
                return <Option value = {item}>{item}</Option>
            })}
        </Select>
        </div>
        <div>
        <Input addonBefore="经度" disabled={true} value={'名称'} className='task-input'></Input>
        <Input addonBefore="纬度" disabled={true} value={'数量'} className='task-input'></Input>
        <Input addonBefore="高程" disabled={true} value={'时间'} className='task-input'></Input>
        </div>
        </>
    )
}
export default TaskInfo;