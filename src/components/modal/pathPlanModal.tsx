import {Select, Radio, Button, RadioChangeEvent} from 'antd'
import { useContext, useState } from 'react';
import { IsCreateTaskContext } from '../../context/taskContext';
import { IsDrawPointType } from '../../interface/taskType';
const PathPlanModal: React.FC<{isDrawPoint: IsDrawPointType}> = ({isDrawPoint}) => {
  const [areaValue,setAreaValue] = useState(1);
  const createTaskContext = useContext(IsCreateTaskContext);

  const onAreaChange = (e:RadioChangeEvent) => {
      console.log('指定目标', e.target.value);
      setAreaValue(e.target.value);
  };
  const handleOnClick = () => {
    createTaskContext.setIsCreateTaskModal(false);
    isDrawPoint.setIsDrawPoint(true);
  }
  return (
    <>
      <div>
        <span>{"选择方案: "}</span>
        <Select
          style={{ width: "80%", marginTop: 5}}
          onChange={(e) => {}}
        ></Select>
      </div>
      <div style={{ width: "100%", marginTop: 10 }}>
        <span>{"方案参数: "}</span>
      </div>
      <div style={{ width: "100%", marginTop: 10 }}>
        <span>{"指定目标: "}</span>
        <Radio.Group onChange={onAreaChange} value={areaValue}>
          <Radio value={1}>绘制</Radio>
          <Radio value={2}>导入</Radio>
          <Button type="primary" onClick={handleOnClick}>
            确定
          </Button>
        </Radio.Group>
      </div>
      <div style={{ width: "100%", marginTop: 10 }}>
        <span>{"其他参数: "}</span>
      </div>
    </>
  );
};
export default PathPlanModal;
