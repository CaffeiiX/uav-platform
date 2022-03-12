import { Button, Input, Modal, Select } from "antd";
import { Cartesian3 } from "cesium";
import { useContext, useEffect, useState} from "react";
import { getTaskUavList } from "../../api/taskAPI";
import { IsCreateTaskContext } from "../../context/taskContext";



const {Option} = Select;

const CreateTaskModal: React.FC<{onDrawClick: any
                                 polygonRegion: Cartesian3[]}> = ({onDrawClick, polygonRegion}) => {
    const createTaskContext = useContext(IsCreateTaskContext);
    const [taskName, setTaskName] = useState<string>('');
    const [uavList, setUavList] = useState<string[]>(['1','2','3']);
    const [selectUavList, setSetlectUavList] = useState<string[]>([]);

    const handleOnOk = () => {
        if(taskName === '' || selectUavList.length === 0 || polygonRegion.length === 0){
            alert('请输入数据');
            return;
        }
        createTaskContext.setIsCreateTaskModal(false);
        console.log([uavList, taskName, polygonRegion]);
    };

    useEffect(() => {
        //getUavList
        const fetchData =async () => {
            const data = await getTaskUavList();
            setUavList(data);
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
    </div>
    </Modal>
    </>
  );
};

export default CreateTaskModal;
