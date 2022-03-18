import { Button, Checkbox, Input, Modal, Select } from "antd";
import { Cartesian3 } from "cesium";
import { useContext, useEffect, useState} from "react";
import { getTaskUavList, postCreateTask } from "../../api/taskAPI";
import { IsCreateTaskContext } from "../../context/taskContext";
import { IsDrawPointType } from "../../interface/taskType";



const {Option} = Select;

const CreateTaskModal: React.FC<{onDrawClick: any
                                 polygonRegion: Cartesian3[]
                                 isDrawPoint: IsDrawPointType
                                 targetPoint: Cartesian3[]}> = ({onDrawClick, polygonRegion,targetPoint, isDrawPoint}) => {
    const createTaskContext = useContext(IsCreateTaskContext);
    const [taskName, setTaskName] = useState<string>('');
    const [uavList, setUavList] = useState<string[]>(['1','2','3']);
    const [selectUavList, setSetlectUavList] = useState<string[]>([]);

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
        <Input style={{width: '80%'}} value = {taskName} onChange={(e) => {setTaskName(e.target.value)}}></Input>
    </div>
    <div>
        <span>{'无人机: '}</span>
        <Select mode="multiple" style={{width: '80%', marginTop: 10}} 
                onChange={(e) => {
                setSetlectUavList(e);}}>
            {uavList.map((item) => {
                return <Option value={item} key={item}>{item}</Option>
            })}
        </Select>
    </div>
    <div>
        <Button type="primary" style={{marginTop: 20, marginLeft: '10%'}} onClick={() => {onDrawClick(); createTaskContext.setIsCreateTaskModal(false);}}>绘制区域</Button>
        <Checkbox checked={isDrawPoint.isDrawPoint} onChange={e=>isDrawPoint.setIsDrawPoint(e.target.checked)}
                  style={{marginLeft: '20%'}}>路径规划</Checkbox>
    </div>
    {isDrawPoint.isDrawPoint ? (
        <>
        <div>
            <Button type="primary" style={{marginTop: 20, marginLeft:'10%'}}
                    onClick={handleOnPlaning}>选择区域目标点</Button>
            <Select style={{marginLeft: '20%', width:'20%'}}>
                <Option value='tree'>最小生成树</Option>
                <Option value='norma'>一般</Option>
            </Select>
        </div>
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
