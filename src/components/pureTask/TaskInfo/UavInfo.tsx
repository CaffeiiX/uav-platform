import { Input, Switch, Select } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { entitiesPropertiesAtom } from "../../../store/map";
import { selectTaskAtom } from "../../../store/task";
import { selectUavIdAtom, uavInTimePathDictAtom, uavWebsocketJsonMessageSelector } from "../../../store/uav";
const { Option } = Select;
const UavInfo: React.FC<{
  selectUavListInTask: string[];
}> = ({ selectUavListInTask }) => {
  
  const [selectUavId, setSelectUavId] = useRecoilState(selectUavIdAtom);
  const uavWebscoketMessageJson = useRecoilValue(uavWebsocketJsonMessageSelector);
  const [isOpenSwitch, setIsOpenSwitch] = useState<boolean>(false);
  const selectTask = useRecoilValue(selectTaskAtom);
  const setUavInTimePathDict = useSetRecoilState(uavInTimePathDictAtom);
  const [entitiesProperties, setEntitiesProperties] = useRecoilState(
    entitiesPropertiesAtom
  );
  useEffect(() => {
    if(uavWebscoketMessageJson){
      if(selectUavListInTask.includes(uavWebscoketMessageJson.UAV_id) && selectTask.status === '进行中'){
        setIsOpenSwitch(true);

      }
    }
  },[uavWebscoketMessageJson]);
  useEffect(() => {
    let uavPathDict  = {};
    for(let uav of selectUavListInTask){
      uavPathDict = {...uavPathDict, [uav]: {
        'time': [],
        'position': []
      }}
    };
    setUavInTimePathDict(uavPathDict);
  }, [selectUavListInTask]);
  useEffect(() => {
    setIsOpenSwitch(false);
  },[selectTask.Id]);
  const onSelectUav = (e:string) => {
    setSelectUavId(e);
    if(isOpenSwitch){
      setEntitiesProperties({
        ...entitiesProperties,
        clockIsCurrent: true,
        entitiesProperties: entitiesProperties.entitiesProperties.map((item) =>
        {
          if(item.key === 'uavInTimePathComponent') return {...item, visual: true};
          else if(item.key === 'fireBillboard' || item.key === 'fireAniEntityComponent') return {...item, visual: false};
          else return item;
        }
        ),
      });
    }
  }
  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "8px" }}>
        <div
          style={{ display: "inline-block", width: "150px" }}
          className="task-info-switch"
        >
          <span className="task-info-switch-span">无人机状态 </span>
          <Switch disabled={true} checked={isOpenSwitch}></Switch>
        </div>
        <Select
          className="task-info-select"
          defaultValue={selectUavId}
          onChange={onSelectUav}
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
            value={uavWebscoketMessageJson?.GPSPosition_longitude}
            className="task-input"
          ></Input>
          <Input
            addonBefore="纬度"
            disabled={true}
            value={uavWebscoketMessageJson?.GPSPosition_latitude}
            className="task-input"
          ></Input>
          <Input
            addonBefore="高程"
            disabled={true}
            value={uavWebscoketMessageJson?.GPSPosition_altitude}
            className="task-input"
          ></Input>
        </>
      </div>
    </>
  );
};

export default UavInfo;
