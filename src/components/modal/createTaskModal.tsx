import { Button, Input, Modal, Select } from "antd";
import { useContext } from "react";
import { IsCreateTaskContext } from "../../context/taskContext";

const {Option} = Select;
const uavList : string[] = ['1','2','3'];
const CreateTaskModal: React.FC<{}> = () => {
    const createTaskContext = useContext(IsCreateTaskContext);
  return (
    <>
    <Modal visible={createTaskContext.isCreateTaskModal}
           onCancel={() => createTaskContext.setIsCreateTaskModal(false)}
           onOk = {() => createTaskContext.setIsCreateTaskModal(false)}>
    <div>
        <span>{'任务名: '}</span>
        <Input style={{width: '80%'}}></Input>
    </div>
    <div>
        <span>{'无人机: '}</span>
        <Select mode="multiple" style={{width: '80%', marginTop: 10}}>
            {uavList.map((item) => {
                return <Option value={item} key={item}>{item}</Option>
            })}
        </Select>
    </div>
    <div>
        <Button type="primary" style={{marginTop: 20, marginLeft: '10%'}}>绘制区域</Button>
    </div>
    </Modal>
    </>
  );
};

export default CreateTaskModal;
