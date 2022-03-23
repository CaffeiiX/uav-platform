import { Button, Checkbox, Input, Modal, Select, Radio, RadioChangeEvent} from "antd";
import { Cartesian3 } from "cesium";
import { useContext, useEffect, useState} from "react";
import { getTaskUavList, postCreateTask } from "../../api/taskAPI";
import { IsCreateTaskContext} from "../../context/taskContext";
import { IsDrawPointType } from "../../interface/taskType";
import PathPlanModal from "../modal/pathPlanModal"



const {Option} = Select;

const CreateTaskModal: React.FC<{onDrawClick: any
                                 polygonRegion: Cartesian3[]
                                 isDrawPoint: IsDrawPointType
                                 targetPoint: Cartesian3[]}> = ({onDrawClick, polygonRegion,targetPoint, isDrawPoint}) => {
    const createTaskContext = useContext(IsCreateTaskContext);
    const [taskName, setTaskName] = useState<string>('');
    const [uavList, setUavList] = useState<string[]>(['1','2','3']);
    const [selectUavList, setSetlectUavList] = useState<string[]>([]);
    const [selectAreaList, setSetlectAreaList] = useState<string[]>([]);
    const [areaValue,setValue] = useState(1);
    const [platformValue,setValue2] = useState(1);
    const [isPathPlanModalChecked, setIsPathPlanModalChecked] = useState<boolean>(false);

    
    const onAreaChange = (e:RadioChangeEvent) => {
      console.log('指定区域', e.target.value);
      setValue(e.target.value);
    };
    const onPlatformChange = (e:RadioChangeEvent) => {
        console.log('平台区位', e.target.value);
        setValue2(e.target.value);
      };

    const handleOnOk = async () => {
        if(taskName === '' || selectUavList.length === 0 || polygonRegion.length === 0){
            alert('请输入数据');
            return;
        }
        createTaskContext.setIsCreateTaskModal(false);
        const status = await postCreateTask({
            task_name: taskName,
            droneIds: selectUavList,
            task_bounary: polygonRegion,
            task_status: '1',
            task_type: '1'
        })
        //更新任务的状态
        if(status === 'success') console.log('post create task success');
        isDrawPoint.setIsDrawPoint(false);
        console.log([uavList, taskName, polygonRegion]);
    };
    const handleOnPlaning = () => {
        createTaskContext.setIsCreateTaskModal(false);
        isDrawPoint.setIsDrawPoint(true);
    }
    useEffect(() => {
        //getUavList
        const fetchData =async () => {
            const data = await getTaskUavList();
            setUavList(data.map(item => item.droneId));
            console.log(data);
        }
        fetchData();
    }, [])
  return (
    <>
    <Modal visible={createTaskContext.isCreateTaskModal}
           onCancel={() => createTaskContext.setIsCreateTaskModal(false)}
           onOk = {handleOnOk}
           title= {'创建任务'}>
    <div>
        <span>{'任务名: '}</span>
        <Input style={{width: '86%'}} value = {taskName} onChange={(e) => {setTaskName(e.target.value)}}></Input>
    </div>
    <div style={{width: '100%', marginTop: 10}}>
        <span>{'指定区域: '}</span>
        <Radio.Group onChange={onAreaChange} value={areaValue}>
      <Radio value={1}>绘制</Radio>
      <Radio value={2}>导入</Radio>
    </Radio.Group>
    <Button type="primary" style={{marginTop: 20, marginLeft: '6%'}} onClick={() => {}}>确定</Button>
    </div>

    <div style={{width: '100%', marginTop: 10}}>
        <span>{'平台区位: '}</span>
        <Radio.Group onChange={onPlatformChange} value={platformValue}>
      <Radio value={1}>绘制</Radio>
      <Radio value={2}>实时获取</Radio>
    </Radio.Group>
    <Button type="primary" style={{marginTop: 20}} onClick={() => {}}>确定</Button>
    </div>
    <div>
        <span>{'指定无人机: '}</span>
        <Select style={{width: '40%', marginTop: 5}} 
                onChange={(e) => {
                setSetlectAreaList(e);}}>
        </Select>
        <Select mode="multiple" style={{width: '40%', marginTop: 10}} 
                onChange={(e) => {
                setSetlectUavList(e);}}>
            {uavList.map((item) => {
                return <Option value={item} key={item}>{item}</Option>
            })}
        </Select>
    </div>
    {/* <div>
        <span>{'无人机: '}</span>
        <Select mode="multiple" style={{width: '80%', marginTop: 10}} 
                onChange={(e) => {
                setSetlectUavList(e);}}>
            {uavList.map((item) => {
                return <Option value={item} key={item}>{item}</Option>
            })}
        </Select>
    </div> */}
    <div>
        {/* <Button type="primary" style={{marginTop: 20, marginLeft: '10%'}} onClick={() => {onDrawClick(); createTaskContext.setIsCreateTaskModal(false);}}>绘制区域</Button> */}
        <Checkbox onChange={e => setIsPathPlanModalChecked(e.target.checked)} checked={isPathPlanModalChecked}
                  style={{marginTop: 10}}>路径规划</Checkbox>
    </div>
    {isPathPlanModalChecked ? (
        <>
        <PathPlanModal></PathPlanModal>
        </>
    ) : (
        <>
        </>
    )}
    </Modal>
    </>
  );
};

export default CreateTaskModal;
