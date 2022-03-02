import { Button, Input, Select } from "antd";

const {Option} = Select;
const uavList : string[] = ['1','2','3'];
const CreateTaskModal: React.FC<{}> = () => {
  return (
    <>
    <div>
        <span>{'任务名: '}</span>
        <Input style={{width: '80%'}}></Input>
    </div>
    <div>
        <span>{'无人机: '}</span>
        <Select mode="multiple" style={{width: '80%', marginTop: 10}}>
            {uavList.map((item) => {
                return <Option value={item}>{item}</Option>
            })}
        </Select>
    </div>
    <div>
        <Button type="primary" style={{marginTop: 20, marginLeft: '10%'}}>绘制区域</Button>
    </div>
    </>
  );
};

export default CreateTaskModal;
