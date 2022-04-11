import { Input, Switch, Select } from "antd";
import {useState} from "react";
import './pureTaskInfo.css';
const { Option } = Select;

const PureTaskInfo: React.FC<{}> = () => {

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedUavList, setSelectedUavList] = useState<string[]>(['1','2','3']);
  const [selectUavId, setSelectUavId] = useState<string>('1');
  return (
    <>
      <div className="task-info-panel">
        <Input
          addonBefore="任务名称"
          disabled={true}
          value={'任务1'}
          className="task-input"
        ></Input>
        <Input
          addonBefore="无人机数"
          disabled={true}
          value={'1'}
          className="task-input"
        ></Input>
        <Input
          addonBefore="任务时间"
          disabled={true}
          value={'2021-07-03'}
          className="task-input"
        ></Input>
      </div>

      <div style={{ marginTop: "10px", marginBottom: "8px" }}>
        <div style={{ display: "inline-block", width: "150px" }} className='task-info-switch'>
          <span  className='task-info-switch-span'>无人机状态 </span>
          <Switch disabled={false} checked={isChecked}></Switch>
        </div>
        <Select className="task-info-select"
          defaultValue={selectUavId}
          onChange={(e) => {
            setSelectUavId(e);
          }}
        >
          {selectedUavList.map((item) => {
            return (
              <Option value={item} key={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </div>
      <div>
          <>
            <Input
              addonBefore="经度"
              disabled={true}
              value={"名称"}
              className="task-input"
            ></Input>
            <Input
              addonBefore="纬度"
              disabled={true}
              value={"数量"}
              className="task-input"
            ></Input>
            <Input
              addonBefore="高程"
              disabled={true}
              value={"时间"}
              className="task-input"
            ></Input>
          </>
      </div>
    </>
  );
};
export default PureTaskInfo;
