import { Input, Switch, Select } from "antd";
import { useRecoilState } from "recoil";
import { selectUavIdAtom } from "../../../store/uav";
const { Option } = Select;
const UavInfo: React.FC<{
  isChecked: boolean;
  selectUavListInTask: string[];
}> = ({ isChecked, selectUavListInTask }) => {
  
  const [selectUavId, setSelectUavId] = useRecoilState(selectUavIdAtom);
  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "8px" }}>
        <div
          style={{ display: "inline-block", width: "150px" }}
          className="task-info-switch"
        >
          <span className="task-info-switch-span">无人机状态 </span>
          <Switch disabled={false} checked={isChecked}></Switch>
        </div>
        <Select
          className="task-info-select"
          defaultValue={selectUavId}
          onChange={(e) => {
            setSelectUavId(e);
          }}
        >
          {selectUavListInTask.map((item) => {
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

export default UavInfo;
